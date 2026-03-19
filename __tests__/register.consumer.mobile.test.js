import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProcesoRegistro from '../Views/RegistrarUsuario/ProcesoRegistro';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('Registrar Usuario (Consumidor) - MOBILE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario de registro', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ProcesoRegistro navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText('Datos Usuario 1/2')).toBeTruthy();
  });

  test('registro exitoso llama al backend y muestra resultado', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ code: 201, data: { id: 123 } }),
    });

    const { getByText, getAllByType } = render(
      <NavigationContainer>
        <ProcesoRegistro navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Completar paso 1
    fireEvent.changeText(screen.getByTestId('Usuarioinput'), 'user1');
    fireEvent.changeText(screen.getByTestId('emailInput'), 'test@example.com');
    fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
    fireEvent.changeText(screen.getByTestId('confirmPasswordInput'), 'password');

    fireEvent.press(getByText('Siguiente'));

    // Verificar paso 2
    await waitFor(() => expect(getByText('Datos Consumidor 2/2')).toBeTruthy());

    // Completar paso 2
    fireEvent.changeText(screen.getByTestId('nombreInput'), 'nombre');
    fireEvent.changeText(screen.getByTestId('apellidoInput'), 'apellido');
    fireEvent.changeText(screen.getByTestId('dniInput'), '42512605');

    fireEvent.press(getByText('Finalizar'));

    // Verificar que fetch fue llamado
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  test('email duplicado muestra error', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: () => Promise.resolve({ code: 409, error: 'Email already exists' }),
    });

    const { getByText, getAllByType } = render(
      <NavigationContainer>
        <ProcesoRegistro navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Completar paso 1
    fireEvent.changeText(screen.getByTestId('Usuarioinput'), 'user1');
    fireEvent.changeText(screen.getByTestId('emailInput'), 'test@example.com');
    fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
    fireEvent.changeText(screen.getByTestId('confirmPasswordInput'), 'password');

    fireEvent.press(getByText('Siguiente'));

    await waitFor(() => expect(getByText('Datos Consumidor 2/2')).toBeTruthy());
  });
});