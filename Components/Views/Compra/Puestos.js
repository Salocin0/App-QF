import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from "react-native";
import CardPuesto from "./CardPuesto";
import Aviso from "../Aviso";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorPuestos from "./../BuscadorPuestos";
import { useGetPuestosPorEventoQuery } from "../../App/Service/PuestosApi";
import { useRoute } from '@react-navigation/native';

const Puestos = ({ navigation }) => {
  const route = useRoute();
  const Colors = useDynamicColors();
  const { evento } = route.params;
  const { data: puestosData, error, isLoading, refetch, isFetching, isError } = useGetPuestosPorEventoQuery(evento.id);

  const [puestos, setPuestos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const lastReload = useRef(0);
  const [selectedCategoria, setSelectedCategoria] = useState("porNombre");
  const [selectedOrder, setSelectedOrder] = useState("ASC");
  const [estrellasMin, setEstrellasMin] = useState(0);
  const [estrellasMax, setEstrellasMax] = useState(5);
  const [tiempoMin, setTiempoMin] = useState(0);
  const [tiempoMax, setTiempoMax] = useState(9999);

  useEffect(() => {
    if (isError) console.error("Puestos: error from hook=", error);
    if (puestosData) setPuestos(puestosData);
  }, [puestosData, isError]);

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
    }
  };

  const filtered = Array.isArray(puestos)
    ? puestos.filter((p) => {
        if (!p) return false;
        // search by nombreCarro or tipoNegocio
        if (searchQuery) {
          const s = searchQuery.toLowerCase();
          const matchName = String(p?.nombreCarro ?? "").toLowerCase().includes(s);
          const matchTipo = String(p?.tipoNegocio ?? "").toLowerCase().includes(s);
          if (!matchName && !matchTipo) return false;
        }
        // parse numeric filter bounds robustly (accept commas and strings)
        const parseNum = (v, fallback) => {
          if (v === null || typeof v === 'undefined') return fallback;
          const str = String(v).replace(',', '.');
          const n = parseFloat(str);
          return Number.isFinite(n) ? n : fallback;
        };

        const eMin = parseNum(estrellasMin, 0);
        const eMax = parseNum(estrellasMax, 9999);
        const est = parseNum(p?.estrellas ?? p?.valoracion ?? 0, 0);
        if (est < eMin) return false;
        if (est > eMax) return false;

        // tiempo filter (time in minutes)
        const tMin = parseNum(tiempoMin, 0);
        const tMax = parseNum(tiempoMax, 9999);
        const timeVal = parseNum(p?.time ?? p?.tiempo ?? p?.tiempoEntrega ?? 0, 0);
        if (timeVal < tMin) return false;
        if (timeVal > tMax) return false;

        return true;
      })
    : [];

  const sortedAndFiltered = useMemo(() => {
    const arr = Array.isArray(filtered) ? [...filtered] : [];
    const cmp = (a, b) => {
      try {
            if (selectedCategoria === "porNombre") {
              const na = String(a?.nombreCarro ?? a?.nombre ?? "").toLowerCase();
              const nb = String(b?.nombreCarro ?? b?.nombre ?? "").toLowerCase();
          return na.localeCompare(nb) * (selectedOrder === "ASC" ? 1 : -1);
        }
            if (selectedCategoria === "TiempoEntrega") {
              const ta = Number(a?.time ?? a?.tiempoEntrega ?? a?.tiempo ?? 0);
              const tb = Number(b?.time ?? b?.tiempoEntrega ?? b?.tiempo ?? 0);
          return (ta - tb) * (selectedOrder === "ASC" ? 1 : -1);
        }
            if (selectedCategoria === "Estrellas") {
              const ea = Number(a?.estrellas ?? a?.valoracion ?? 0);
              const eb = Number(b?.estrellas ?? b?.valoracion ?? 0);
          return (ea - eb) * (selectedOrder === "ASC" ? 1 : -1);
        }
        return 0;
      } catch (e) {
        return 0;
      }
    };
    arr.sort(cmp);
    return arr;
  }, [filtered, selectedCategoria, selectedOrder]);

  const handleSearch = useCallback((text) => setSearchQuery(text || ""), []);

  const handleFilter = useCallback(({ categoria, selectedOrder: orderFromModal } = {}) => {
    if (categoria) setSelectedCategoria(categoria);
    if (orderFromModal) setSelectedOrder(orderFromModal);
    // accept optional numeric filters
    if (typeof categoria === 'undefined' && typeof orderFromModal === 'undefined') return;
    return null;
  }, []);

  const handleOrder = useCallback((order) => { if (order) setSelectedOrder(order); }, []);

  // enhanced filter handler from BuscadorPuestos: may include estrellasMin/max and tiempoMin/max
  const handleAdvancedFilter = useCallback((payload = {}) => {
    const { categoria, selectedOrder: orderFromModal, estrellasMin: em, estrellasMax: eM, tiempoMin: tMin, tiempoMax: tMax } = payload;
    if (categoria) setSelectedCategoria(categoria);
    if (orderFromModal) setSelectedOrder(orderFromModal);
    if (typeof em !== 'undefined') setEstrellasMin(Number(em) || 0);
    if (typeof eM !== 'undefined') setEstrellasMax(Number(eM) || 5);
    if (typeof tMin !== 'undefined') setTiempoMin(Number(tMin) || 0);
    if (typeof tMax !== 'undefined') setTiempoMax(Number(tMax) || 9999);
  }, []);

  const Header = useMemo(() => (
    <BuscadorPuestos onSearch={handleSearch} onFilter={handleAdvancedFilter} onOrder={handleOrder} />
  ), [handleSearch, handleAdvancedFilter, handleOrder]);

  const handleRefresh = useCallback(async () => {
    const now = Date.now();
    if (isReloading || isFetching) return;
    if (now - lastReload.current < 5000) return; // cooldown 5s
    if (typeof refetch !== "function") return;
    lastReload.current = now;
    setIsReloading(true);
    try {
      await refetch();
    } catch (e) {
      console.error("Puestos: error refetch", e);
    } finally {
      setIsReloading(false);
    }
  }, [isReloading, isFetching, refetch]);

  const renderItem = ({ item }) => (
    <CardPuesto item={item} navigation={navigation} />
  );

  if (isLoading && !isReloading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  // If a fetch or a reload is in progress, hide the list and show a centered spinner
  if (isReloading || isFetching) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={style.container}>
        <Aviso mensaje={error?.message || "Error al cargar puestos"} />
      </View>
    );
  }

  if (!Array.isArray(puestos) || puestos.length === 0) {
    return (
      <View style={style.container}>
        <BuscadorPuestos onSearch={handleSearch} onFilter={handleAdvancedFilter} onOrder={handleOrder} />
        <Aviso mensaje="No hay puestos disponibles" />
      </View>
    );
  }

  return (
    <FlatList
      data={sortedAndFiltered}
      contentContainerStyle={style.container}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(item?.id ?? index)}
      ListHeaderComponent={Header}
      ListFooterComponent={isFetching ? <ActivityIndicator size="small" color={Colors?.Azul} /> : null}
      refreshControl={<RefreshControl refreshing={isReloading || isFetching} onRefresh={handleRefresh} colors={[Colors?.Azul]} tintColor={Colors?.Azul} progressBackgroundColor={Colors?.Blanco} />}
    />
  );
};

export default Puestos;
