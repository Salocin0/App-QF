import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";

const Tabs = ({ onTabSelect }) => {
  const [selectedTab, setSelectedTab] = useState("Todos"); // Almacenamos la etiqueta seleccionada
  const Colors = useDynamicColors();

  const tabs = [
    { label: "Todos", filter: "Todos" },
    { label: "Pendientes", filter: ["Pendiente", "Aceptados"] },
    { label: "Preparando", filter: ["EnPreparacion", "EnCamino"] },
    { label: "Finalizados", filter: ["Cancelado", "Entregado"] }
  ];

  const handleTabSelect = (tab) => {
    setSelectedTab(tab.label); 
    onTabSelect(tab.filter);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: Colors.GrisClaro,
      paddingVertical: 10,
      borderRadius: 10,
      margin: 10,
    },
    tab: {
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    tabText: {
      fontSize: 18,
      color: Colors.GrisOscuro,
    },
    selectedTab: {
      backgroundColor: Colors.Blanco,
      elevation: 2,
    },
    selectedTabText: {
      color: Colors.Negro,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={[
            styles.tab,
            selectedTab === tab.label && styles.selectedTab, // Comparamos con la etiqueta de la pestaña
          ]}
          onPress={() => handleTabSelect(tab)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.label && styles.selectedTabText, // Comparamos con la etiqueta de la pestaña
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
