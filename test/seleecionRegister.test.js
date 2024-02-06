import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SeleccionRegister from "./../Components/RegistrarUsuario/SeleccionRegister";

let component;

describe("SeleccionRegister Component", () => {
  beforeEach(() => {
    component = render(<SeleccionRegister />);
  });

  it("renders correctly", () => {
    expect(component).toBeDefined();
  });

  it("renders all elements", () => {
    expect(component.getByText("Seleccione Perfil")).toBeDefined();
    expect(component.getByText("Consumidor")).toBeDefined();
    expect(
      component.getByText("¡Trabaja con nosotros! (Opcional)")
    ).toBeDefined();
    expect(component.getByText("Quitar selección")).toBeDefined();
    expect(component.getByText("Siguiente")).toBeDefined();
  });

  it("changes selected type when a type is pressed", () => {
    const { getByText } = component;
    fireEvent.press(getByText("Productor"));
    expect(getByText("Siguiente")).toBeDefined();
  });

  it("clears selection when 'Quitar selección' is pressed", () => {
    const { getByText } = component;
    fireEvent.press(getByText("Quitar selección"));
    expect(getByText("Consumidor")).toBeDefined();
  });
});
