import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import useDynamicColors from "../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownWideShort,
  faMagnifyingGlass,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const BuscadorPuestos = ({ onUpdate }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");

  const handleSearch = () => {
    onUpdate(selectedCategoria, searchText);
  };

  const handleOpenOrderModal = () => {
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    handleSearch();
  };

  const handleSelectCategoria = (categoria) => {
    setSelectedCategoria(categoria);
  };

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors.GrisClaro,
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 0,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: Colors?.Blanco,
      borderRadius: 5,
      marginRight: 10,
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 0,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: Colors?.Blanco,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 0,
      borderWidth: 1,
      marginBottom: 10,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
    },
    buttonBuscar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors?.Blanco,
      borderRadius: 5,
      marginHorizontal: 0,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
      width: 40,
      height: 40,
    },
    buttonText: {
      marginLeft: 5,
      color: Colors?.Negro,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    radioButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 5,
      marginHorizontal: 5,
      flex: 1,
      alignItems: "center",
    },
    radioButtonSelected: {
      backgroundColor: Colors.Verde,
      color: Colors.Blanco,
    },
    applyButton: {
      padding: 10,
      backgroundColor: Colors.Verde,
      borderRadius: 5,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, { color: Colors.Negro }]}
          placeholder="Buscar puestos..."
          placeholderTextColor={Colors.Negro}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.buttonBuscar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color={Colors.Negro} />
        </TouchableOpacity>
      </View>

      {/* Botones de Ordenar por y Filtrar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { marginEnd: 5 }]}
          onPress={handleOpenOrderModal}
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} color={Colors.Negro} />
          <Text style={styles.buttonText}>Ordenar por</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginStart: 5 }]}
          onPress={() => {}}
          disabled
        >
          <FontAwesomeIcon icon={faFilter} color={Colors.Negro} />
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showOrderModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Categoría */}
            <Text style={{ color: Colors.Negro, marginBottom: 10 }}>
              Ordenar por:
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around", width: '100%' }}
            >
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porNombre" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porNombre")}
              >
                <Text style={{ color: Colors.Negro }}>Nombre</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "TiempoEntrega" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("TiempoEntrega")}
              >
                <Text style={{ color: Colors.Negro }}>Tiempo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "Estrellas" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("Estrellas")}
              >
                <Text style={{ color: Colors.Negro }}>Estrellas</Text>
              </TouchableOpacity>
            </View>

            {/* Botón de aplicar */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleCloseOrderModal}
            >
              <Text style={{ color: Colors.Blanco }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorPuestos;
