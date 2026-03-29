import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import CardProducto from "./CardProducto";
import BuscadorProductos from "../BuscadorProductos";
import { useGetProductosQuery } from "./../../components/App/Service/ProductosApi";
import { useRoute } from "@react-navigation/native";

const Productos = ({ navigation }) => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const { evento, precompra, fecha, puesto } = route.params;
  const { data, isLoading, error, refetch } = useGetProductosQuery(puesto.id);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Actualiza filteredData cuando data esté disponible
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch, refreshing]);

  const handleSearch = (searchText) => {
    const filtered = data?.filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (categoria) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (categoria === "porNombre") {
        return a.nombre.localeCompare(b.nombre);
      } else if (categoria === "porPrecio") {
        return a.precio - b.precio;
      }
      return 0;
    });
    setFilteredData(sorted);
  };

  const styles = StyleSheet.create({
    avisoContainer: {
      padding: 10,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 2,
      borderRadius: 8,
    },
    avisoText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const renderItem = ({ item }) => (
    <CardProducto
      item={item}
      navigation={navigation}
      precompra={precompra}
      fecha={fecha}
      evento={evento}
      puesto={puesto}
    />
  );

  // Renderizado basado en el estado de carga, error, y datos
  return (
    <View style={{ backgroundColor: Colors?.GrisClaro, flex: 1 }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors?.Naranja} />
        </View>
      ) : error ? (
        <Aviso mensaje={error.message || "Error al cargar productos"} />
      ) : !data || filteredData.length === 0 ? (
        <Aviso mensaje="No hay productos disponibles" />
      ) : (
        <>
          <BuscadorProductos onSearch={handleSearch} onSort={handleSort} />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 75 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors?.Naranja]}
                tintColor={Colors?.Naranja}
              />
            }
          />
        </>
      )}
    </View>
  );
};

export default Productos;
