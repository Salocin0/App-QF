import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

let component;

describe("App", () => {
  beforeEach(() => {
    component = render(<App />);
  });

  describe("<App />", () => {
    it("has defined", () => {
      expect(component).toBeDefined();
    });
  });
});
