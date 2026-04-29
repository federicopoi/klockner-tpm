import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

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

function emptyColorCounts() {
  return COLORS.reduce((acc, c) => ({ ...acc, [c]: 0 }), {});
}

function buildSummary(tarjetas) {
  const weekAgo = moment().subtract(7, "days");

  const totals = {
    total: tarjetas.length,
    abiertas: 0,
    cerradas: 0,
    porColor: emptyColorCounts(),
    abiertasSemana: 0,
    cerradasSemana: 0,
  };

  const porEquipo = {};

  tarjetas.forEach((t) => {
    const estado = (t.estado || "").trim();
    const isCerrada = estado.toLowerCase() === "cerrada";
    const color = t.color || "Sin color";
    const equipo = t.equipo || "Sin equipo";

    if (isCerrada) totals.cerradas++;
    else totals.abiertas++;

    if (totals.porColor[color] !== undefined) totals.porColor[color]++;

    if (!porEquipo[equipo]) {
      porEquipo[equipo] = {
        total: 0,
        abiertas: 0,
        cerradas: 0,
        porColor: emptyColorCounts(),
      };
    }
    porEquipo[equipo].total++;
    if (isCerrada) porEquipo[equipo].cerradas++;
    else porEquipo[equipo].abiertas++;
    if (porEquipo[equipo].porColor[color] !== undefined) {
      porEquipo[equipo].porColor[color]++;
    }

    const fechaApertura = t.fecha ? moment(t.fecha) : null;
    if (fechaApertura && fechaApertura.isAfter(weekAgo)) {
      totals.abiertasSemana++;
    }
    if (isCerrada && t.finReparacion) {
      const fin = moment(t.finReparacion, [
        "YYYY-MM-DD HH:mm",
        "YYYY-MM-DD  HH:mm",
        moment.ISO_8601,
      ]);
      if (fin.isValid() && fin.isAfter(weekAgo)) {
        totals.cerradasSemana++;
      }
    }
  });

  return { totals, porEquipo };
}

function drawHeader(doc, pageWidth, generatedAt) {
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 70, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(18);
  doc.text("Reporte de Avance de Tarjetas", pageWidth / 2, 32, {
    align: "center",
  });

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Generado: ${generatedAt}`, pageWidth / 2, 52, { align: "center" });

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

export function generarReportePDF(tarjetas) {
  const { totals, porEquipo } = buildSummary(tarjetas);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = moment().format("DD/MM/YYYY HH:mm");

  drawHeader(doc, pageWidth, generatedAt);

  // ---- Section: Totales generales ----
  let cursorY = 100;
  sectionTitle(doc, "Totales generales", cursorY);
  cursorY += 14;

  const colWidth = (pageWidth - 80 - 20) / 2; // 40 left, 40 right, 20 gap

  const totalesRows = [
    ["Total de tarjetas", totals.total],
    ["Abiertas", totals.abiertas],
    ["Cerradas", totals.cerradas],
    ["Abiertas (últimos 7 días)", totals.abiertasSemana],
    ["Cerradas (últimos 7 días)", totals.cerradasSemana],
  ];

  doc.autoTable({
    startY: cursorY,
    head: [["Indicador", "Cantidad"]],
    body: totalesRows,
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
    },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: colWidth * 0.65 },
      1: { cellWidth: colWidth * 0.35, halign: "right", fontStyle: "bold" },
    },
    margin: { left: 40 },
    tableWidth: colWidth,
  });
  const leftFinalY = doc.lastAutoTable.finalY;

  const colorBody = COLORS.map((c) => [
    c,
    totals.porColor[c],
    totals.total
      ? `${((totals.porColor[c] / totals.total) * 100).toFixed(1)}%`
      : "0%",
  ]);

  doc.autoTable({
    startY: cursorY,
    head: [["Color", "Cantidad", "%"]],
    body: colorBody,
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
    },
    bodyStyles: { fontSize: 10 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: colWidth * 0.45, fontStyle: "bold" },
      1: { cellWidth: colWidth * 0.27, halign: "right" },
      2: { cellWidth: colWidth * 0.28, halign: "right" },
    },
    margin: { left: 40 + colWidth + 20 },
    tableWidth: colWidth,
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        const rgb = COLOR_RGB[data.cell.raw];
        if (rgb) data.cell.styles.textColor = rgb;
      }
    },
  });
  const rightFinalY = doc.lastAutoTable.finalY;

  // ---- Section: Por equipo autónomo ----
  cursorY = Math.max(leftFinalY, rightFinalY) + 28;
  sectionTitle(doc, "Por equipo autónomo", cursorY);
  cursorY += 14;

  const equipoRows = Object.entries(porEquipo)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([equipo, s]) => [
      equipo,
      s.total,
      s.abiertas,
      s.cerradas,
      s.porColor.Roja,
      s.porColor.Amarilla,
      s.porColor.Azul,
      s.porColor.Verde,
    ]);

  doc.autoTable({
    startY: cursorY,
    head: [
      [
        "Equipo",
        "Total",
        "Abiertas",
        "Cerradas",
        "Roja",
        "Amarilla",
        "Azul",
        "Verde",
      ],
    ],
    body: equipoRows,
    foot: [
      [
        "Total",
        totals.total,
        totals.abiertas,
        totals.cerradas,
        totals.porColor.Roja,
        totals.porColor.Amarilla,
        totals.porColor.Azul,
        totals.porColor.Verde,
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    footStyles: {
      fillColor: BRAND,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: 170, fontStyle: "bold" },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center", textColor: COLOR_RGB.Roja, fontStyle: "bold" },
      5: { halign: "center", textColor: COLOR_RGB.Amarilla, fontStyle: "bold" },
      6: { halign: "center", textColor: COLOR_RGB.Azul, fontStyle: "bold" },
      7: { halign: "center", textColor: COLOR_RGB.Verde, fontStyle: "bold" },
    },
    margin: { left: 40, right: 40 },
  });

  // ---- Footer on every page ----
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...BRAND);
    doc.setLineWidth(0.5);
    doc.line(40, pageHeight - 32, pageWidth - 40, pageHeight - 32);
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth - 40,
      pageHeight - 20,
      { align: "right" },
    );
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`reporte-tarjetas-${moment().format("YYYYMMDD-HHmm")}.pdf`);
}
