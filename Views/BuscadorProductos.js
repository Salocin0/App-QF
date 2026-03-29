import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useDynamicColors from "../Styles/useDynamicColors";
import ThemedModal from "../components/ThemedModal/ThemedModal";
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
      backgroundColor: Colors.modoOscuroActivo ? Colors.FondoCardOscuro : Colors.FondoCardClaro,
    },
    optionText: {
      color: Colors.Negro,
      fontSize: 16,
      flex: 1,
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
      backgroundColor: Colors.modoOscuroActivo ? Colors.FondoInputOscuro : Colors.FondoInputClaro,
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
      <ThemedModal
        visible={showOrderModal}
        title="Ordenar por"
        onClose={handleCloseOrderModal}
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: handleCloseOrderModal },
          { text: "Aceptar", onPress: handleApplyOrder },
        ]}
      >
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
      </ThemedModal>

      {/* Modal de Filtrar */}
      <ThemedModal
        visible={showFilterModal}
        title="Filtrar por Precio"
        onClose={handleCloseFilterModal}
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: handleCloseFilterModal },
          { text: "Aceptar", onPress: handleApplyFilters },
        ]}
      >
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
      </ThemedModal>
    </View>
  );
};

export default BuscadorProductos;
