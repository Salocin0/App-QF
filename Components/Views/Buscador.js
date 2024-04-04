import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Colors } from "../Styles/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownWideShort,
  faMagnifyingGlass,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const Buscador = () => {
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategotia] = useState("porDistancia");
  const [selectedOrder, setSelectedOrder] = useState("ASC");

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

  const handleSelectCategotia = (order) => {
    setSelectedCategotia(order);
    setShowOrderModal(false);
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
            <Text>Orden:</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOrder === "ASC" && styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectOrder("ASC")}
              >
                <Text style={{ textAlign: "center" }}>ASC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOrder === "DESC" && styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectOrder("DESC")}
              >
                <Text style={{ textAlign: "center" }}>DESC</Text>
              </TouchableOpacity>
            </View>
            <Text>Categoria:</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porDistancia" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategotia("porDistancia")}
              >
                <Text style={{ textAlign: "center" }}>Distancia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porNombre" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategotia("porNombre")}
              >
                <Text style={{ textAlign: "center" }}>Nombre</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porFecha" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategotia("porFecha")}
              >
                <Text style={{ textAlign: "center" }}>Fecha</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseOrderModal}
            >
              <Text style={{ color: Colors.Blanco }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showFilterModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize:18}}>Filtrar por:</Text>
            <Text style={{fontSize:16, marginTop:10}}>Distancia:</Text>
            <View style={styles.filterContainer}>
              <View style={styles.inputContainer}>
                <Text>Mínimo:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {}}
                  placeholder="Mínimo"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Máximo:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {}}
                  placeholder="Máximo"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={{fontSize:16, marginTop:10}}>Días para empezar:</Text>
            <View style={styles.filterContainer}>
              
              <View style={styles.inputContainer}>
                <Text>Mínimo:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {}}
                  placeholder="Mínimo"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Máximo:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {}}
                  placeholder="Máximo"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseFilterModal}
            >
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
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
    width: 80,
    textAlign: "center",
  },
  radioButtonSelected: {
    backgroundColor: Colors.Verde,
  },
  filterContainer: {
    flexDirection:"row"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width:"50%"
  },
});

export default Buscador;
