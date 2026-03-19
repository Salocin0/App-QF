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
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const BuscadorPuestos = ({ onUpdate }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");
  const [tempCategoria, setTempCategoria] = useState(selectedCategoria);
  const [selectedStars, setSelectedStars] = useState(0);
  const [tempStars, setTempStars] = useState(0);

  const handleSearch = () => {
    onUpdate(selectedCategoria, searchText, selectedStars);
  };

  const handleOpenOrderModal = () => {
    setTempCategoria(selectedCategoria);
    setShowOrderModal(true);
  };

  const handleOpenFilterModal = () => {
    setTempStars(selectedStars);
    setShowFilterModal(true);
  };

  const handleApplyOrder = () => {
    setSelectedCategoria(tempCategoria);
    setShowOrderModal(false);
    onUpdate(tempCategoria, searchText, selectedStars);
  };

  const handleApplyFilter = () => {
    setSelectedStars(tempStars);
    setShowFilterModal(false);
    onUpdate(selectedCategoria, searchText, tempStars);
  };

  const handleSelectStars = (stars) => {
    setTempStars(stars === tempStars ? 0 : stars);
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
    buttonActive: {
      borderColor: Colors.Naranja,
      backgroundColor: Colors.modoOscuroActivo ? "#3a2e10" : "#fff9e6",
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
    starsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      marginVertical: 10,
    },
    starButton: {
      padding: 5,
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
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar puestos..."
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
          <Text style={styles.buttonText}>Ordenar por</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, selectedStars > 0 && styles.buttonActive]} 
          onPress={handleOpenFilterModal}
        >
          <FontAwesomeIcon icon={faFilter} color={Colors.Naranja} size={16} />
          <Text style={styles.buttonText}>
            {selectedStars > 0 ? `Estrellas: ${selectedStars}` : "Filtrar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Ordenar */}
      <Modal visible={showOrderModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
            
            <TouchableOpacity 
              style={[styles.optionItem, tempCategoria === "porNombre" && styles.optionItemSelected]} 
              onPress={() => setTempCategoria("porNombre")}
            >
              <Text style={styles.optionText}>Nombre</Text>
              {tempCategoria === "porNombre" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.optionItem, tempCategoria === "TiempoEntrega" && styles.optionItemSelected]} 
              onPress={() => setTempCategoria("TiempoEntrega")}
            >
              <Text style={styles.optionText}>Tiempo de entrega</Text>
              {tempCategoria === "TiempoEntrega" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.optionItem, tempCategoria === "Estrellas" && styles.optionItemSelected]} 
              onPress={() => setTempCategoria("Estrellas")}
            >
              <Text style={styles.optionText}>Estrellas</Text>
              {tempCategoria === "Estrellas" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
            </TouchableOpacity>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowOrderModal(false)}>
                <Text style={[styles.buttonActionText, { color: Colors.Rojo }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyOrder}>
                <Text style={[styles.buttonActionText, { color: "white" }]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Filtrar por Estrellas */}
      <Modal visible={showFilterModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por Estrellas</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  style={styles.starButton} 
                  onPress={() => handleSelectStars(star)}
                >
                  <FontAwesomeIcon 
                    icon={faStar} 
                    color={star <= tempStars ? Colors.Naranja : Colors.GrisClaroPeroNoTanClaro} 
                    size={32} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ textAlign: 'center', color: Colors.Gris, marginTop: 10 }}>
              {tempStars > 0 ? `${tempStars} estrellas seleccionadas` : "Seleccioná la puntuación mínima"}
            </Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowFilterModal(false)}>
                <Text style={[styles.buttonActionText, { color: Colors.Rojo }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
                <Text style={[styles.buttonActionText, { color: "white" }]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorPuestos;
