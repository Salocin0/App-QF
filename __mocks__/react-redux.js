const mockState = {
  modoOscuro: { modoOscuroActivo: false },
  auth: { consumidorId: 1, id: 1, tipoUsuario: 'consumidor' },
  carrito: {},
  // Agregar otros estados si es necesario
};

const useSelector = jest.fn((selector) => selector(mockState));
const useDispatch = jest.fn();
const useStore = jest.fn(() => ({}));

export { useSelector, useDispatch, useStore };