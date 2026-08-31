export function getFechaCierre(tarjeta) {
  return tarjeta.fechaCierre || tarjeta.finReparacion || "";
}

export function getMesCierre(tarjeta) {
  const fechaCierre = getFechaCierre(tarjeta);
  return fechaCierre ? fechaCierre.slice(0, 7) : "";
}
