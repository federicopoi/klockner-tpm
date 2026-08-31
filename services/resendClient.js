const https = require("https");

function sendEmail({ apiKey, from, to, subject, html, attachment }) {
  const payload = JSON.stringify({
    from,
    to,
    subject,
    html,
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content.toString("base64"),
      },
    ],
  });

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.resend.com",
        path: "/emails",
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (response) => {
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          let parsed;
          try {
            parsed = body ? JSON.parse(body) : {};
          } catch (error) {
            parsed = { message: body };
          }

          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(parsed);
            return;
          }
          reject(new Error(`Resend returned ${response.statusCode}: ${parsed.message || body}`));
        });
      }
    );

    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

module.exports = { sendEmail };
