// Service fee added on top of the products subtotal. It must match the backend
// (pedidoCreate.handler.js COMISION_SERVICIO) and the web cart, so the amount
// charged through Stripe equals the order total saved by the backend.
export const COMISION_SERVICIO_PORCENTAJE = 15;

// Amounts are computed in integer cents to avoid floating point drift.
export const calcularMontos = (productos) => {
  const subtotalCentavos = productos.reduce(
    (acc, item) => acc + Math.round(Number(item.precio) * 100) * Number(item.cantidad),
    0
  );
  const comisionCentavos = Math.round((subtotalCentavos * COMISION_SERVICIO_PORCENTAJE) / 100);
  const totalCentavos = subtotalCentavos + comisionCentavos;
  return {
    subtotal: subtotalCentavos / 100,
    comision: comisionCentavos / 100,
    total: totalCentavos / 100,
    totalCentavos,
  };
};
