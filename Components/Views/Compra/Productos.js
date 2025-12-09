import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from "react-native";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import CardProducto from "./CardProducto";
import BuscadorProductos from "../BuscadorProductos";
import { useGetProductosQuery } from "../../App/Service/ProductosApi";
import { useRoute } from '@react-navigation/native';

const Productos = ({ navigation }) => {
  const Colors = useDynamicColors();
  const route = useRoute();
  const params = route.params || {};
  const eventoId = params.evento?.id || params.eventoId || params.id;
  const { data: productosData, isLoading, error, refetch, isFetching } = useGetProductosQuery(eventoId);

  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");
  const [selectedOrder, setSelectedOrder] = useState("ASC");
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(999999);
  const [isReloading, setIsReloading] = useState(false);
  const lastReload = useRef(0);

  useEffect(() => {
    if (productosData) setProductos(productosData);
  }, [productosData]);

  const style = {
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: Colors?.GrisClaro,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors?.GrisClaro,
      paddingTop: 20,
      paddingHorizontal: 20,
    }
  };

  const parseNum = useCallback((v, fallback = 0) => {
    if (v === null || typeof v === 'undefined') return fallback;
    const str = String(v).replace(',', '.');
    const n = parseFloat(str);
    return Number.isFinite(n) ? n : fallback;
  }, []);

  const filtered = useMemo(() => {
    if (!Array.isArray(productos)) return [];
    return productos.filter((p) => {
      if (!p) return false;
      if (searchQuery) {
        const s = searchQuery.toLowerCase();
        const name = String(p?.nombre ?? "").toLowerCase();
        const desc = String(p?.descripcion ?? "").toLowerCase();
        const priceStr = String(p?.precio ?? "").toLowerCase();
        if (!name.includes(s) && !desc.includes(s) && !priceStr.includes(s)) return false;
      }
      const pMin = parseNum(precioMin, 0);
      const pMax = parseNum(precioMax, 999999);
      const precio = parseNum(p?.precio, 0);
      if (precio < pMin) return false;
      if (precio > pMax) return false;
      return true;
    });
  }, [productos, searchQuery, precioMin, precioMax, parseNum]);

  const sortedAndFiltered = useMemo(() => {
    const arr = Array.isArray(filtered) ? [...filtered] : [];
    arr.sort((a, b) => {
      try {
        if (selectedCategoria === 'porNombre') {
          const na = String(a?.nombre ?? '').toLowerCase();
          const nb = String(b?.nombre ?? '').toLowerCase();
          return na.localeCompare(nb) * (selectedOrder === 'ASC' ? 1 : -1);
        }
        if (selectedCategoria === 'porPrecio') {
          const pa = parseNum(a?.precio, 0);
          const pb = parseNum(b?.precio, 0);
          return (pa - pb) * (selectedOrder === 'ASC' ? 1 : -1);
        }
        return 0;
      } catch (e) {
        return 0;
      }
    });
    return arr;
  }, [filtered, selectedCategoria, selectedOrder, parseNum]);

  const handleSearch = useCallback((text) => setSearchQuery(text || ""), []);
  const handleOrder = useCallback((order) => { if (order) setSelectedOrder(order); }, []);
  const handleAdvancedFilter = useCallback((payload = {}) => {
    const { categoria, selectedOrder: orderFromModal, precioMin: pMin, precioMax: pMax } = payload;
    if (categoria) setSelectedCategoria(categoria);
    if (orderFromModal) setSelectedOrder(orderFromModal);
    if (typeof pMin !== 'undefined') setPrecioMin(Number(pMin) || 0);
    if (typeof pMax !== 'undefined') setPrecioMax(Number(pMax) || 999999);
  }, []);

  const handleRefresh = useCallback(async () => {
    const now = Date.now();
    if (isReloading || isFetching) return;
    if (now - lastReload.current < 5000) return;
    if (typeof refetch !== 'function') return;
    lastReload.current = now;
    setIsReloading(true);
    try {
      await refetch();
    } catch (e) {
      console.error('Productos: error refetch', e);
    } finally {
      setIsReloading(false);
    }
  }, [isReloading, isFetching, refetch]);

  const renderItem = ({ item }) => (
    <CardProducto item={item} navigation={navigation} />
  );

  const Header = useMemo(() => (
    <BuscadorProductos onSearch={handleSearch} onFilter={handleAdvancedFilter} onOrder={handleOrder} />
  ), [handleSearch, handleAdvancedFilter, handleOrder]);

  // If we're in any fetching/reloading state, show a full-screen centered spinner
  if (isReloading || isFetching || (isLoading && !isReloading)) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.container}>
        <Text style={{ color: Colors.Negro }}>{error?.message || 'Error al cargar productos'}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedAndFiltered}
      contentContainerStyle={style.container}
      ListHeaderComponent={Header}
      renderItem={renderItem}
      keyExtractor={(item) => String(item?.id ?? Math.random())}
      ListFooterComponent={null}
      refreshControl={<RefreshControl refreshing={isReloading || isFetching} onRefresh={handleRefresh} colors={[Colors?.Azul]} tintColor={Colors?.Azul} progressBackgroundColor={Colors?.Blanco} />}
    />
  );
};

export default Productos;
