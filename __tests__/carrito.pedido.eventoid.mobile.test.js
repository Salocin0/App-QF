import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import carritoReducer, { agregarProducto } from '../components/Features/carrito/carritoSlice';
import CardCarrito from '../Views/Carrito/CardCarrito';

const mockCreatePedido = jest.fn();
const mockDispatch = jest.fn();
const mockInitPaymentSheet = jest.fn();
const mockPresentPaymentSheet = jest.fn();

jest.mock('@stripe/stripe-react-native', () => ({
  useStripe: () => ({ initPaymentSheet: mockInitPaymentSheet, presentPaymentSheet: mockPresentPaymentSheet }),
}));
jest.mock('../components/App/Service/PedidosApi', () => ({
  useCreatePedidoMutation: () => [mockCreatePedido],
}));
jest.mock('react-redux', () => ({
  useSelector: (selector) => selector({ auth: { consumidorId: 7 } }),
  useDispatch: () => mockDispatch,
}));
jest.mock('../Styles/useDynamicColors', () => () => new Proxy({}, { get: () => '#000000' }));
jest.mock('../components/ThemedModal/ThemedModal', () => () => null);
jest.mock('react-native-vector-icons/FontAwesome', () => () => null);

const productos = [{ id: 10, nombre: 'Choripán', precio: 3500, cantidad: 1 }];

const renderCard = (props = {}) =>
  render(
    <CardCarrito
      puesto={1}
      puestoNombre="Puesto Cuarteto"
      eventoId={9}
      productos={productos}
      precompra={false}
      setLoadingGlobal={jest.fn()}
      loadingGlobal={false}
      {...props}
    />
  );

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ paymentIntent: 'pi_secret', ephemeralKey: 'ek', customer: 'cus' })),
    })
  );
  mockInitPaymentSheet.mockResolvedValue({});
  mockPresentPaymentSheet.mockResolvedValue({});
  mockCreatePedido.mockResolvedValue({ data: { id: 1 } });
});

describe('Carrito - eventoId en el pedido (MOBILE)', () => {
  test('el carrito guarda el eventoId del producto agregado', () => {
    const state = carritoReducer([], agregarProducto({ producto: { id: 10 }, puesto: 1, eventoId: 9, preventa: false }));
    expect(state[0].eventoId).toBe(9);
  });

  test('un carrito guardado sin eventoId lo completa al volver a agregar desde el evento', () => {
    const viejo = [{ puesto: 1, preventa: false, productos: [{ id: 10, cantidad: 1 }] }];
    const state = carritoReducer(viejo, agregarProducto({ producto: { id: 10 }, puesto: 1, eventoId: 9, preventa: false }));
    expect(state[0].eventoId).toBe(9);
    expect(state[0].productos[0].cantidad).toBe(2);
  });

  test('envía el eventoId al crear el pedido después de pagar', async () => {
    const { getByText } = renderCard();
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(mockCreatePedido).toHaveBeenCalledTimes(1));
    const body = mockCreatePedido.mock.calls[0][0];
    expect(body).toMatchObject({ eventoId: 9, puestoId: 1, consumidorId: 7 });
    expect(body).not.toHaveProperty('precompra');
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  test('sin eventoId no abre el pago y avisa al usuario', async () => {
    const { getByText } = renderCard({ eventoId: undefined });
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    expect(global.fetch).not.toHaveBeenCalled();
    expect(mockPresentPaymentSheet).not.toHaveBeenCalled();
    expect(mockCreatePedido).not.toHaveBeenCalled();
  });

  test('si el backend rechaza el pedido después de pagar, se muestra el motivo', async () => {
    mockCreatePedido.mockResolvedValue({ error: { status: 400, data: { msg: 'El evento ya finalizó' } } });
    const { getByText } = renderCard();
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    expect(Alert.alert.mock.calls[0][1]).toContain('El evento ya finalizó');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('si el usuario cancela el pago no se muestra error ni se crea el pedido', async () => {
    mockPresentPaymentSheet.mockResolvedValue({ error: { code: 'Canceled', message: 'canceled' } });
    const { getByText } = renderCard();
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(mockPresentPaymentSheet).toHaveBeenCalled());
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(mockCreatePedido).not.toHaveBeenCalled();
  });

  test('la precompra se envía con fecha ISO', async () => {
    const { getByText } = renderCard({ precompra: true, fecha: '2026-11-20T15:00:00.000Z' });
    fireEvent.press(getByText('Finalizar Precompra'));

    await waitFor(() => expect(mockCreatePedido).toHaveBeenCalledTimes(1));
    expect(mockCreatePedido.mock.calls[0][0].precompra).toBe('2026-11-20T15:00:00.000Z');
  });
});
