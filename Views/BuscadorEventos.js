import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import useDynamicColors from "../Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownWideShort,
  faMagnifyingGlass,
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

  const handleSearch = () => {
    onUpdate(selectedCategoria, filters, searchText);
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
    setShowOrderModal(false);
    onUpdate(tempCategoria, filters, searchText);
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
    onUpdate(selectedCategoria, tempFilters, searchText);
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
            <Text style={styles.modalTitle}>Filtrar eventos</Text>
            
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

export default BuscadorEventos;
