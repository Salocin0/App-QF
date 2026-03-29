import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDolly,
  faShop,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const SeleccionRegister = ({ navigation }) => {
  const Colors = useDynamicColors();
  const [selectedType, setSelectedType] = useState("consumidor");

  const localStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: Colors.Blanco,
    },
    card: {
      width: "85%",
      backgroundColor: Colors.Blanco,
      padding: 15,
      borderRadius: 10,
      elevation: 3,
      borderWidth: Colors.modoOscuroActivo ? 1 : 0,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : "transparent",
    },
    cardheader: {
      marginBottom: 10,
      alignSelf: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    cardBody: {
      alignItems: "center",
      width: "100%",
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.GrisClaroPeroNoTanClaro,
      width: "100%",
      marginVertical: 10,
    },
    buttonGroup: {
      alignItems: "center",
      width: "100%",
    },
    btnSelect: {
      marginVertical: 5,
      backgroundColor: Colors.GrisClaro,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      borderRadius: 5,
    },
    btnActive: {
      marginVertical: 5,
      backgroundColor: Colors.Naranja,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      borderRadius: 5,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    clearButton: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      padding: 10,
      borderRadius: 5,
    },
    buttonForm: {
      backgroundColor: Colors.Azul,
      borderRadius: 5,
      padding: 10,
      color: "white",
    },
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleClearSelectionClick = () => {
    setSelectedType("consumidor");
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.card}>
        <View style={localStyles.cardheader}>
          <Text style={localStyles.title}>
            Seleccione Perfil
          </Text>
        </View>
        <View style={localStyles.cardBody}>
          <TouchableOpacity
            style={localStyles.btnActive}
            onPress={() => handleTypeChange("consumidor")}
          >
            <Text style={{ color: Colors.Negro }}>Consumidor</Text>
            <FontAwesomeIcon icon={faUser} color={Colors.Negro} />
          </TouchableOpacity>
          <View style={localStyles.hr} />
          <View style={localStyles.buttonGroup}>
            <Text style={{ color: Colors.Negro, marginBottom: 10 }}>¡Trabaja con nosotros! (Opcional)</Text>
            {["productor", "repartidor", "encargado"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  localStyles.btnSelect,
                  selectedType === type && localStyles.btnActive,
                ]}
                onPress={() => handleTypeChange(type)}
              >
                <Text style={{ color: Colors.Negro }}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                <FontAwesomeIcon
                  icon={
                    type === "productor"
                      ? faBriefcase
                      : type === "repartidor"
                      ? faDolly
                      : faShop
                  }
                  color={Colors.Negro}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={localStyles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleClearSelectionClick}
          >
            <Text style={{ color: Colors.Negro, padding: 10 }}>Quitar selección</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ ...localStyles.buttonForm, padding: 10, color: 'white', textAlign: 'center' }}
              onPress={()=>navigation.navigate(`Registrarse`,{tipoUsuario:selectedType})}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SeleccionRegister;
