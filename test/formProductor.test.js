import React from "react";
import { render } from "@testing-library/react-native";
import FormProductor from "./../Components/RegistrarUsuario/Forms/FormProductor";

describe("FormProductor Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <FormProductor
        nextStep={() => {}}
        backStep={() => {}}
        handleRegistro={() => {}}
        activarRegistro={() => {}}
      />
    );
    expect(getByText("Datos Productor 3/3")).toBeDefined();
    expect(getByText("CUIT")).toBeDefined();
    expect(getByText("Razón Social")).toBeDefined();
    expect(getByText("Condicion frente al iva")).toBeDefined();
    expect(getByText("Atrás")).toBeDefined();
    expect(getByText("Finalizar")).toBeDefined();
  });
});
