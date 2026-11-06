// Reglas y textos de los estados del pedido compartidos por las pantallas de pedidos.

export const POLLING_PEDIDO_MS = 3000;

const ETIQUETAS_ESTADO = {
  Pendiente: "Pendiente",
  Precomprado: "Precompra",
  Aceptado: "Aceptado",
  EnPreparacion: "En Preparación",
  Listo: "Listo",
  EnCamino: "En Camino",
  Entregado: "Entregado",
  Valorado: "Valorado",
  Cancelado: "Cancelado",
};

export const etiquetaEstado = (estado) => ETIQUETAS_ESTADO[estado] || estado || "";

// Mismos estados en los que el backend permite la acción "cancelar".
export const ESTADOS_CANCELABLES = ["Pendiente", "Aceptado"];

export const puedeCancelarse = (estado) => ESTADOS_CANCELABLES.includes(estado);

export const mensajeNoSePudoCancelar = (estadoActual) =>
  puedeCancelarse(estadoActual)
    ? "No pudimos comunicarnos con el servidor. Revisá tu conexión e intentá de nuevo."
    : `El pedido ya está ${etiquetaEstado(estadoActual)} y no se puede cancelar. ` +
      "Solo se puede cancelar mientras está Pendiente o Aceptado.";

export const buscarPedido = (respuesta, id) =>
  Array.isArray(respuesta?.data) ? respuesta.data.find((pedido) => pedido.id === id) : undefined;
