import React, { useEffect, useState } from "react";
import { showToast } from "react-native-toast-message";
import FormConsumidor from "./Forms/FormConsumidor";
import FormRepartidor from "./Forms/FormRepartidor";
import FormProductor from "./Forms/FormProductor";
import FormUsuario from "./Forms/FormUsuario";
import useRegister from "../Hooks/UseRegister";
import { useRoute } from '@react-navigation/native';

const ProcesoRegistro = ({navigation}) => {
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
    handleProductorDataChange,
    handleRegister,
    setRegistrar,
    activarRegistro,
    setTipoUsuario
  } = useRegister(navigation);

  const nextStep = () => {
    setStep(step + 1);
  };

  const backStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <FormUsuario
          nextStep={nextStep}
          backStep={backStep}
          tipoUsuario={tipoUsuario}
          handleUserDataChange={handleUserDataChange}
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
          activarRegistro={activarRegistro}
          setTipoUsuario={setTipoUsuario}
        />
      );
    case 3:
      if (tipoUsuario === "repartidor") {
        return (
          <FormRepartidor
            nextStep={nextStep}
            backStep={backStep}
            tipoUsuario={tipoUsuario}
            navigation={navigation}
            activarRegistro={activarRegistro}
            setTipoUsuario={setTipoUsuario}
          />
        );
      } else if (tipoUsuario === "productor") {
        return (
          <FormProductor
            nextStep={nextStep}
            backStep={backStep}
            tipoUsuario={tipoUsuario}
            handleRegistro={handleProductorDataChange}
            activarRegistro={activarRegistro}
            navigation={navigation}
            setTipoUsuario={setTipoUsuario}
          />
        );
      }
  }
};

export default ProcesoRegistro;
