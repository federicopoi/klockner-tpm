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

// Equipos incluidos en el reporte con su fecha de inicio (inclusivo)
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

  return tarjetas.filter((t) => {
    const desde = desdePorEquipo[t.equipo];
    if (!desde) return false;
    const fecha = t.fecha ? moment(t.fecha) : null;
    if (!fecha || !fecha.isValid()) return false;
    return fecha.isSameOrAfter(desde);
  });
}

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
  doc.rect(0, 0, pageWidth, 90, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(18);
  doc.text("Reporte de Avance de Tarjetas", pageWidth / 2, 32, {
    align: "center",
  });

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Generado: ${generatedAt}`, pageWidth / 2, 52, { align: "center" });

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

export function generarReportePDF(tarjetas) {
  const tarjetasFiltradas = filtrarTarjetas(tarjetas);
  const { totals, porEquipo } = buildSummary(tarjetasFiltradas);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = moment().format("DD/MM/YYYY HH:mm");

  drawHeader(doc, pageWidth, generatedAt);

  // ---- Section: Totales generales ----
  let cursorY = 120;
  sectionTitle(doc, "Totales generales", cursorY);
  cursorY += 14;

  const fullWidth = pageWidth - 80; // 40 left + 40 right

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
      0: { cellWidth: fullWidth * 0.7 },
      1: { cellWidth: fullWidth * 0.3, halign: "right", fontStyle: "bold" },
    },
    margin: { left: 40, right: 40 },
    tableWidth: fullWidth,
  });

  const colorBody = COLORS.map((c) => [
    `${c} Total`,
    totals.porColor[c],
    totals.total
      ? `${((totals.porColor[c] / totals.total) * 100).toFixed(1)}%`
      : "0%",
  ]);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 12,
    head: [
      ["Color", "Cantidad Total (Abiertas + Cerradas)", "% del Total de Tarjetas"],
    ],
    body: colorBody,
    theme: "grid",
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
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
      if (data.section === "body" && data.column.index === 0) {
        const colorName = String(data.cell.raw).replace(/ Total$/, "");
        const rgb = COLOR_RGB[colorName];
        if (rgb) data.cell.styles.textColor = rgb;
      }
    },
  });

  // ---- Section: Por equipo autónomo ----
  cursorY = doc.lastAutoTable.finalY + 28;
  sectionTitle(doc, "Por equipo autónomo", cursorY);
  cursorY += 14;

  const equipoRows = EQUIPOS_FILTRO.map(({ equipo }) => {
    const s = porEquipo[equipo] || {
      total: 0,
      abiertas: 0,
      cerradas: 0,
      porColor: emptyColorCounts(),
    };
    return [
      equipo,
      s.total,
      s.abiertas,
      s.cerradas,
      s.porColor.Roja,
      s.porColor.Amarilla,
      s.porColor.Azul,
      s.porColor.Verde,
    ];
  });

  doc.autoTable({
    startY: cursorY,
    head: [
      [
        "Equipo",
        "Total",
        "Abiertas",
        "Cerradas",
        "Roja Total",
        "Amarilla Total",
        "Azul Total",
        "Verde Total",
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
      fontSize: 8,
      halign: "center",
      overflow: "linebreak",
    },
    footStyles: {
      fillColor: BRAND,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
    },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: 150, fontStyle: "bold", overflow: "linebreak" },
      1: { cellWidth: 38, halign: "center" },
      2: { cellWidth: 46, halign: "center" },
      3: { cellWidth: 46, halign: "center" },
      4: { cellWidth: 47, halign: "center", textColor: COLOR_RGB.Roja, fontStyle: "bold" },
      5: { cellWidth: 60, halign: "center", textColor: COLOR_RGB.Amarilla, fontStyle: "bold" },
      6: { cellWidth: 47, halign: "center", textColor: COLOR_RGB.Azul, fontStyle: "bold" },
      7: { cellWidth: 49, halign: "center", textColor: COLOR_RGB.Verde, fontStyle: "bold" },
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
