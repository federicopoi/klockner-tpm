const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const moment = require("moment");

const COLORS = ["Roja", "Amarilla", "Azul", "Verde"];
const COLOR_RGB = {
  Roja: [220, 53, 69],
  Amarilla: [240, 173, 78],
  Azul: [23, 162, 184],
  Verde: [40, 167, 69],
};
const BRAND = [33, 47, 90];
const HEADER_FILL = [52, 58, 64];
const SOFT = [240, 242, 245];

const EQUIPOS_FILTRO = [
  { equipo: "Planta de Mezclado", desde: "2022-04-01" },
  { equipo: "Calandrado y Ss Aux Asociados", desde: "2022-04-01" },
  { equipo: "Alimentación y Extrusión y Ss Aux Asociados", desde: "2022-04-01" },
  { equipo: "Cortadora WT", desde: "2026-03-01" },
  { equipo: "Cortadora Euromac", desde: "2026-03-01" },
];

function filtrarTarjetas(tarjetas) {
  const desdePorEquipo = EQUIPOS_FILTRO.reduce((acc, { equipo, desde }) => {
    acc[equipo] = moment(desde, "YYYY-MM-DD").startOf("day");
    return acc;
  }, {});

  return tarjetas.filter((tarjeta) => {
    const desde = desdePorEquipo[tarjeta.equipo];
    const fecha = tarjeta.fecha ? moment(tarjeta.fecha) : null;
    return Boolean(desde && fecha && fecha.isValid() && fecha.isSameOrAfter(desde));
  });
}

function emptyColorCounts() {
  return COLORS.reduce((acc, color) => {
    acc[color] = 0;
    return acc;
  }, {});
}

function buildSummary(tarjetas, generatedAt) {
  const weekAgo = moment(generatedAt).subtract(7, "days");
  const totals = {
    total: tarjetas.length,
    abiertas: 0,
    cerradas: 0,
    porColor: emptyColorCounts(),
    abiertasSemana: 0,
    cerradasSemana: 0,
  };
  const porEquipo = {};

  tarjetas.forEach((tarjeta) => {
    const isCerrada = (tarjeta.estado || "").trim().toLowerCase() === "cerrada";
    const color = tarjeta.color || "Sin color";
    const equipo = tarjeta.equipo || "Sin equipo";

    if (isCerrada) totals.cerradas += 1;
    else totals.abiertas += 1;
    if (totals.porColor[color] !== undefined) totals.porColor[color] += 1;

    if (!porEquipo[equipo]) {
      porEquipo[equipo] = {
        total: 0,
        abiertas: 0,
        cerradas: 0,
        porColor: emptyColorCounts(),
      };
    }
    porEquipo[equipo].total += 1;
    if (isCerrada) porEquipo[equipo].cerradas += 1;
    else porEquipo[equipo].abiertas += 1;
    if (porEquipo[equipo].porColor[color] !== undefined) {
      porEquipo[equipo].porColor[color] += 1;
    }

    const fechaApertura = tarjeta.fecha ? moment(tarjeta.fecha) : null;
    if (fechaApertura && fechaApertura.isValid() && fechaApertura.isAfter(weekAgo)) {
      totals.abiertasSemana += 1;
    }

    if (isCerrada) {
      const fechaCierre = tarjeta.fechaCierre
        ? moment(tarjeta.fechaCierre)
        : tarjeta.finReparacion
        ? moment(tarjeta.finReparacion, [
            "YYYY-MM-DD HH:mm",
            "YYYY-MM-DD  HH:mm",
            moment.ISO_8601,
          ])
        : null;
      if (fechaCierre && fechaCierre.isValid() && fechaCierre.isAfter(weekAgo)) {
        totals.cerradasSemana += 1;
      }
    }
  });

  return { totals, porEquipo };
}

