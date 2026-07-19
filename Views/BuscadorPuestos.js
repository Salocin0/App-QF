import React, { useState, useEffect } from "react";
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const BuscadorPuestos = ({ onUpdate }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");
  const [tempCategoria, setTempCategoria] = useState(selectedCategoria);

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(selectedCategoria, searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleOpenOrderModal = () => {
    setTempCategoria(selectedCategoria);
    setShowOrderModal(true);
  };

  const handleApplyOrder = () => {
    setSelectedCategoria(tempCategoria);
    setShowOrderModal(false);
    onUpdate(tempCategoria, searchText);
  };

  const handleSelectCategoria = (order) => {
    setTempCategoria(order);
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
      justifyContent: "flex-start",
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
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      ...Colors.Styles.card,
      marginVertical: 0,
      marginHorizontal: 0,
      height: 45,
      paddingHorizontal: 20,
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
      </View>

      {/* Botón de Ordenar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOpenOrderModal}>
          <FontAwesomeIcon icon={faArrowDownWideShort} color={Colors.Naranja} size={16} />
          <Text style={styles.buttonText}>Ordenar por</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Ordenar */}
      <ThemedModal
        visible={showOrderModal}
        title="Ordenar por"
        onClose={() => setShowOrderModal(false)}
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: () => setShowOrderModal(false) },
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
          style={[styles.optionItem, tempCategoria === "TiempoEntrega" && styles.optionItemSelected]} 
          onPress={() => handleSelectCategoria("TiempoEntrega")}
        >
          <Text style={styles.optionText}>Tiempo de entrega</Text>
          {tempCategoria === "TiempoEntrega" && <FontAwesomeIcon icon={faCheck} color={Colors.Naranja} size={14} />}
        </TouchableOpacity>
      </ThemedModal>
    </View>
  );
};

export default BuscadorPuestos;
