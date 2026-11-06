import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DetallePedido from '../Views/Pedidos/DetallePedido';
import UbicacionEntrega from '../Views/Pedidos/UbicacionEntrega';
import UbicacionEntregaR from '../Views/Pedidos/UbicacionEntregaR';
import { mensajeNoSePudoCancelar, puedeCancelarse } from '../components/Features/pedidos/estadosPedido';

let mockLista = [];
let mockListaRepartidor = [];
const mockRefetch = jest.fn();
const mockCambiarEstado = jest.fn();
const mockGoBack = jest.fn();
let mockRouteParams = {};

const mockQuery = (getLista) => (_arg, opciones = {}) => ({
  ...(opciones.skip ? { pedido: undefined } : opciones.selectFromResult({ data: { data: getLista() } })),
  refetch: mockRefetch,
});

jest.mock('../components/App/Service/PedidosApi', () => ({
  useGetPedidosQuery: (...args) => mockQuery(() => mockLista)(...args),
  useGetPedidosRepartidorQuery: (...args) => mockQuery(() => mockListaRepartidor)(...args),
  useCambiarEstadoPedidoMutation: () => [mockCambiarEstado],
}));
jest.mock('../components/App/Service/ProductosApi', () => ({ useGetProductosQuery: () => ({}) }));
jest.mock('../components/App/Service/ValoracionApi', () => ({ useCreateValoracionMutation: () => [jest.fn()] }));
jest.mock('react-redux', () => ({
  useSelector: (selector) => selector({ auth: { consumidorId: 7 }, modoOscuro: { modoOscuroActivo: true } }),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: mockGoBack }),
  useRoute: () => ({ params: mockRouteParams }),
  useIsFocused: () => true,
}));
jest.mock('../Views/Pedidos/MapsEncuentro', () => () => null);
jest.mock('../Views/Pedidos/StarsBar', () => () => null);
jest.mock('react-native-vector-icons/FontAwesome', () => () => null);
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => null);

const pedidoBase = {
  id: 153,
  estado: 'Pendiente',
  total: 4025,
  puestoId: 1,
  codigoEntrega: '49G8BY',
  puesto: { nombreCarro: 'Puesto Cuarteto' },
  consumidore: { nombre: 'Consumidor', apellido: 'Demo' },
  detalles: [{ cantidad: 1, precio: 3500, producto: { nombre: 'Choripán' } }],
};
const conEstado = (estado) => ({ ...pedidoBase, estado });

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  mockLista = [conEstado('Pendiente')];
  mockListaRepartidor = [conEstado('EnCamino')];
  mockRefetch.mockImplementation(() => Promise.resolve({ data: { data: mockLista } }));
});

describe('Estados del pedido - reglas compartidas', () => {
  test('solo se puede cancelar en Pendiente o Aceptado', () => {
    expect(puedeCancelarse('Pendiente')).toBe(true);
    expect(puedeCancelarse('Aceptado')).toBe(true);
    expect(puedeCancelarse('EnPreparacion')).toBe(false);
    expect(mensajeNoSePudoCancelar('EnPreparacion')).toContain('ya está En Preparación y no se puede cancelar');
  });
});

