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

const BuscadorProductos = ({ onSearch, onSort }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleOpenOrderModal = () => {
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleSelectCategoria = (categoria) => {
    setSelectedCategoria(categoria);
    onSort(categoria); // Pass selected category up to parent
    setShowOrderModal(false);
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
      justifyContent: "space-between",
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
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
    },
    buttonBuscar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors?.Blanco,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
      width: 40,
      height: 40,
    },
    buttonText: {
      marginLeft: 5,
      color: Colors?.Negro,
    },
    filterContainer: {
      flexDirection: "row",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      width: "50%",
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
    },
    filterButtonDisabled: {
      backgroundColor: Colors.GrisClaro,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
    },
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, { color: Colors.Negro }]}
          placeholder="Buscar eventos..."
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
          onPress={handleOpenFilterModal}
        >
          <FontAwesomeIcon icon={faFilter} color={Colors.Negro} />
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showOrderModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ color: Colors.Negro }}>Categoría:</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porNombre" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porNombre")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  Nombre
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porPrecio" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porPrecio")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  Precio
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseOrderModal}
            >
              <Text style={{ color: Colors?.Negro }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showFilterModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, color: Colors?.Negro }}>
              Filtrar por
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10, color: Colors?.Negro }}>
              Precio
            </Text>
            <View style={styles.filterContainer}>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Mínimo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Máximo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  placeholder="∞"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseFilterModal}
            >
              <Text style={{ color: Colors?.Blanco }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorProductos;
