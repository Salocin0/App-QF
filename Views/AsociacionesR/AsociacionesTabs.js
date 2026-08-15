import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetAsociacionesQuery } from "@/components/App/Service/AsociacionesApi";
import { useSelector } from "react-redux";
import AsociacionCard from "./AsociacionCard";
import Aviso from "../Aviso";

const AsociacionesTabs = () => {
  const [activeTab, setActiveTab] = useState("Todas");
  const [refreshing, setRefreshing] = useState(false);
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const { data, isLoading, error, refetch } = useGetAsociacionesQuery(userId, {
    pollingInterval: 1000, // Recargar cada 1 segundo
  });

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, refetch]);

  const tabs = [
    { label: "Todas", estado: "Todos" },
    { label: "Pendientes", estado: "PendienteDeAceptacion" },
    { label: "Aceptadas", estado: "Aceptada" },
    { label: "Rechazadas", estado: ["Cancelada", "Rechazada"] },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 5,
      width: "100%",
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      margin: 0,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      marginHorizontal: 4,
      borderRadius: 8,
      backgroundColor: Colors.GrisClaro,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    tabButtonActive: {
      backgroundColor: Colors.Naranja,
      borderBottomWidth: 3,
      borderBottomColor: Colors.BordeDorado,
    },
    tabText: {
      fontSize: 13,
      color: Colors.GrisOscuro,
    },
    tabTextActive: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    contentContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: Colors.GrisClaro,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20, 
      overflow: "hidden", 
    },

    bottomPadding: {
      height: 25,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      margin: 0,
    },
  });

  const filterAsociaciones = (asociaciones, estado) => {
    if (estado === "Todos") {
      return asociaciones;
    }
    if (Array.isArray(estado)) {
      return asociaciones.filter((asociacion) =>
        estado.includes(asociacion.estado)
      );
    }
    return asociaciones.filter((asociacion) => asociacion.estado === estado);
  };

  const currentTab = tabs.find((tab) => tab.label === activeTab);
  const filteredAsociaciones = data
    ? filterAsociaciones(data.asociaciones, currentTab?.estado || "Todos")
    : [];

    if(!data && !isLoading && !error) return <Aviso>Error al cargar las Asociaciones</Aviso>;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs?.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[
              styles.tabButton,
              activeTab === tab.label && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.label && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView 
        style={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.BordeDorado]}
            tintColor={Colors.BordeDorado}
          />
        }
      >
        {isLoading && !refreshing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
        {error && <Aviso>Error al cargar las Asociaciones</Aviso>}
        {filteredAsociaciones?.map((asociacion) => {
          const evento = data.eventos.find(
            (evento) => evento.id === asociacion.eventoId
          );
          return (
            <AsociacionCard
              key={asociacion.id}
              asociacion={asociacion}
              evento={evento}
            />
          );
        })}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

export default AsociacionesTabs;