describe('Detalle del pedido (consumidor) - estado en vivo', () => {
  const renderDetalle = () => render(<DetallePedido route={{ params: { pedido: conEstado('Pendiente') } }} />);

  test('muestra el estado actual del servidor aunque la navegación traiga uno viejo', () => {
    mockLista = [conEstado('EnPreparacion')];
    const { getByText, queryByText } = renderDetalle();

    expect(getByText('En Preparación')).toBeTruthy();
    expect(queryByText('Cancelar Pedido')).toBeNull();
  });

  test('si el encargado cambia el estado, se actualiza en pantalla y avisa con un banner', async () => {
    const { getByText, queryByText, rerender } = renderDetalle();
    expect(getByText('Cancelar Pedido')).toBeTruthy();

    mockLista = [conEstado('EnCamino')];
    rerender(<DetallePedido route={{ params: { pedido: conEstado('Pendiente') } }} />);

    await waitFor(() => expect(getByText('Tu pedido pasó a En Camino')).toBeTruthy());
    expect(getByText('Ver Ubicación')).toBeTruthy();
    expect(queryByText('Cancelar Pedido')).toBeNull();
  });

  test('cancelar en un estado no permitido explica el motivo con el estado real (sin aviso del sistema)', async () => {
    const { getAllByText, findByText } = renderDetalle();
    mockCambiarEstado.mockReturnValue({ unwrap: () => Promise.reject({ status: 409 }) });
    // Mientras el consumidor decidía, el encargado ya pasó el pedido a preparación.
    mockRefetch.mockImplementation(() => Promise.resolve({ data: { data: [conEstado('EnPreparacion')] } }));

    fireEvent.press(getAllByText('Cancelar Pedido')[0]);
    fireEvent.press(getAllByText('Cancelar Pedido').pop());

    expect(await findByText('No se pudo cancelar el pedido')).toBeTruthy();
    expect(await findByText(/ya está En Preparación y no se puede cancelar/)).toBeTruthy();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  test('cuando el repartidor entrega el pedido, el consumidor ve el aviso de entrega', async () => {
    mockLista = [conEstado('EnCamino')];
    const { findByText, getByText, rerender } = render(
      <DetallePedido route={{ params: { pedido: conEstado('EnCamino') } }} />
    );

    mockLista = [conEstado('Entregado')];
    rerender(<DetallePedido route={{ params: { pedido: conEstado('EnCamino') } }} />);

    expect(await findByText('¡Tu pedido fue entregado!')).toBeTruthy();
    expect(getByText('Valorar Pedido')).toBeTruthy();
  });
});

describe('Ubicación del pedido (consumidor)', () => {
  test('avisa en la misma pantalla cuando el pedido se entrega', async () => {
    mockLista = [conEstado('EnCamino')];
    mockRouteParams = { pedido: conEstado('EnCamino') };
    const { findByText, rerender } = render(<UbicacionEntrega />);

    mockLista = [conEstado('Entregado')];
    rerender(<UbicacionEntrega />);

    expect(await findByText('¡Tu pedido fue entregado!')).toBeTruthy();
  });
});

describe('Entrega del pedido (repartidor)', () => {
  beforeEach(() => {
    mockRouteParams = { pedido: conEstado('EnCamino') };
  });

  const ingresarCodigo = (utils, codigo) => {
    fireEvent.press(utils.getByText('Entregar Pedido'));
    fireEvent.changeText(utils.getByPlaceholderText('Ingrese el código'), codigo);
    fireEvent.press(utils.getByText('Confirmar'));
  };

  test('un código incorrecto se informa dentro del modal y no cambia el estado', async () => {
    const utils = render(<UbicacionEntregaR />);
    ingresarCodigo(utils, 'ZZZZZZ');

    expect(await utils.findByText(/El código no coincide/)).toBeTruthy();
    expect(mockCambiarEstado).not.toHaveBeenCalled();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  test('el código correcto entrega el pedido y muestra la confirmación de la app', async () => {
    mockCambiarEstado.mockReturnValue({ unwrap: () => Promise.resolve({}) });
    const utils = render(<UbicacionEntregaR />);
    ingresarCodigo(utils, '49g8by');

    expect(await utils.findByText('¡Entrega confirmada!')).toBeTruthy();
    expect(mockCambiarEstado).toHaveBeenCalledWith({ id: 153, accion: 'pedidoEntregado' });
    fireEvent.press(utils.getByText('Volver a mis pedidos'));
    expect(mockGoBack).toHaveBeenCalled();
    expect(Alert.alert).not.toHaveBeenCalled();
  });
});
