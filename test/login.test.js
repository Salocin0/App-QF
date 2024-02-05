import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../Components/Login";

let component;

describe("App", () => {
  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
    };

    component = render(<Login navigation={navigation} />);
  });

  describe("<Login />", () => {
    it("has defined", () => {
      expect(component).toBeDefined();
    });
    it("has all elements", () => {
      expect(component.getByTestId("usuario")).toBeDefined();
      expect(component.getByTestId("contraseña")).toBeDefined();
      expect(component.getByTestId("botonIngresar")).toBeDefined();
      expect(component.getByTestId("recuperarContraseña")).toBeDefined();
      expect(component.getByTestId("registrarse")).toBeDefined();
    });
    it("redirects to Recuperar Contraseña screen when 'Recuperar Contraseña' is pressed", () => {
      const { getByTestId, getByText } = component;
      fireEvent.press(getByTestId("recuperarContraseña"));
      expect(getByText("Recuperar Contraseña")).toBeDefined();
    });

    it("redirects to Seleccion Perfil screen when 'Registrarse' is pressed", () => {
      const { getByTestId, getByText } = component;
      fireEvent.press(getByTestId("registrarse"));
      expect(getByText("Registrarse")).toBeDefined();
    });
  });
});
