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
      flexWrap: "nowrap", // NO wrap, siempre en una fila
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.TabBackground,
      paddingVertical: 10,
      borderRadius: 14,
      margin: 12,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
      gap: 8,
      overflow: "hidden",
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginHorizontal: 4,
      marginVertical: 4,
      minWidth: 60,
      maxWidth: 120,
      flexShrink: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.TabBackground,
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    tabText: {
      fontSize: 13, // Más chico para que nunca pase a dos líneas
      color: Colors.BordeDorado,
      fontWeight: "600",
      letterSpacing: 0.5,
      flexShrink: 1,
      textAlign: "center",
      includeFontPadding: false,
      // numberOfLines y adjustsFontSizeToFit no son props de StyleSheet, van en el componente Text
      minWidth: 0,
      maxWidth: 120,
    },
    selectedTab: {
      backgroundColor: Colors.BordeDorado,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
      elevation: 3,
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
              selectedTab === tab.label && styles.selectedTabText,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
            allowFontScaling={true}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
