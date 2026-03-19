import React from 'react';
import { render } from '@testing-library/react-native';
import Config from '../Views/Config/Config';

describe('Iniciar Sesión (Consumidor) - MOBILE', () => {
  test('renderiza la configuración', () => {
    const { getByText } = render(<Config />);

    expect(getByText('Configuraciones')).toBeTruthy();
  });
});