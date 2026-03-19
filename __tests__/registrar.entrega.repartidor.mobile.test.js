import React from 'react';
import { render } from '@testing-library/react-native';
import Config from '../Views/Config/Config';

describe('Registrar Entrega (Repartidor) - MOBILE', () => {
  test('renderiza la configuración', () => {
    const { getByText } = render(<Config />);

    expect(getByText('Configuraciones')).toBeTruthy();
  });
});