const useRegister = jest.fn(() => ({
  userData: {},
  consumidorData: {},
  encargadoData: {},
  productorData: {},
  registrar: false,
  handleUserDataChange: jest.fn(),
  handleConsumidorDataChange: jest.fn(),
  handleProductorDataChange: jest.fn(),
  handleEncargadoDataChange: jest.fn(),
  handleRegister: jest.fn(),
  setRegistrar: jest.fn(),
  activarRegistro: jest.fn(),
  setTipoUsuario: jest.fn(),
}));

export default useRegister;