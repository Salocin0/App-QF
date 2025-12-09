import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faStore, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "../../Styles/useDynamicColors";
import StarsBar from "./StarsBar";
import { useGetProductosQuery } from "../../App/Service/ProductosApi";
import { useCreateValoracionMutation } from "../../App/Service/ValoracionApi";

const CustomButton = ({ title, onPress, color, style }) => (
  <TouchableOpacity style={[{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, backgroundColor: color }, style]} onPress={onPress}>
    <Text style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}>{title}</Text>
  </TouchableOpacity>
);

const DetallePedido = ({ route, navigation }) => {
  const Colors = useDynamicColors();
  const { pedido } = route.params;
  const formatStatus = (raw) => {
    if (!raw && raw !== 0) return "";
    let s = String(raw);
    s = s.replace(/[_-]+/g, " ");
    s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
    s = s.replace(/\s+/g, " ").trim();
    return s;
  };

  const estadoColor = (raw) => {
    const s = formatStatus(raw).toLowerCase();
    if (s.includes("cancel")) return Colors.Rojo || "#e74c3c";
    if (s.includes("entreg") || s.includes("complet") || s.includes("finaliz")) return Colors.Verde || "#2ecc71";
    if (s.includes("curso") || s.includes("en curso") || s.includes("proceso") || s.includes("en camino")) return Colors.Naranja || "#f39c12";
    if (s.includes("pendient") || s.includes("pendiente")) return Colors.GrisClaroPeroNoTanClaro || "#95a5a6";
    return Colors.Gris || "#bdc3c7";
  };
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error, refetch, isFetching } = useGetProductosQuery(pedido.puestoId);
  const [refreshing, setRefreshing] = useState(false);
  const [ratingPuntualidad, setRatingPuntualidad] = useState(1);
  const [ratingEficiencia, setRatingEficiencia] = useState(1);
  const [ratingCalidad, setRatingCalidad] = useState(1);
  const [ratingTiempo, setRatingTiempo] = useState(1);
  const [CreateValoracionMutation] = useCreateValoracionMutation();
  

  const handleRatingPuntualidadChange = (value) => {
    setRatingPuntualidad(value);
  };

  const handleRatingEficienciaChange = (value) => {
    setRatingEficiencia(value);
  };

  const handleRatingCalidadChange = (value) => {
    setRatingCalidad(value);
  };

  const handleRatingTiempoChange = (value) => {
    setRatingTiempo(value);
  };

  const handleSubmitValoracion = async () => {
    const valoracion = {
      puntualidad: ratingPuntualidad,
      eficiencia: ratingEficiencia,
      calidad: ratingCalidad,
      tiempo: ratingTiempo,
    };
  
    setModalVisible(false);
    console.log(valoracion, pedido.id);
  
    try {
      await CreateValoracionMutation({valoracion, idPuesto:pedido?.id}).unwrap();
      console.log('Valoración creada exitosamente');
    } catch (error) {
      console.error('Error al crear la valoración:', error);
    }
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.GrisClaro,
    },
    card: {
      flex: 1,
      padding: 18,
      backgroundColor: Colors.GrisClaro,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 8,
      color: Colors.Negro,
    },
    section: {
      backgroundColor: Colors.Blanco,
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 6,
      color: Colors.Negro,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
      borderBottomWidth: 0,
    },
    itemText: {
      fontSize: 15,
      color: Colors.Negro,
    },
    smallText: {
      fontSize: 13,
      color: Colors.GrisOscuro,
    },
    divider: {
      height: 1,
      backgroundColor: Colors.Gris,
      marginVertical: 10,
    },
    footer: {
      paddingTop: 10,
      marginTop: 6,
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    modalView: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical:15,
      alignItems: "center",
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
      color: Colors.Negro,
    },
    buttonStyle: {
      borderRadius: 10,
      marginTop: 10,
    },
  });
  // Determine if the order can be rated: delivered/completed/finalized and not already rated
  const canValorar = () => {
    try {
      const s = (formatStatus(pedido?.estado) || '').toLowerCase();
      const allowed = s.includes('entreg') || s.includes('complet') || s.includes('finaliz');
      if (!allowed) return false;
      // If the pedido object has a flag indicating already rated, hide the button
      if (pedido?.valorado === true || pedido?.valorado === 'true') return false;
      return true;
    } catch (e) {
      return false;
    }
  };
  // If productos for this pedido are being fetched, show centered spinner
  if (isFetching) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.GrisClaro, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors?.Azul} />
      </View>
    );
  }

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 0 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); try { await refetch(); } catch(e){ console.error(e);} setRefreshing(false); }} />}>
      <View style={styles.card}>
        <Text style={styles.title}>Pedido #{pedido?.id}</Text>

        <View style={{ width: '100%', marginBottom: 10 }}>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <FontAwesomeIcon icon={faUser} color={Colors.Negro} />
              <Text style={styles.sectionTitle}>Repartidor</Text>
            </View>
            <Text style={styles.itemText}>
              {pedido?.repartidor?.nombre ?? pedido?.repartidor?.name ?? pedido?.repartidor?.fullName ?? pedido?.repartidorNombre ?? pedido?.repartidorId ?? 'Sin asignar'}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <FontAwesomeIcon icon={faStore} color={Colors.Negro} />
              <Text style={styles.sectionTitle}>Puesto</Text>
            </View>
            <Text style={styles.itemText}>{pedido?.puesto?.nombreCarro ?? 'Sin puesto'}</Text>
          </View>

          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <FontAwesomeIcon icon={faInfoCircle} color={Colors.Negro} />
              <Text style={styles.sectionTitle}>Estado</Text>
            </View>
            <View style={{ marginTop: 6 }}>
              <View style={{ backgroundColor: estadoColor(pedido?.estado), borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8 }}>
                <Text style={{ color: Colors.Blanco }}>{String(pedido?.estado ?? '').replace(/[_-]+/g,' ').replace(/([a-z])([A-Z])/g,'$1 $2')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>

          {pedido?.detalles && pedido?.detalles.length > 0 ? (
            pedido.detalles.map((detalle, index) => {
              const productos = Array.isArray(data) ? data : (data?.data ?? []);
              const producto = productos.find((p) => Number(p.id) === Number(detalle.productoId) || Number(p.id) === Number(detalle.id));
              const nombre = producto?.nombre ?? detalle?.nombre ?? `Producto ${detalle?.productoId ?? index+1}`;
              const precio = detalle?.precio ?? producto?.precio ?? 0;
              const subtotal = (Number(precio) * Number(detalle?.cantidad || 0)).toFixed(2);

              return (
                <View key={index} style={styles.row}>
                  <View style={{flex:1}}>
                    <Text style={styles.itemText}>{nombre}</Text>
                    <Text style={styles.smallText}>{detalle?.cantidad} x ${precio}</Text>
                  </View>
                  <Text style={styles.itemText}>${subtotal}</Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.smallText}>No hay productos en este pedido</Text>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Total</Text>
            <Text style={styles.itemText}>${pedido?.total ?? '0.00'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.buttonsRow}>
            <CustomButton title="Valorar Pedido" onPress={() => setModalVisible(true)} color={Colors.Azul} style={{flex:1}} />
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Repartidor</Text>
            <StarsBar pregunta="Puntualidad" rating={ratingPuntualidad} onRatingChange={handleRatingPuntualidadChange}/>
            <StarsBar pregunta="Eficiencia en la entrega" rating={ratingEficiencia} onRatingChange={handleRatingEficienciaChange} />
            <Text style={styles.modalTitle}>Puesto</Text>
            <StarsBar pregunta="Calidad del productos" rating={ratingCalidad} onRatingChange={handleRatingCalidadChange} />
            <StarsBar pregunta="Tiempo de preparación" rating={ratingTiempo} onRatingChange={handleRatingTiempoChange} />
            <CustomButton title="Enviar Valoracion" onPress={() => handleSubmitValoracion()} style={styles.buttonStyle} color={Colors.Azul} />
            <CustomButton title="Cerrar" onPress={() => setModalVisible(false)} style={styles.buttonStyle} color={Colors.Rojo} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetallePedido;
