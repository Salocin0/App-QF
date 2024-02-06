import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormUsuario from "./../Components/RegistrarUsuario/Forms/FormUsuario";

describe("FormUsuario Component", () => {
  let navigation;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };
  });

  it("renders correctly", () => {
    const { getByText } = render(<FormUsuario />);
    expect(getByText("Usuario")).toBeDefined();
    expect(getByText("Email")).toBeDefined();
    expect(getByText("Contraseña")).toBeDefined();
    expect(getByText("Repetir Contraseña")).toBeDefined();
    expect(getByText("Siguiente")).toBeDefined();
  });

  it("updates state with user input", () => {
    const { getByTestId } = render(<FormUsuario />);
    const usernameInput = getByTestId("Usuarioinput");
    fireEvent.changeText(usernameInput, "testuser");
    expect(usernameInput.props.value).toBe("testuser");
  });

});
