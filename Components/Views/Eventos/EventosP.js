import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useGetAllEventosQuery } from "../../App/Service/EventosApi";
import EventoCard from "./eventoCard";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import BuscadorEventos from "../BuscadorEventos";

const EventosP = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;

  const { data: eventosData, isLoading, isError, error, refetch, isFetching } = useGetAllEventosQuery(userId, { skip: !userId });
  const [eventos, setEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const lastReload = useRef(0);
  const [selectedCategoria, setSelectedCategoria] = useState("porDistancia");
  const [selectedOrder, setSelectedOrder] = useState("ASC");
  const [distMin, setDistMin] = useState(0);
  const [distMax, setDistMax] = useState(99999);
  const [daysMin, setDaysMin] = useState(0);
  const [daysMax, setDaysMax] = useState(99999);

  useEffect(() => {
    console.log("EventosP: userId=", userId, "isLoading=", isLoading, "isError=", isError);
    if (isError) console.error("EventosP: error from hook=", error);
    if (eventosData) {
      console.log("EventosP: eventosData received=", eventosData);
      setEventos(eventosData);
    }
  }, [eventosData]);

  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: Colors.GrisClaro,
    },
  });
  const getEventDate = (ev) => {
    const candidates = [ev?.fecha, ev?.fechaInicio, ev?.fechaEvento, ev?.date];
    for (const c of candidates) {
      if (!c) continue;
      const d = new Date(c);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  };

  const filtered = Array.isArray(eventos)
    ? eventos.filter((ev) => {
        if (!ev) return false;
        if (searchQuery) {
          const s = searchQuery.toLowerCase();
          const matchName = String(ev?.nombre ?? "").toLowerCase().includes(s);
          const matchDesc = String(ev?.descripcion ?? "").toLowerCase().includes(s);
          if (!matchName && !matchDesc) return false;
        }
        const parseNum = (v, fallback) => {
          if (v === null || typeof v === 'undefined') return fallback;
          const str = String(v).replace(',', '.');
          const n = parseFloat(str);
          return Number.isFinite(n) ? n : fallback;
        };

        // distance filter
        const dMin = parseNum(distMin, 0);
        const dMax = parseNum(distMax, 99999);
        const distVal = parseNum(ev?.distancia ?? ev?.distance ?? ev?.dist ?? 0, 0);
        if (distVal < dMin) return false;
        if (distVal > dMax) return false;

        // days to start filter
        const evDate = getEventDate(ev);
        const now = new Date();
        let daysToStart = 0;
        if (evDate) {
          const diff = evDate.getTime() - now.getTime();
          daysToStart = Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
        const ddMin = parseNum(daysMin, 0);
        const ddMax = parseNum(daysMax, 99999);
        if (daysToStart < ddMin) return false;
        if (daysToStart > ddMax) return false;

        return true;
      })
    : [];

  

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
        // default porDistancia
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

  const handleAdvancedFilter = useCallback((payload = {}) => {
    const { categoria, selectedOrder: orderFromModal, distMin: dMin, distMax: dMax, daysMin: dyMin, daysMax: dyMax } = payload;
    if (categoria) setSelectedCategoria(categoria);
    if (orderFromModal) setSelectedOrder(orderFromModal);
    if (typeof dMin !== 'undefined') setDistMin(Number(dMin) || 0);
    if (typeof dMax !== 'undefined') setDistMax(Number(dMax) || 99999);
    if (typeof dyMin !== 'undefined') setDaysMin(Number(dyMin) || 0);
    if (typeof dyMax !== 'undefined') setDaysMax(Number(dyMax) || 99999);
  }, []);

  const handleOrder = useCallback((order) => {
    if (order) setSelectedOrder(order);
  }, []);

  const handleEndReached = useCallback(async () => {
    const now = Date.now();
    if (isReloading || isFetching) return;
    // cooldown: 5s
    if (now - lastReload.current < 5000) return;
    if (typeof refetch !== "function") return;
    lastReload.current = now;
    setIsReloading(true);
    try {
      await refetch();
    } catch (e) {
      console.error("EventosP: error refetch", e);
    } finally {
      setIsReloading(false);
    }
  }, [isReloading, isFetching, refetch]);
  const Header = useMemo(() => (
    <BuscadorEventos onSearch={handleSearch} onFilter={handleAdvancedFilter} onOrder={handleOrder} />
  ), [handleSearch, handleAdvancedFilter, handleOrder]);

  if (isLoading && !isReloading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color={Colors?.Naranja} />
      </View>
    );
  }

  if (isError || !eventosData) {
    console.error("EventosP: rendering error state - isError=", isError, "eventosData=", eventosData);
    const serverMsg = error?.data?.msg || error?.message || "Sin Eventos Disponibles";
    return (
      <View style={style.container}>
        <Text style={{ color: Colors.Negro }}>{serverMsg}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedAndFiltered}
      contentContainerStyle={style.container}
      renderItem={({ item, index }) => <EventoCard key={index} evento={item} />}
      keyExtractor={(item, index) => String(item?.id ?? index)}
      ListHeaderComponent={Header}
      ListFooterComponent={isFetching ? <ActivityIndicator size="small" color={Colors?.Naranja} /> : null}
      refreshControl={<RefreshControl refreshing={isReloading || isFetching} onRefresh={async () => { setIsReloading(true); try { await refetch(); } catch(e){ console.error(e);} setIsReloading(false); }} colors={[Colors?.Naranja]} tintColor={Colors?.Naranja} />}
    />
  );
};

export default EventosP;
