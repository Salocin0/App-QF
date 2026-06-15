import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Aviso from "../Aviso";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://backendnode-qf.onrender.com";

const Notificaciones = () => {
  const stylesExternos = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotificaciones = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}notificaciones/mobile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ConsumidorId: user.consumidorId,
        },
      });
      const responseJson = await response.json();
      setNotificaciones(responseJson.notificaciones || []);
    } catch (err) {
      console.error("Error fetching notificaciones:", err);
      setError("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  }, [user.consumidorId]);

  useFocusEffect(
    useCallback(() => {
      fetchNotificaciones();
    }, [fetchNotificaciones])
  );

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await fetchNotificaciones();
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, fetchNotificaciones]);

  const marcarComoLeida = async (id) => {
    try {
      const response = await fetch(`${API_URL}notificaciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setNotificaciones((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, estado: "visto" } : n
          )
        );
      }
    } catch (err) {
      console.error("Error al marcar notificación como leída:", err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => marcarComoLeida(item.id)}
      style={[
        styles.card,
        item.estado === "pendiente" && styles.cardPendiente,
      ]}
    >
      <View style={styles.cardContent}>
        {item.estado === "pendiente" && <View style={styles.puntoNoLeido} />>}
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={styles.fecha}>
            {new Date(item.fecha).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors?.GrisClaro,
    },
    flatListContainer: {
      padding: 16,
      paddingBottom: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: Colors?.Blanco,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: Colors?.GrisClaroPeroNoTanClaro,
    },
    cardPendiente: {
      borderColor: Colors?.Naranja,
      borderWidth: 1.5,
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    puntoNoLeido: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors?.Naranja,
      marginRight: 10,
      marginTop: 6,
    },
    textContainer: {
      flex: 1,
    },
    titulo: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors?.Negro,
      marginBottom: 4,
    },
    descripcion: {
      fontSize: 14,
      color: Colors?.Gris,
      marginBottom: 6,
      lineHeight: 20,
    },
    fecha: {
      fontSize: 12,
      color: Colors?.Gris,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (error) {
    return <Aviso mensaje={error} />;
  }

  return (
    <View style={styles.container}>
      {notificaciones.length > 0 ? (
        <FlatList
          data={notificaciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors?.Naranja]}
              tintColor={Colors?.Naranja}
            />
          }
        />
      ) : (
        <Aviso mensaje="No hay notificaciones" />
      )}
    </View>
  );
};

export default Notificaciones;
