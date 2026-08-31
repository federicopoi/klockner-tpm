const assert = require("assert");
const { buildSummary, filtrarTarjetas, generateReportPdf } = require("../services/reportGenerator");

const generatedAt = new Date("2026-08-31T18:00:00.000Z");
const base = {
  equipo: "Planta de Mezclado",
  color: "Roja",
  fecha: "2026-04-01T12:00:00.000Z",
};
const tarjetas = [
  {
    ...base,
    estado: "Cerrada",
    fechaCierre: "2026-08-30T12:00:00.000Z",
    finReparacion: "2026-01-01 12:00",
  },
  {
    ...base,
    estado: "Cerrada",
    finReparacion: "2026-08-28 12:00",
  },
  {
    ...base,
    estado: "Cerrada",
    fechaCierre: "2026-08-01T12:00:00.000Z",
    finReparacion: "2026-08-31 12:00",
  },
  {
    ...base,
    estado: "Abierta",
    color: "Azul",
    fecha: "2026-08-30T12:00:00.000Z",
  },
];

const filtered = filtrarTarjetas(tarjetas);
const { totals } = buildSummary(filtered, generatedAt);

assert.strictEqual(totals.total, 4);
assert.strictEqual(totals.abiertas, 1);
assert.strictEqual(totals.cerradas, 3);
assert.strictEqual(totals.abiertasSemana, 1);
assert.strictEqual(totals.cerradasSemana, 2);

const { buffer } = generateReportPdf(tarjetas, { generatedAt });
assert.ok(Buffer.isBuffer(buffer));
assert.strictEqual(buffer.slice(0, 4).toString(), "%PDF");
assert.ok(buffer.length > 1000);

console.log("Weekly report tests passed.");
