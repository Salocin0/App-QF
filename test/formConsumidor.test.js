import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormConsumidor from "../Components/RegistrarUsuario/Forms/FormConsumidor";

describe("FormConsumidor Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <FormConsumidor
        nextStep={() => {}}
        backStep={() => {}}
        handleRegistro={() => {}}
        tipoUsuario={"consumidor"}
        activarRegistro={() => {}}
        navigation={{}}
        setTipoUsuario={() => {}}
      />
    );
    expect(getByText("Datos Consumidor 2/2")).toBeDefined();
    expect(getByText("Nombre")).toBeDefined();
    expect(getByText("Apellido")).toBeDefined();
    expect(getByText("DNI")).toBeDefined();
    expect(getByText("Fecha de Nacimiento")).toBeDefined();
    expect(getByText("Seleccione una provincia")).toBeDefined();
    expect(getByText("Seleccione una localidad")).toBeDefined();
    expect(getByText("Teléfono")).toBeDefined();
    expect(getByText("Atrás")).toBeDefined();
    expect(getByText("Finalizar")).toBeDefined();
  });
});
