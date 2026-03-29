import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";

const StatusTabs = ({ onStatusSelect }) => {
  const [selectedStatus, setSelectedStatus] = useState("Todos"); // Estado inicial seleccionado
  const Colors = useDynamicColors();

  const statuses = [
    { label: "Todos", filter: "Todos" },
    { label: "Pendientes", filter: ["PendienteDeAceptacion"] },
    { label: "Finalizados", filter: ["Aceptada", "ConObservacion", "Rechazada"] }
  ];

  const handleStatusSelect = (status) => {
    setSelectedStatus(status.label);
    onStatusSelect(status.filter);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#222222",
      paddingTop: 10,
      paddingBottom: 5,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    tabText: {
      fontSize: 14,
      color: "#cccccc",
    },
    selectedTab: {
      backgroundColor: Colors.BordeDorado,
    },
    selectedTabText: {
      color: "#000000",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      {statuses.map((status) => (
        <TouchableOpacity
          key={status.label}
          style={[
            styles.tab,
            selectedStatus === status.label && styles.selectedTab, // Aplicar estilos a la pestaña seleccionada
          ]}
          onPress={() => handleStatusSelect(status)}
        >
          <Text
            style={[
              styles.tabText,
              selectedStatus === status.label && styles.selectedTabText, // Cambiar estilo del texto para la pestaña seleccionada
            ]}
          >
            {status.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StatusTabs;
