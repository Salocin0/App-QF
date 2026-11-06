import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  useGetPedidosQuery,
  useGetPedidosRepartidorQuery,
} from "../components/App/Service/PedidosApi";
import { POLLING_PEDIDO_MS, buscarPedido } from "../components/Features/pedidos/estadosPedido";

/**
 * Mantiene actualizado un pedido mientras la pantalla está abierta (consulta periódica sobre la misma
 * lista que usa la pantalla de pedidos, así RTK Query comparte la petición).
 *
 * @param pedidoInicial pedido recibido por navegación; se usa hasta que llega la primera respuesta.
 * @param options.esRepartidor consulta la lista del repartidor en lugar de la del consumidor.
 * @param options.onCambioEstado (estadoAnterior, estadoNuevo, pedido) cuando el estado cambia.
 */
export default function usePedidoEnVivo(pedidoInicial, { esRepartidor = false, onCambioEstado } = {}) {
  const consumidorId = useSelector((state) => state.auth?.consumidorId);
  const id = pedidoInicial?.id;
  const opciones = (omitir) => ({
    pollingInterval: POLLING_PEDIDO_MS,
    skip: omitir || !consumidorId || !id,
    selectFromResult: ({ data }) => ({ pedido: buscarPedido(data, id) }),
  });

  const consumidor = useGetPedidosQuery(consumidorId, opciones(esRepartidor));
  const repartidor = useGetPedidosRepartidorQuery(consumidorId, opciones(!esRepartidor));
  const fuente = esRepartidor ? repartidor : consumidor;

  // Si el pedido deja de venir en la lista (p. ej. el repartidor solo recibe los "en camino"),
  // se conserva el último estado conocido en lugar de volver al de la navegación.
  const ultimoConocido = useRef(pedidoInicial);
  if (fuente.pedido) ultimoConocido.current = fuente.pedido;
  const pedido = fuente.pedido || ultimoConocido.current;

  const onCambioEstadoRef = useRef(onCambioEstado);
  onCambioEstadoRef.current = onCambioEstado;
  const estadoPrevio = useRef(pedido?.estado);

  useEffect(() => {
    const estadoNuevo = pedido?.estado;
    if (estadoNuevo && estadoPrevio.current && estadoNuevo !== estadoPrevio.current) {
      onCambioEstadoRef.current?.(estadoPrevio.current, estadoNuevo, pedido);
    }
    estadoPrevio.current = estadoNuevo;
  }, [pedido?.estado]);

  return { pedido, refetch: fuente.refetch };
}
