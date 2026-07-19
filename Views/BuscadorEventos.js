import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import useDynamicColors from "../Styles/useDynamicColors";
import ThemedModal from "../components/ThemedModal/ThemedModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownWideShort,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const BuscadorEventos = ({ onUpdate }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porDistancia");
  const [filters, setFilters] = useState({
    iniciados: true,
    proximos: true,
    conPreventa: true,
    sinPreventa: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate?.(selectedCategoria, filters, searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleOpenOrderModal = () => {
    setTempCategoria(selectedCategoria);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleApplyOrder = () => {
    setSelectedCategoria(tempCategoria);
    setShowOrderModal(false);
    onUpdate?.(tempCategoria, filters, searchText);
  };

  const handleOpenFilterModal = () => {
    setTempFilters({ ...filters });
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setShowFilterModal(false);
    onUpdate?.(selectedCategoria, tempFilters, searchText);
  };

  const handleClearFilters = () => {
    setTempFilters({
      iniciados: true,
      proximos: true,
      conPreventa: true,
      sinPreventa: true,
    });
  };

  const handleSelectCategoria = (order) => {
    setTempCategoria(order);
  };

  const handleToggleFilter = (filterKey) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  const [tempCategoria, setTempCategoria] = useState(selectedCategoria);
  const [tempFilters, setTempFilters] = useState({ ...filters });

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
    filterItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: Colors.GrisClaroPeroNoTanClaro,
    },
    filterText: {
      color: Colors.Negro,
      fontSize: 16,
    },
    clearButton: {
      alignSelf: "center",
      marginTop: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Naranja,
      backgroundColor: "transparent",
    },
    clearButtonText: {
      color: Colors.Naranja,
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar eventos..."
          placeholderTextColor={Colors.Gris}
          value={searchText}
          onChangeText={setSearchText}
        />
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
          style={[styles.optionItem, tempCategoria === "porDistancia" && styles.optionItemSelected]} 
          onPress={() => handleSelectCategoria("porDistancia")}
        >
          <Text style={styles.optionText}>Distancia</Text>
          {tempCategoria === "porDistancia" && <FontAwesomeIcon icon={faPlus} color={Colors.Naranja} size={14} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionItem, tempCategoria === "porFecha" && styles.optionItemSelected]} 
          onPress={() => handleSelectCategoria("porFecha")}
        >
          <Text style={styles.optionText}>Fecha</Text>
          {tempCategoria === "porFecha" && <FontAwesomeIcon icon={faPlus} color={Colors.Naranja} size={14} />}
        </TouchableOpacity>
      </ThemedModal>

      {/* Modal de Filtrar */}
      <ThemedModal
        visible={showFilterModal}
        title="Filtrar eventos"
        onClose={handleCloseFilterModal}
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: handleCloseFilterModal },
          { text: "Aceptar", onPress: handleApplyFilters },
        ]}
      >
        <View style={styles.filterItemContainer}>
          <Text style={styles.filterText}>Iniciados</Text>
          <Switch
            value={tempFilters.iniciados}
            onValueChange={() => handleToggleFilter("iniciados")}
            trackColor={{ false: Colors.Gris, true: Colors.Verde }}
          />
        </View>

        <View style={styles.filterItemContainer}>
          <Text style={styles.filterText}>Próximos</Text>
          <Switch
            value={tempFilters.proximos}
            onValueChange={() => handleToggleFilter("proximos")}
            trackColor={{ false: Colors.Gris, true: Colors.Verde }}
          />
        </View>

        <View style={styles.filterItemContainer}>
          <Text style={styles.filterText}>Con Preventa</Text>
          <Switch
            value={tempFilters.conPreventa}
            onValueChange={() => handleToggleFilter("conPreventa")}
            trackColor={{ false: Colors.Gris, true: Colors.Verde }}
          />
        </View>

        <View style={styles.filterItemContainer}>
          <Text style={styles.filterText}>Sin Preventa</Text>
          <Switch
            value={tempFilters.sinPreventa}
            onValueChange={() => handleToggleFilter("sinPreventa")}
            trackColor={{ false: Colors.Gris, true: Colors.Verde }}
          />
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
          <Text style={styles.clearButtonText}>Limpiar filtros</Text>
        </TouchableOpacity>
      </ThemedModal>
    </View>
  );
};

export default BuscadorEventos;
