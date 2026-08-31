const mongoose = require("mongoose");
const config = require("config");
const Tarjeta = require("../models/Tarjeta");
const WeeklyReportDelivery = require("../models/WeeklyReportDelivery");
const { generateReportPdf } = require("../services/reportGenerator");
const { sendEmail } = require("../services/resendClient");

const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";

function argentinaDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ARGENTINA_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return parts.reduce((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});
}

function parseRecipients(value) {
  return (value || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

async function reserveDelivery(reportKey, recipients) {
  try {
    return await new WeeklyReportDelivery({ reportKey, recipients }).save();
  } catch (error) {
    if (error && error.code === 11000) return null;
    throw error;
  }
}

async function main() {
  const isTest = process.argv.includes("--test");
  const isScheduled = process.argv.includes("--scheduled");
  const now = new Date();
  const argentina = argentinaDateParts(now);

  if (isScheduled && argentina.weekday !== "Thu") {
    console.log("Weekly report skipped: today is not Thursday in Argentina.");
    return;
  }

  const recipients = parseRecipients(
    isTest ? process.env.REPORT_TEST_RECIPIENT : process.env.REPORT_RECIPIENTS
  );
  if (!recipients.length) {
    throw new Error(
      isTest ? "REPORT_TEST_RECIPIENT is not configured." : "REPORT_RECIPIENTS is not configured."
    );
  }
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured.");

  const db = process.env.MONGODB_URI || config.get("mongoURI");
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const reportKey = `${argentina.year}-${argentina.month}-${argentina.day}`;
  let delivery = null;
  if (!isTest) {
    delivery = await reserveDelivery(reportKey, recipients);
    if (!delivery) {
      console.log(`Weekly report ${reportKey} was already sent or is being processed.`);
      return;
    }
  }

  try {
    const tarjetas = await Tarjeta.find().lean().exec();
    const { buffer, summary } = generateReportPdf(tarjetas, { generatedAt: now });
    const filename = `reporte-tarjetas-${reportKey}.pdf`;
    const response = await sendEmail({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.REPORT_FROM_EMAIL || "Klockner TPM <reportes@efuklocknertpm.com>",
      to: recipients,
      subject: isTest
        ? `[PRUEBA] Reporte semanal de tarjetas - ${reportKey}`
        : `Reporte semanal de tarjetas - ${reportKey}`,
      html: [
        "<p>Hola,</p>",
        "<p>Adjuntamos el reporte semanal de avance de tarjetas TPM.</p>",
        `<p><strong>Total:</strong> ${summary.totals.total} &nbsp; `,
        `<strong>Abiertas:</strong> ${summary.totals.abiertas} &nbsp; `,
        `<strong>Cerradas:</strong> ${summary.totals.cerradas}</p>`,
        "<p>Saludos,<br>Klockner TPM</p>",
      ].join(""),
      attachment: { filename, content: buffer },
    });

    if (delivery) {
      delivery.status = "sent";
      delivery.providerMessageId = response.id;
      delivery.sentAt = new Date();
      await delivery.save();
    }
    console.log(`Report sent to ${recipients.length} recipient(s). Message ID: ${response.id}`);
  } catch (error) {
    if (delivery) await delivery.remove();
    throw error;
  }
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