function formatArgentinaDate(date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function drawHeader(doc, pageWidth, generatedAt) {
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(18);
  doc.text("Reporte de Avance de Tarjetas", pageWidth / 2, 32, { align: "center" });
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Generado: ${formatArgentinaDate(generatedAt)}`, pageWidth / 2, 52, {
    align: "center",
  });
  doc.setFontSize(8);
  doc.text(
    "Mezclado/Calandrado/Alimentación y Extrusión: desde Abr/2022  |  Cortadora WT/Euromac: desde Mar/2026",
    pageWidth / 2,
    72,
    { align: "center" }
  );
  doc.setTextColor(0, 0, 0);
}

function sectionTitle(doc, text, y) {
  doc.setTextColor(...BRAND);
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text(text, 40, y);
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(0.8);
  doc.line(40, y + 4, 110, y + 4);
  doc.setTextColor(0, 0, 0);
}

function generateReportPdf(tarjetas, options = {}) {
  const generatedAt = options.generatedAt || new Date();
  const tarjetasFiltradas = filtrarTarjetas(tarjetas);
  const { totals, porEquipo } = buildSummary(tarjetasFiltradas, generatedAt);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const fullWidth = pageWidth - 80;

  drawHeader(doc, pageWidth, generatedAt);
  let cursorY = 120;
  sectionTitle(doc, "Totales generales", cursorY);
  cursorY += 14;

  doc.autoTable({
    startY: cursorY,
    head: [["Indicador", "Cantidad"]],
    body: [
      ["Total de tarjetas", totals.total],
      ["Abiertas", totals.abiertas],
      ["Cerradas", totals.cerradas],
      ["Abiertas (últimos 7 días)", totals.abiertasSemana],
      ["Cerradas (últimos 7 días)", totals.cerradasSemana],
    ],
    theme: "grid",
    headStyles: { fillColor: HEADER_FILL, textColor: 255, fontStyle: "bold", fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: fullWidth * 0.7 },
      1: { cellWidth: fullWidth * 0.3, halign: "right", fontStyle: "bold" },
    },
    margin: { left: 40, right: 40 },
    tableWidth: fullWidth,
  });

  const colorBody = COLORS.map((color) => [
    `${color} Total`,
    totals.porColor[color],
    totals.total ? `${((totals.porColor[color] / totals.total) * 100).toFixed(1)}%` : "0%",
  ]);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 12,
    head: [["Color", "Cantidad Total (Abiertas + Cerradas)", "% del Total de Tarjetas"]],
    body: colorBody,
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
      overflow: "linebreak",
    },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: fullWidth * 0.28, fontStyle: "bold" },
      1: { cellWidth: fullWidth * 0.4, halign: "right" },
      2: { cellWidth: fullWidth * 0.32, halign: "right" },
    },
    margin: { left: 40, right: 40 },
    tableWidth: fullWidth,
    didParseCell: (data) => {
      if (data.section === "head" && data.column.index === 0) {
        data.cell.styles.halign = "left";
      }
      if (data.section === "body" && data.column.index === 0) {
        const colorName = String(data.cell.raw).replace(/ Total$/, "");
        if (COLOR_RGB[colorName]) data.cell.styles.textColor = COLOR_RGB[colorName];
      }
    },
  });

  cursorY = doc.lastAutoTable.finalY + 28;
  sectionTitle(doc, "Por equipo autónomo", cursorY);
  cursorY += 14;

  const equipoRows = EQUIPOS_FILTRO.map(({ equipo }) => {
    const summary = porEquipo[equipo] || {
      total: 0,
      abiertas: 0,
      cerradas: 0,
      porColor: emptyColorCounts(),
    };
    return [
      equipo,
      summary.total,
      summary.abiertas,
      summary.cerradas,
      summary.porColor.Roja,
      summary.porColor.Amarilla,
      summary.porColor.Azul,
      summary.porColor.Verde,
    ];
  });

  doc.autoTable({
    startY: cursorY,
    head: [[
      "Equipo",
      "Total",
      "Abiertas",
      "Cerradas",
      "Roja Total",
      "Amarilla Total",
      "Azul Total",
      "Verde Total",
    ]],
    body: equipoRows,
    foot: [[
      "Total",
      totals.total,
      totals.abiertas,
      totals.cerradas,
      totals.porColor.Roja,
      totals.porColor.Amarilla,
      totals.porColor.Azul,
      totals.porColor.Verde,
    ]],
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 7,
      halign: "center",
      overflow: "linebreak",
    },
    footStyles: { fillColor: BRAND, textColor: 255, fontStyle: "bold", fontSize: 8, halign: "center" },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: 138, fontStyle: "bold", overflow: "linebreak" },
      1: { cellWidth: 38, halign: "center" },
      2: { cellWidth: 48, halign: "center" },
      3: { cellWidth: 48, halign: "center" },
      4: { cellWidth: 48, halign: "center", textColor: COLOR_RGB.Roja, fontStyle: "bold" },
      5: { cellWidth: 62, halign: "center", textColor: COLOR_RGB.Amarilla, fontStyle: "bold" },
      6: { cellWidth: 48, halign: "center", textColor: COLOR_RGB.Azul, fontStyle: "bold" },
      7: { cellWidth: 48, halign: "center", textColor: COLOR_RGB.Verde, fontStyle: "bold" },
    },
    margin: { left: 40, right: 40 },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(...BRAND);
    doc.setLineWidth(0.5);
    doc.line(40, pageHeight - 32, pageWidth - 40, pageHeight - 32);
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Página ${page} de ${pageCount}`, pageWidth - 40, pageHeight - 20, {
      align: "right",
    });
    doc.setTextColor(0, 0, 0);
  }

  return {
    buffer: Buffer.from(doc.output("arraybuffer")),
    summary: { totals, porEquipo },
  };
}

module.exports = { EQUIPOS_FILTRO, buildSummary, filtrarTarjetas, generateReportPdf };
