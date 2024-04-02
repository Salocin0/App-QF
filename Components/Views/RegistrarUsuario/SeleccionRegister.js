import React, { useState } from "react";
import styles from "../../Styles/styles";
import {
  View,
  Text,
  TouchableOpacity,
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
      source={require("../../../assets/QuickFoodCortado.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>
              Seleccione Perfil
            </Text>
          </View>
          <View style={styles.cardBody}>
            <TouchableOpacity
              style={styles.btnActive}
              onPress={() => handleTypeChange("consumidor")}
            >
              <Text>Consumidor</Text>
              <FontAwesomeIcon icon={faUser} style={{}} />
            </TouchableOpacity>
            <View style={styles.hr} />
            <View style={styles.buttonGroup}>
              <Text>¡Trabaja con nosotros! (Opcional)</Text>
              {["productor", "repartidor", "encargado"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.btnSelect,
                    selectedType === type && styles.btnActive,
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
            <TouchableOpacity style={styles.containerCard}>
              <Text
                style={styles.buttonForm}
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

export default SeleccionRegister;
