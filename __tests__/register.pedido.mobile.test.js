import React from 'react';
import { render } from '@testing-library/react-native';
import Compra from '../Views/Compra/Compra';

describe('Registrar Pedido (Usuario) - MOBILE', () => {
  test('renderiza la vista de compra', () => {
    const { getByText } = render(<Compra />);

    expect(getByText('Compra')).toBeTruthy();
  });
});