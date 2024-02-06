import React from "react";
import { render } from "@testing-library/react-native";
import FormRepartidor from "./../Components/RegistrarUsuario/Forms/FormRepartidor";

describe("FormRepartidor Component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <FormRepartidor
        nextStep={() => {}}
        backStep={() => {}}
        handleRegistro={() => {}}
        activarRegistro={() => {}}
      />
    );
    expect(getByText("Datos Repartidor 3/3")).toBeDefined();
    expect(getByTestId("checkbox")).toBeDefined();
    expect(getByText("Atrás")).toBeDefined();
    expect(getByText("Finalizado")).toBeDefined();
  });
});
