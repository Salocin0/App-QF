import React, { useEffect, useState } from "react";
import { showToast } from "react-native-toast-message";
import FormConsumidor from "./Forms/FormConsumidor";
import FormRepartidor from "./Forms/FormRepartidor";
import FormProductor from "./Forms/FormProductor";
import FormUsuario from "./Forms/FormUsuario";
import useRegister from "../Hooks/UseRegister";
import { useRoute } from '@react-navigation/native';

const ProcesoRegistro = (navigation) => {
  const route = useRoute();
  const { tipoUsuario } = route.params;
  const [step, setStep] = useState(1);
  const {
    userData,
    consumidorData,
    encargadoData,
    productorData,
    registrar,
    handleUserDataChange,
    handleConsumidorDataChange,
    handleEncargadoDataChange,
    handleProductorDataChange,
    handleRegister,
    setRegistrar
  } = useRegister();

  const nextStep = () => {
    setStep(step + 1);
  };

  const backStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    console.log(tipoUsuario);
    if (registrar) {
      handleRegister()
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          showToast({
            type: "error",
            text1: "Error al registrar. Por favor, vuelva a intentar.",
          });
          navigation.navigate("Home");
        });
    }
  }, [registrar]);

  switch (step) {
    case 1:
      return (
        <FormUsuario
          nextStep={nextStep}
          backStep={backStep}
          tipoUsuario={tipoUsuario}
          handleRegistro={handleUserDataChange}
        />
      );
    case 2:
      return (
        <FormConsumidor
          nextStep={nextStep}
          backStep={backStep}
          tipoUsuario={tipoUsuario}
          handleRegistro={handleConsumidorDataChange}
          navigation={navigation}
        />
      );
    case 3:
      if (tipoUsuario === "repartidor") {
        return (
          <FormRepartidor
            nextStep={nextStep}
            backStep={backStep}
            tipoUsuario={tipoUsuario}
            handleRegistro={handleEncargadoDataChange}
            navigation={navigation}
          />
        );
      } else if (tipoUsuario === "productor") {
        return (
          <FormProductor
            nextStep={nextStep}
            backStep={backStep}
            tipoUsuario={tipoUsuario}
            handleRegistro={handleProductorDataChange}
            navigation={navigation}
          />
        );
      }
  }
};

export default ProcesoRegistro;
