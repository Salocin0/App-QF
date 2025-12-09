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

const BuscadorEventos = ({ onSearch, onFilter, onOrder }) => {
  const Colors = useDynamicColors();
  const [searchText, setSearchText] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("porDistancia");
  const [selectedOrder, setSelectedOrder] = useState("ASC");
  const [distMin, setDistMin] = useState(0);
  const [distMax, setDistMax] = useState(99999);
  const [daysMin, setDaysMin] = useState(0);
  const [daysMax, setDaysMax] = useState(99999);

  const handleSearch = () => {
    console.log("Búsqueda:", searchText);
    if (typeof onSearch === "function") onSearch(searchText.trim());
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

  const handleSelectCategoria = (order) => {
    setSelectedCategoria(order);
    setShowOrderModal(false);
    if (typeof onFilter === "function") onFilter({ categoria: order, selectedOrder });
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(false);
    if (typeof onOrder === "function") onOrder(order);
  };

  const applyFilterAndClose = () => {
    setShowFilterModal(false);
    if (typeof onFilter === 'function') {
      onFilter({
        categoria: selectedCategoria,
        selectedOrder,
        distMin: Number(distMin) || 0,
        distMax: Number(distMax) || 99999,
        daysMin: Number(daysMin) || 0,
        daysMax: Number(daysMax) || 99999,
      });
    }
  };

  const styles = {
    container: {
      height: 70,
      paddingVertical: 5,
      marginHorizontal: 20,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      paddingLeft:5,
      paddingRight:10,
      paddingBottom:5,
      paddingTop:2,
    },
    input: {
      flex: 1,
      height: 35,
      margin: 5,
      marginTop: 10,
      paddingHorizontal: 10,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
      borderWidth: 1,
      borderRadius: 5,
    },
    button: {
      marginLeft: 5,
      padding: 10,
      backgroundColor: Colors?.Verde,
      borderRadius: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalContent: {
      width: "100%",
      backgroundColor: Colors?.Blanco,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 18,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: Colors?.Rojo,
      borderRadius: 5,
    },
    radioButton: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: Colors?.GrisClaroPeroNoTanClaro,
      borderRadius: 5,
      marginHorizontal: 5,
      minWidth: 80,
      textAlign: "center",
    },
    radioButtonSelected: {
      backgroundColor: Colors?.Verde,
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, { color: Colors.Negro, fontSize: 13 }]}
          placeholder="Buscar..."
          placeholderTextColor={Colors.Negro}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} accessibilityLabel="Buscar eventos">
          <FontAwesomeIcon icon={faMagnifyingGlass} color={Colors.Negro} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenOrderModal}>
          <FontAwesomeIcon icon={faArrowDownWideShort} color={Colors.Negro} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenFilterModal}>
          <FontAwesomeIcon icon={faFilter} color={Colors.Negro} />
        </TouchableOpacity>
      </View>
      <Modal visible={showOrderModal} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={handleCloseOrderModal}
        >
          <View style={styles.modalContent}>
            <Text style={{ color: Colors.Negro }}>Orden:</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOrder === "ASC" && styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectOrder("ASC")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  ASC
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOrder === "DESC" && styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectOrder("DESC")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  DESC
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: Colors.Negro, marginTop: 12 }}>Categoria:</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porDistancia" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porDistancia")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  Distancia
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porNombre" && styles.radioButtonSelected,
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
                  selectedCategoria === "porFecha" && styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porFecha")}
              >
                <Text style={{ textAlign: "center", color: Colors.Negro }}>
                  Fecha
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseOrderModal}
            >
              <Text style={{ color: Colors?.Blanco }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={showFilterModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, color: Colors?.Negro }}>
              Filtrar por
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10, color: Colors?.Negro }}>
              Distancia
            </Text>
            <View style={styles.filterContainer}>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Mínimo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  value={String(distMin)}
                  onChangeText={(text) => setDistMin(text)}
                  placeholder="0 km"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Máximo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  value={String(distMax)}
                  onChangeText={(text) => setDistMax(text)}
                  placeholder="∞ km"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={{ fontSize: 16, marginTop: 10, color: Colors?.Negro }}>
              Días para empezar:
            </Text>
            <View style={styles.filterContainer}>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Mínimo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  value={String(daysMin)}
                  onChangeText={(text) => setDaysMin(text)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{ color: Colors?.Negro }}>Máximo:</Text>
                <TextInput
                  style={[styles.input, { color: Colors.Negro }]}
                  placeholderTextColor={Colors.Negro}
                  value={String(daysMax)}
                  onChangeText={(text) => setDaysMax(text)}
                  placeholder="∞"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.closeButton, { flex: 1, marginRight: 8 }]}
                onPress={() => applyFilterAndClose()}
              >
                <Text style={{ color: Colors?.Blanco }}>Aplicar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeButton, { flex: 1, marginLeft: 8, backgroundColor: Colors?.Rojo }]}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={{ color: Colors?.Blanco }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorEventos;
