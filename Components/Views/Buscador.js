import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import { Colors } from "../Styles/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDownWideShort, faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";

const Buscador = () => {
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("porDistancia");

  const handleSearch = () => {
    console.log("Búsqueda:", searchText);
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

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenOrderModal}>
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenFilterModal}>
          <FontAwesomeIcon icon={faFilter} />
        </TouchableOpacity>
      </View>
      <Modal visible={showOrderModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Ordenar por:</Text>
            <TouchableOpacity
              style={[styles.radioButton, selectedOrder === 'porDistancia' && styles.radioButtonSelected]}
              onPress={() => handleSelectOrder('porDistancia')}
            >
              <Text>Por distancia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, selectedOrder === 'porNombre' && styles.radioButtonSelected]}
              onPress={() => handleSelectOrder('porNombre')}
            >
              <Text>Por nombre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, selectedOrder === 'porFecha' && styles.radioButtonSelected]}
              onPress={() => handleSelectOrder('porFecha')}
            >
              <Text>Por fecha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseOrderModal}>
              <Text style={{ color: Colors.Blanco }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showFilterModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Filtrar por:</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseFilterModal}>
              <Text style={{ color: Colors.Blanco }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 5,
    padding: 10,
    backgroundColor: Colors.Verde,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.Blanco,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.Rojo,
    borderRadius: 5,
  },
  radioButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: Colors.Verde,
  },
});

export default Buscador;
