import React from "react";
import { render } from "@testing-library/react-native";
import FormEncargado from "./../Components/RegistrarUsuario/Forms/FormEncargado";

describe("FormEncargado Component", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <FormEncargado
        nextStep={() => {}}
        backStep={() => {}}
        handleRegistro={() => {}}
        activarRegistro={() => {}}
      />
    );
    expect(getByText("Datos Encargado 3/3")).toBeDefined();
    expect(getByText("CUIT")).toBeDefined();
    expect(getByText("Razón Social")).toBeDefined();
    expect(getByText("Condicion frente al iva")).toBeDefined();
    expect(getByText("Atrás")).toBeDefined();
    expect(getByText("Finalizar")).toBeDefined();
  });
});
