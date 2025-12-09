import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl } from "react-native";
import { REACT_APP_BACK_URL } from "@env";
import CardEvento from "./CardEvento";
import Aviso from "../Aviso";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorEventos from "../BuscadorEventos";
import { useGetEventosQuery } from "../../App/Service/EventosApi";

const Inicio = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const { data, error, isLoading, refetch, isFetching } = useGetEventosQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const lastReload = useRef(0);
  const [selectedCategoria, setSelectedCategoria] = useState("porDistancia");
  const [selectedOrder, setSelectedOrder] = useState("ASC");

  useEffect(() => {
    console.log("Inicio: eventos hook -> isLoading:", isLoading, "error:", error, "data:", data);
    console.log("Inicio: REACT_APP_BACK_URL:", REACT_APP_BACK_URL);
    try {
      const fullUrl = `${REACT_APP_BACK_URL}evento/enEstado/EnCurso/`;
      console.log("Inicio: full request URL for eventos:", fullUrl);
    } catch (e) {
      console.debug("Inicio: error building fullUrl", e?.message || e);
    }
  }, [isLoading, error, data]);

  const renderItem = ({ item }) => (
    <CardEvento item={item} navigation={navigation} />
  );

  const filtered = Array.isArray(data)
    ? data.filter((ev) => {
        if (!searchQuery) return true;
        const s = searchQuery.toLowerCase();
        return (
          String(ev?.nombre ?? "").toLowerCase().includes(s) ||
          String(ev?.descripcion ?? "").toLowerCase().includes(s)
        );
      })
    : [];

  const getEventDate = (ev) => {
    const candidates = [ev?.fecha, ev?.fechaInicio, ev?.fechaEvento, ev?.date];
    for (const c of candidates) {
      if (!c) continue;
      const d = new Date(c);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  };

  const sortedAndFiltered = useMemo(() => {
    const arr = Array.isArray(filtered) ? [...filtered] : [];
    const cmp = (a, b) => {
      try {
        if (selectedCategoria === "porNombre") {
          const na = String(a?.nombre ?? "").toLowerCase();
          const nb = String(b?.nombre ?? "").toLowerCase();
          return na.localeCompare(nb) * (selectedOrder === "ASC" ? 1 : -1);
        }
        if (selectedCategoria === "porFecha") {
          const da = getEventDate(a);
          const db = getEventDate(b);
          if (!da && !db) return 0;
          if (!da) return 1;
          if (!db) return -1;
          return (da.getTime() - db.getTime()) * (selectedOrder === "ASC" ? 1 : -1);
        }
        const daNum = Number(a?.distancia ?? a?.distance ?? 0);
        const dbNum = Number(b?.distancia ?? b?.distance ?? 0);
        return (daNum - dbNum) * (selectedOrder === "ASC" ? 1 : -1);
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
  }, []);
  const handleOrder = useCallback((order) => { if (order) setSelectedOrder(order); }, []);

  const handleEndReached = useCallback(async () => {
    const now = Date.now();
    if (isReloading || isFetching) return;
    if (now - lastReload.current < 5000) return;
    if (typeof refetch !== "function") return;
    lastReload.current = now;
    setIsReloading(true);
    try {
      await refetch();
    } catch (e) {
      console.error("Error al recargar eventos:", e);
    } finally {
      setIsReloading(false);
    }
  }, [isReloading, isFetching, refetch]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {isLoading && !isReloading ? (
        <ActivityIndicator size="large" color={Colors?.Azul} />
      ) : error ? (
        <Aviso mensaje={error?.data?.msg || error?.message || "Error al cargar eventos"} />
      ) : isReloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors?.Azul} />
        </View>
      ) : (
        <>
          <BuscadorEventos onSearch={handleSearch} onFilter={handleFilter} onOrder={handleOrder} />
          {filtered.length === 0 ? (
            <View style={{ padding: 20 }}>
              <Text style={{ color: Colors.Negro }}>Sin Eventos Disponibles</Text>
            </View>
          ) : (
            <FlatList
              data={sortedAndFiltered}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styleslocal.flatListContainer}
              refreshControl={
                <RefreshControl refreshing={isReloading} onRefresh={async () => {
                  setIsReloading(true);
                  try { await refetch(); } catch(e){ console.error(e); }
                  setIsReloading(false);
                }} colors={[Colors?.Azul]} />
              }
              ListFooterComponent={isFetching ? <ActivityIndicator size="small" color={Colors?.Azul} /> : null}
            />
          )}
        </>
      )}
    </View>
  );
};

const styleslocal = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
});

export default Inicio;
