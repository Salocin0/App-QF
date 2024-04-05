import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { REACT_APP_BACK_URL } from "@env";

const useRegister = (navigation) => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [consumidorData, setConsumidorData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    dni: "",
    localidad: "",
    provincia: "",
    telefono: "",
  });
  const [encargadoData, setEncargadoData] = useState({
    cuit: "",
    razonSocial: "",
    ivaCondicion: "",
  });
  const [productorData, setProductorData] = useState({
    cuit: "",
    razonSocial: "",
    ivaCondicion: "",
  });

  const [registrar, setRegistrar] = useState(false);

  const handleUserDataChange = (data) => {
    setUserData(data);
  };

  const handleConsumidorDataChange = (data) => {
    setConsumidorData(data);
  };

  const handleProductorDataChange = (data) => {
    setProductorData(data);
  };
  const handleEncargadoDataChange = (data) => {
    setEncargadoData(data);
  };

  const activarRegistro = (tipoUsuario) => {
    setTipoUsuario(tipoUsuario);
    setRegistrar(true);
  };

  const handleRegister = async () => {
    const url = `${REACT_APP_BACK_URL}user/`;

    const datosRegistro = {
      correoElectronico: userData.email,
      contraseña: userData.password,
      usuario: {
        contraseña: userData.password,
        fechaAlta: Date.now(),
        nombreDeUsuario: userData.username,
        correoElectronico: userData.email,
        tipoUsuario: tipoUsuario,
      },
      consumidor: {
        nombre: consumidorData.nombre,
        apellido: consumidorData.apellido,
        fechaDeNacimiento: new Date(consumidorData.fechaNacimiento)
          .toISOString()
          .replace("T", " ")
          .slice(0, -1),
        dni: consumidorData.dni,
        localidad: consumidorData.localidad,
        provincia: consumidorData.provincia,
        telefono: consumidorData.telefono,
      },
      encargado: {
        cuit: encargadoData.cuit,
        razonSocial: encargadoData.razonSocial,
        condicionIva: encargadoData.ivaCondicion,
      },
      productor: {
        cuit: productorData.cuit,
        razonSocial: productorData.razonSocial,
        condicionIva: productorData.ivaCondicion,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosRegistro),
    };

    try {
      const response = await fetch(url, options);

      const responseData = await response.json();
      if (responseData.status === "sucess") {
        console.log("registro existoso");
        ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
        ToastAndroid.show(
          "Se envió un email de validación a su correo",
          ToastAndroid.SHORT
        );
        navigation.navigate("Login");
      } else {
        throw new Error(responseData.msg || "Error en el servidor");
      }
    } catch (error) {
      ToastAndroid.show(
        "Error al registrar. Por favor, vuelva a intentar.",
        ToastAndroid.SHORT
      );
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    if (registrar) {
      handleRegister();
    }
  }, [registrar]);

  return {
    userData,
    consumidorData,
    encargadoData,
    productorData,
    registrar,
    handleUserDataChange,
    handleConsumidorDataChange,
    handleProductorDataChange,
    handleEncargadoDataChange,
    setRegistrar,
    activarRegistro,
    setTipoUsuario,
  };
};

export default useRegister;
