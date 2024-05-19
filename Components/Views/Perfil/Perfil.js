import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useGetPerfilQuery } from "../../App/Service/PerfilApi";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const navigation = useNavigation();

  const { data, error, isLoading } = useGetPerfilQuery(userId);

  const handleDisableUser = (role) => {
    //crear la api al back para desactivar el rol
    //si funciona actualizar la pantalla
    //sino mostrar toast con error
  };

  const handleEditarUser = () => {
    navigation.navigate("EditarPerfil");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      backgroundColor: Colors.Blanco,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    button: {
      marginTop: 4,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.Naranja} />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.Negro }}>Error al cargar los datos del perfil</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.habilitado && (
        <>
          <Text style={styles.title}>Usuario</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Nombre: {data.nombre}</Text>
            <Text style={{ color: Colors.Negro }}>Apellido: {data.apellido}</Text>
            <Text style={{ color: Colors.Negro }}>DNI: {data.dni}</Text>
            <Text style={{ color: Colors.Negro }}>Teléfono: {data.telefono}</Text>
            <Text style={{ color: Colors.Negro }}>Localidad: {data.localidad}</Text>
            <Text style={{ color: Colors.Negro }}>Provincia: {data.provincia}</Text>
            <View style={styles.button}>
              <Button title="Deshabilitar usuario" color={Colors.Rojo} onPress={() => handleDisableUser("Usuario")} />
            </View>
          </View>
        </>
      )}

      {data.productor && data.productor.habilitado && (
        <>
          <Text style={styles.title}>Productor</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Condición IVA: {data.productor.condicionIva}</Text>
            <Text style={{ color: Colors.Negro }}>CUIT: {data.productor.cuit}</Text>
            <Text style={{ color: Colors.Negro }}>Razón Social: {data.productor.razonSocial}</Text>
            <Text style={{ color: Colors.Negro }}>Validez: {data.productor.estaValido ? "Sí" : "No"}</Text>
            <View style={styles.button}>
              <Button title="Deshabilitar usuario Productor" color={Colors.Rojo} onPress={() => handleDisableUser("Productor")} />
            </View>
          </View>
        </>
      )}
      {data.repartidore && data.repartidore.habilitado && (
        <>
          <Text style={styles.title}>Repartidor</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Repartidor ID: {data.repartidore.id}</Text>
            <Text style={{ color: Colors.Negro }}>Validez: {data.repartidore.estaValido ? "Sí" : "No"}</Text>
            <View style={styles.button}>
              <Button title="Deshabilitar usuario Repartidor" color={Colors.Rojo} onPress={() => handleDisableUser("Repartidor")} />
            </View>
          </View>
        </>
      )}
      {data.encargado && data.encargado.habilitado && (
        <>
          <Text style={styles.title}>Encargado</Text>
          <View style={styles.card}>
            <Text style={{ color: Colors.Negro }}>Condición IVA: {data.encargado.condicionIva}</Text>
            <Text style={{ color: Colors.Negro }}>CUIT: {data.encargado.cuit}</Text>
            <Text style={{ color: Colors.Negro }}>Razón Social: {data.encargado.razonSocial}</Text>
            <Text style={{ color: Colors.Negro }}>Validez: {data.encargado.estaValido ? "Sí" : "No"}</Text>
            <View style={styles.button}>
              <Button title="Deshabilitar usuario Encargado" color={Colors.Rojo} onPress={() => handleDisableUser("Encargado")} />
            </View>
          </View>
        </>
      )}
      <View style={styles.button}>
        <Button title="Editar Datos" color={Colors.Azul} onPress={() => handleEditarUser()} />
      </View>
    </View>
  );
};

export default Perfil;
