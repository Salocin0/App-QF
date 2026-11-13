import React from 'react';
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
jest.mock('../components/ThemedAlert/ThemedAlert', () => {
  const { Text } = require('react-native');
  return ({ visible, mensaje }) => (visible ? <Text testID="alerta">{mensaje}</Text> : null);
});
jest.mock('react-native-vector-icons/FontAwesome', () => () => null);

// 2 x 4200 + 1 x 1999 = 10399 subtotal; 15% fee = 1559.85 -> total 11958.85
const productos = [
  { id: 10, nombre: 'Choripán', precio: 4200, cantidad: 2 },
  { id: 11, nombre: 'Gaseosa', precio: 1999, cantidad: 1 },
];

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



describe('Carrito - comisión del servicio (MOBILE)', () => {
  test('muestra el subtotal, la comisión del 15% y el total con comisión', () => {
    const { getByText } = renderCard();
    expect(getByText('$10399.00')).toBeTruthy();
    expect(getByText('Comisión de servicio (15%):')).toBeTruthy();
    expect(getByText('$1559.85')).toBeTruthy();
    expect(getByText('Total: $11958.85')).toBeTruthy();
  });

  test('cobra por Stripe el total con comisión, en centavos enteros', async () => {
    const { getByText } = renderCard();
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toMatch(/payment-sheet$/);
    expect(JSON.parse(options.body)).toEqual({ amount: 1195885 });
  });

  test('envía al backend el mismo total que se cobró', async () => {
    const { getByText } = renderCard();
    fireEvent.press(getByText('Finalizar Compra'));

    await waitFor(() => expect(mockCreatePedido).toHaveBeenCalledTimes(1));
    expect(mockCreatePedido.mock.calls[0][0].total).toBe(11958.85);
  });
});
