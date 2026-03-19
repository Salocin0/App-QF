import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProcesoRegistro from '../Views/RegistrarUsuario/ProcesoRegistro';
import { useRoute } from '@react-navigation/native';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('Registrar Usuario (Repartidor) - MOBILE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useRoute.mockReturnValue({ params: { tipoUsuario: 'repartidor' } });
  });

  test('renderiza el formulario de registro', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ProcesoRegistro navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText('Datos Usuario 1/3')).toBeTruthy();
  });
});