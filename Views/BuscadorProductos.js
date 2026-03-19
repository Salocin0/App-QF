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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const BuscadorProductos = ({ onSearch, onSort }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");
  const [tempCategoria, setTempCategoria] = useState(selectedCategoria);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleOpenOrderModal = () => {
    setTempCategoria(selectedCategoria);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleApplyOrder = () => {
    setSelectedCategoria(tempCategoria);
    onSort(tempCategoria);
    setShowOrderModal(false);
  };

  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleApplyFilters = () => {
    // Aquí podrías agregar la lógica de filtrado por precio si el padre lo soporta
    setShowFilterModal(false);
    handleSearch();
  };

  const handleSelectCategoria = (categoria) => {
    setTempCategoria(categoria);
  };

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      borderRadius: 10,
      paddingVertical: 5,
    },
    input: {
      flex: 1,
      height: 45,
      paddingHorizontal: 15,
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      color: Colors.Negro,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      gap: 10,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      ...Colors.Styles.card,
      marginVertical: 0,
      marginHorizontal: 0,
      height: 45,
    },
    buttonBuscar: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors?.Naranja,
      borderRadius: 10,
      width: 45,
      height: 45,
      elevation: 2,
    },
    buttonText: {
      marginLeft: 8,
      color: Colors?.Negro,
      fontWeight: "500",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
      backgroundColor: Colors.Blanco,
      padding: 25,
      borderRadius: 20,
      width: "85%",
      ...Colors.Styles.card,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 20,
      textAlign: "center",
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
      marginBottom: 10,
      width: "100%",
    },
    optionItemSelected: {
      borderColor: Colors.Naranja,
      backgroundColor: Colors.modoOscuroActivo ? "#3a2e10" : "#fff9e6",
    },
    optionText: {
      color: Colors.Negro,
      fontSize: 16,
      flex: 1,
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      width: "100%",
      gap: 10,
    },
    cancelButton: {
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Rojo,
      flex: 1,
      alignItems: "center",
    },
    applyButton: {
      padding: 12,
      borderRadius: 10,
      backgroundColor: Colors.Verde,
      flex: 1,
      alignItems: "center",
    },
    buttonActionText: {
      fontWeight: "bold",
      fontSize: 16,
    },
    filterContainer: {
      width: "100%",
    },
    priceInputContainer: {
      marginBottom: 15,
    },
    label: {
      color: Colors.Negro,
      marginBottom: 5,
      fontSize: 14,
      fontWeight: "500",
    },
    priceInput: {
      height: 45,
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 10,
      paddingHorizontal: 15,
      color: Colors.Negro,
      backgroundColor: Colors.modoOscuroActivo ? "#1a1a1a" : "#fafafa",
    },
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos..."
          placeholderTextColor={Colors.Gris}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.buttonBuscar} onPress={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size={18} />
        </TouchableOpacity>
      </View>

      {/* Botones de Ordenar y Filtrar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOpenOrderModal}>
          <FontAwesomeIcon icon={faArrowDownWideShort} color={Colors.Naranja} size={16} />
          <Text style={styles.buttonText}>Ordenar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenFilterModal}>
          <FontAwesomeIcon icon={faFilter} color={Colors.Naranja} size={16} />
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Ordenar */}
      <Modal visible={showOrderModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
            
            <TouchableOpacity 
              style={[styles.optionItem, tempCategoria === "porNombre" && styles.optionItemSelected]} 
              onPress={() => handleSelectCategoria("porNombre")}
            >
              <Text style={styles.optionText}>Nombre</Text>
              {tempCategoria === "porNombre" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.optionItem, tempCategoria === "porPrecio" && styles.optionItemSelected]} 
              onPress={() => handleSelectCategoria("porPrecio")}
            >
              <Text style={styles.optionText}>Precio</Text>
              {tempCategoria === "porPrecio" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
            </TouchableOpacity>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseOrderModal}>
                <Text style={[styles.buttonActionText, { color: Colors.Rojo }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyOrder}>
                <Text style={[styles.buttonActionText, { color: "white" }]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Filtrar */}
      <Modal visible={showFilterModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por Precio</Text>
            
            <View style={styles.filterContainer}>
              <View style={styles.priceInputContainer}>
                <Text style={styles.label}>Precio Mínimo</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0"
                  placeholderTextColor={Colors.Gris}
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
              </View>

              <View style={styles.priceInputContainer}>
                <Text style={styles.label}>Precio Máximo</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Sin límite"
                  placeholderTextColor={Colors.Gris}
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCloseFilterModal}>
                <Text style={[styles.buttonActionText, { color: Colors.Rojo }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={[styles.buttonActionText, { color: "white" }]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorProductos;
