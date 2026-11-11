export const INTERVALO_UBICACION_MS = 5000;

/**
 * Sends the device location periodically without ever overlapping two readings: the next reading is scheduled
 * only after the previous one finished (a slow GPS fix used to pile up native requests and POSTs every 5 s).
 * Returns stop(); after it, no further reading starts and a reading in flight is not followed by another one.
 */
export function iniciarSeguimientoUbicacion({ obtenerUbicacion, enviarUbicacion, intervaloMs = INTERVALO_UBICACION_MS, onError = () => {} }) {
  let detenido = false;
  let timer = null;

  const ciclo = async () => {
    if (detenido) return;
    try {
      const ubicacion = await obtenerUbicacion();
      if (!detenido && ubicacion) await enviarUbicacion(ubicacion);
    } catch (error) {
      onError(error);
    }
    if (!detenido) timer = setTimeout(ciclo, intervaloMs);
  };

  timer = setTimeout(ciclo, intervaloMs);
  return () => {
    detenido = true;
    clearTimeout(timer);
  };
}
