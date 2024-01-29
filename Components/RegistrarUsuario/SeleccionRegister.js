import React, { useState } from "react";
import { Link } from "react-router-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDolly,
  faShop,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const SeleccionRegister = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState("consumidor");

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleClearSelectionClick = () => {
    setSelectedType("consumidor");
  };

  return (
    <ImageBackground
      source={require("../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={{ color: "white", fontSize: 20 }}>
              Seleccione Perfil
            </Text>
          </View>
          <View style={styles.cardBody}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleTypeChange("consumidor")}
            >
              <Text>Consumidor</Text>
              <FontAwesomeIcon icon={faUser} />
            </TouchableOpacity>
            <View style={styles.hr} />
            <View style={styles.buttonGroup}>
              {["productor", "repartidor", "encargado"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.button,
                    selectedType === type && styles.activeButton,
                  ]}
                  onPress={() => handleTypeChange(type)}
                >
                  <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                  <FontAwesomeIcon
                    icon={
                      type === "productor"
                        ? faBriefcase
                        : type === "repartidor"
                        ? faDolly
                        : faShop
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSelectionClick}
            >
              <Text>Quitar selección</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activeButton}>
              <Text
                style={{ color: "white" }}
                onPress={()=>navigation.navigate(`Registrarse`,{tipoUsuario:selectedType})}
              >
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardheader: {
    marginBottom: 10,
  },
  cardBody: {
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    marginVertical: 10,
  },
  buttonGroup: {
    width: "100%",
  },
  activeButton: {
    backgroundColor: "blue",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default SeleccionRegister;
