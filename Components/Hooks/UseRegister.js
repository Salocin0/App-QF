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
    
    // Log de la URL completa
    console.log("=== REGISTRO ===");
    console.log("URL completa del fetch:", url);
    console.log("REACT_APP_BACK_URL:", REACT_APP_BACK_URL);

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

    console.log("Datos a enviar:", JSON.stringify(datosRegistro, null, 2));

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosRegistro),
    };

    try {
      console.log("Iniciando fetch...");
      const response = await fetch(url, options);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseData = await response.json();
      console.log("Response data:", JSON.stringify(responseData, null, 2));
      
      if (responseData.status === "success") {
        ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
        ToastAndroid.show(
          "Se envió un email de validación a su correo",
          ToastAndroid.SHORT
        );
        navigation.navigate("Login");
      } else {
        console.error("Error del servidor:", responseData.msg || "Error en el servidor");
        throw new Error(responseData.msg || "Error en el servidor");
      }
    } catch (error) {
      console.error("=== ERROR EN REGISTRO ===");
      console.error("Tipo de error:", error.name);
      console.error("Mensaje:", error.message);
      console.error("Stack:", error.stack);
      ToastAndroid.show(
        `Error al registrar: ${error.message}`,
        ToastAndroid.LONG
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
