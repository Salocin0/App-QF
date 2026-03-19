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
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    handleSearch();
  };

  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
    handleSearch();
  };

  const handleSelectCategoria = (order) => {
    setSelectedCategoria(order);
  };

  const handleToggleFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    handleSearch();
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
      justifyContent: "space-around",
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
      marginHorizontal: 0,
      borderWidth: 1,
      marginBottom: 10,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
    },
    buttonBuscar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors?.Blanco,
      borderRadius: 5,
      marginHorizontal: 0,
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
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: Colors.Verde,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
    },
    filterItem: {
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 5,
      marginBottom: 10,
      width: "100%",
    },
    filterText: {
      color: Colors.Negro,
      fontSize: 18,
    },
    filterItemActive: {
      backgroundColor: Colors.Gris,
    },
    filterItemInactive: {
      backgroundColor: Colors.Blanco,
    },
    filterItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 10,
    },
    uppercaseText: {
      textTransform: 'uppercase',
    },
    spacedText: {
      textTransform: 'uppercase',
      letterSpacing: 1,
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

      {/* Modal para ordenar */}
      <Modal visible={showOrderModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                color: Colors.Negro,
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "flex-start",
                paddingBottom: 10,
              }}
            >
              Ordenar por:
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porDistancia" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porDistancia")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      selectedCategoria === "porDistancia"
                        ? Colors.Blanco
                        : Colors.Negro,
                  }}
                >
                  Distancia
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porNombre" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porNombre")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      selectedCategoria === "porNombre"
                        ? Colors.Blanco
                        : Colors.Negro,
                  }}
                >
                  Nombre
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedCategoria === "porFecha" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => handleSelectCategoria("porFecha")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      selectedCategoria === "porFecha"
                        ? Colors.Blanco
                        : Colors.Negro,
                  }}
                >
                  Fecha
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseOrderModal}
            >
              <Text style={{ color: Colors.Blanco }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Filtros */}
      <Modal visible={showFilterModal} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                color: Colors.Negro,
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "flex-start",
                paddingBottom: 10,
              }}
            >
              Filtros:
            </Text>

            <TouchableOpacity
              style={[
                styles.filterItem,
                filters.iniciados && styles.filterItemActive,
              ]}
              onPress={() => handleToggleFilter("iniciados")}
            >
              <View style={styles.filterItemContainer}>
                <Text
                  style={[
                    styles.filterText,
                    styles.uppercaseText,
                    { color: filters.iniciados ? Colors.Blanco : Colors.Negro },
                  ]}
                >
                  Iniciados
                </Text>
                <Switch
                  value={filters.iniciados}
                  onValueChange={() => handleToggleFilter("iniciados")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterItem,
                filters.proximos && styles.filterItemActive,
              ]}
              onPress={() => handleToggleFilter("proximos")}
            >
              <View style={styles.filterItemContainer}>
                <Text
                  style={[
                    styles.filterText,
                    styles.uppercaseText,
                    { color: filters.proximos ? Colors.Blanco : Colors.Negro },
                  ]}
                >
                  Próximos
                </Text>
                <Switch
                  value={filters.proximos}
                  onValueChange={() => handleToggleFilter("proximos")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterItem,
                filters.conPreventa && styles.filterItemActive,
              ]}
              onPress={() => handleToggleFilter("conPreventa")}
            >
              <View style={styles.filterItemContainer}>
                <Text
                  style={[
                    styles.filterText,
                    styles.spacedText,
                    { color: filters.conPreventa ? Colors.Blanco : Colors.Negro },
                  ]}
                >
                  Con preventa
                </Text>
                <Switch
                  value={filters.conPreventa}
                  onValueChange={() => handleToggleFilter("conPreventa")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterItem,
                filters.sinPreventa && styles.filterItemActive,
              ]}
              onPress={() => handleToggleFilter("sinPreventa")}
            >
              <View style={styles.filterItemContainer}>
                <Text
                  style={[
                    styles.filterText,
                    styles.spacedText,
                    { color: filters.sinPreventa ? Colors.Blanco : Colors.Negro },
                  ]}
                >
                  Sin preventa
                </Text>
                <Switch
                  value={filters.sinPreventa}
                  onValueChange={() => handleToggleFilter("sinPreventa")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleApplyFilters}
            >
              <Text style={{ color: Colors.Blanco }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuscadorEventos;
