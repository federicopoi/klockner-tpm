import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const BRAND = [33, 47, 90];
const HEADER_FILL = [52, 58, 64];
const SOFT = [240, 242, 245];
const COLOR_RGB = {
  Roja: [220, 53, 69],
  Amarilla: [240, 173, 78],
  Azul: [23, 162, 184],
  Verde: [40, 167, 69],
};

function drawHeader(doc, pageWidth, equipoLabel, generatedAt, count) {
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 70, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(16);
  doc.text(`Tarjetas Abiertas - ${equipoLabel}`, pageWidth / 2, 30, {
    align: "center",
  });

  doc.setFont(undefined, "normal");
  doc.setFontSize(9);
  doc.text(
    `Generado: ${generatedAt}  |  Total: ${count}`,
    pageWidth / 2,
    50,
    { align: "center" }
  );

  doc.setTextColor(0, 0, 0);
}

function safeFecha(value) {
  if (!value) return "";
  const m = moment(value);
  return m.isValid() ? m.format("DD/MM/YYYY") : "";
}

export function generarReporteEquipoPDF(tarjetas, equipoName, equipoLabel) {
  const filtradas = tarjetas
    .filter(
      (t) =>
        t.equipo === equipoName &&
        (t.estado || "").trim().toLowerCase() === "abierta"
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = moment().format("DD/MM/YYYY HH:mm");

  drawHeader(doc, pageWidth, equipoLabel, generatedAt, filtradas.length);

  if (!filtradas.length) {
    doc.setFontSize(12);
    doc.text(
      "No hay tarjetas abiertas para este equipo.",
      pageWidth / 2,
      120,
      { align: "center" }
    );
    doc.save(
      `tarjetas-abiertas-${equipoName.replace(/[^a-z0-9]/gi, "_")}-${moment().format(
        "YYYYMMDD-HHmm"
      )}.pdf`
    );
    return;
  }

  const body = filtradas.map((t) => [
    t.numero || "",
    safeFecha(t.fecha),
    t.color || "",
    t.maquina || "",
    t.parteMaquina || "",
    t.detecto || "",
    t.descripcion || "",
  ]);

  doc.autoTable({
    startY: 90,
    head: [
      [
        "N°",
        "Fecha",
        "Color",
        "Máquina",
        "Parte Máquina",
        "Detectó",
        "Descripción anomalía",
      ],
    ],
    body,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 4,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: 36, halign: "center", fontStyle: "bold" },
      1: { cellWidth: 58, halign: "center" },
      2: { cellWidth: 52, halign: "center", fontStyle: "bold" },
      3: { cellWidth: 70 },
      4: { cellWidth: 70 },
      5: { cellWidth: 60 },
      6: { cellWidth: "auto" },
    },
    margin: { left: 20, right: 20, top: 90, bottom: 40 },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 2) {
        const rgb = COLOR_RGB[data.cell.raw];
        if (rgb) data.cell.styles.textColor = rgb;
      }
    },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...BRAND);
    doc.setLineWidth(0.5);
    doc.line(20, pageHeight - 28, pageWidth - 20, pageHeight - 28);
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${equipoLabel}  -  Página ${i} de ${pageCount}`,
      pageWidth - 20,
      pageHeight - 14,
      { align: "right" }
    );
    doc.text(
      `Generado: ${generatedAt}`,
      20,
      pageHeight - 14
    );
    doc.setTextColor(0, 0, 0);
  }

  doc.save(
    `tarjetas-abiertas-${equipoName.replace(/[^a-z0-9]/gi, "_")}-${moment().format(
      "YYYYMMDD-HHmm"
    )}.pdf`
  );
}

export const EQUIPOS_REPORTE = [
  { equipo: "Planta de Mezclado", label: "Mezclado" },
  { equipo: "Calandrado y Ss Aux Asociados", label: "Calandrado" },
  {
    equipo: "Alimentación y Extrusión y Ss Aux Asociados",
    label: "Alim. y Extrusión",
  },
  { equipo: "Cortadora WT", label: "Cortadora WT" },
  { equipo: "Cortadora Euromac", label: "Cortadora Euromac" },
];
