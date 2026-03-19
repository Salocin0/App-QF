const useRoute = jest.fn(() => ({
  params: { tipoUsuario: 'consumidor' },
}));

const useNavigation = jest.fn(() => ({
  navigate: jest.fn(),
}));

const NavigationContainer = ({ children }) => children;

export { useRoute, useNavigation, NavigationContainer };