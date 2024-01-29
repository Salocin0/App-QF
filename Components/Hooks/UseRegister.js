import { useState } from "react";
import { REACT_APP_BACK_URL } from "@env";
import { ToastAndroid } from "react-native";

const useRegister = (navigation) => {
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

  const handleUserDataChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleConsumidorDataChange = (field, value) => {
    setConsumidorData((prevConsumidorData) => ({
      ...prevConsumidorData,
      [field]: value,
    }));
  };

  const handleEncargadoDataChange = (field, value) => {
    setEncargadoData((prevEncargadoData) => ({
      ...prevEncargadoData,
      [field]: value,
    }));
  };

  const handleProductorDataChange = (field, value) => {
    setProductorData((prevProductorData) => ({
      ...prevProductorData,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
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
        fechaDeNacimiento: consumidorData.fechaNacimiento,
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

    try {
      const response = await fetch(`${REACT_APP_BACK_URL}user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRegistro),
      });

      if (!response.ok) {
        throw new Error("Respuesta de servidor no exitosa");
      }

      const data = await response.json();

      if (data.status === "success") {
        ToastAndroid({
          type: "success",
          text1: "Registro exitoso",
          text2: "Se envió un email de validación a su correo",
        });
        navigation.navigate("Login");
      } else {
        throw new Error(data.msg || "Error en el servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      ToastAndroid({
        type: "error",
        text1: "Error al registrar. Por favor, vuelva a intentar.",
      });
      navigation.navigate("Home");
    }
  };

  return {
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
    setRegistrar,
  };
};

export default useRegister;
