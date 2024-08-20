import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetAsociacionesPuestosQuery } from '@/components/App/Service/AsociacionesApi';
import { useSelector } from 'react-redux';
import AsociacionCard from './AsociacionCard';
import Aviso from '../Aviso';

const AsociacionesTabs = () => {
  const [activeTab, setActiveTab] = useState('Todos');
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const { data, isLoading, error, refetch } = useGetAsociacionesPuestosQuery(userId);
  const tabs = ['Todos', 'PendienteDeAceptacion', 'Aceptada', 'Cancelada', 'Rechazada'];

  useEffect(() => {
    refetch();
  }, [activeTab]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filterAsociaciones = (asociaciones, estado) => {
    if (estado === 'Todos') {
      return asociaciones;
    }
    return asociaciones.filter(asociacion => asociacion.estado === estado);
  };

  const filteredAsociaciones = data ? filterAsociaciones(data.asociaciones, activeTab) : [];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && {
                backgroundColor: Colors?.Blanco,
                borderWidth: 1,
                borderColor: Colors?.GrisClaroPeroNoTanClaro,
                borderBottomWidth: 0
              }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { fontWeight: "bold", backgroundColor: Colors?.GrisClaro }
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors?.Azul} />
        ) : error ? (
          <Aviso mensaje={error.message || "Error al cargar asociaciones"} />
        ) : filteredAsociaciones.length > 0 ? (
          filteredAsociaciones.map(asociacion => {
            const evento = data.eventos.find(evento => evento.id === asociacion.eventoId);
            return <AsociacionCard key={asociacion.id} asociacion={asociacion} evento={evento} />;
          })
        ) : (
          <Aviso mensaje="No hay asociaciones disponibles" />
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    width: "100%",
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 13,
    color: Colors?.Negro,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors?.Blanco,
    borderWidth: 1,
    borderColor: Colors?.GrisClaroPeroNoTanClaro,
  },
  bottomPadding: {
    height: 25,
  },
});

export default AsociacionesTabs;
