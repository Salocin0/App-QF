import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useDynamicColors from "@/Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCube, faUserGroup, faStore } from "@fortawesome/free-solid-svg-icons";
import {
  useGetAsignacionesQuery,
  useAcceptAsignacionMutation,
  useRejectAsignacionMutation,
} from "@/components/App/Service/AsignacionesApi";
import { useFocusEffect } from "@react-navigation/native";
import logo from "../../assets/favicon.png";

// Cuánto tiempo se muestra la propuesta de asignación antes de ocultarse sola
// (independiente de que el backend la siga considerando "Pendiente"). Antes
// era 45s fijo, calcado del ASIGNACION_WINDOW_SECONDS del backend — muy
// ajustado para pruebas manuales, ya que casi siempre pasan más de 45s entre
// que el pedido pasa a En Camino y alguien llega a mirar el celular.
const ASIGNACION_WINDOW_SECONDS = 300;

const CardAsignacionPedido = () => {
  const dispatch = useDispatch();
  const progress = useRef(new Animated.Value(100)).current;
  const [visible, setVisible] = useState(true);
  const [hiddenAssignments, setHiddenAssignments] = useState([]);
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  
  // Fetch the data
  const { data, isLoading, error,refetch } = useGetAsignacionesQuery(userId, {
    pollingInterval: 1000,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  // Hooks for mutations
  const [acceptAsignacion] = useAcceptAsignacionMutation();
  const [rejectAsignacion] = useRejectAsignacionMutation();

  // Validate the `data` structure
  const assignment = data?.data && Object.keys(data?.data).length !== 0 ? data?.data : null;

  useEffect(() => {
    if (assignment) {
      if (hiddenAssignments.includes(assignment.id)) {
        setVisible(false);
        return;
      }
  
      // Reset progress to 100 when assignment changes
      progress.setValue(100);
  
      const updateProgress = () => {
        const elapsedTime =
          (Date.now() - new Date(assignment.createdAt).getTime()) / 1000;
        const remainingTime = ASIGNACION_WINDOW_SECONDS - elapsedTime;
        const newProgress = Math.max((remainingTime / ASIGNACION_WINDOW_SECONDS) * 100, 0);
  
        // Ensure the progress is between 0 and 100
        const clampedProgress = Math.min(newProgress, 100);
  
        Animated.timing(progress, {
          toValue: clampedProgress,
          duration: 1000,
          useNativeDriver: false,
        }).start();
  
        if (clampedProgress <= 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      };
  
      // Initial progress update
      updateProgress();
  
      // Set up interval to update progress every second
      const timer = setInterval(updateProgress, 1000);
  
      // Cleanup interval on component unmount or when assignment changes
      return () => clearInterval(timer);
    }
  }, [assignment, hiddenAssignments, progress]);
  
  const handleAccept = async () => {
    try {
      await acceptAsignacion(assignment.id).unwrap();
      setVisible(false);
      setHiddenAssignments((prev) => [...prev, assignment.id]);
    } catch (err) {
      console.error("Failed to accept assignment: ", err);
    }
  };

  const handleReject = async () => {
    try {
      await rejectAsignacion(assignment.id).unwrap();
      setVisible(false);
      setHiddenAssignments((prev) => [...prev, assignment.id]);
    } catch (err) {
      console.error("Failed to reject assignment: ", err);
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#1a1a1a",
      width: "90%",
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: Colors.BordeDorado,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 2,
      borderColor: Colors.BordeDorado,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: 8,
      backgroundColor: "#333333",
      resizeMode: "contain",
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    info: {
      marginLeft: 10,
    },
    id: {
      fontSize: 16,
      fontWeight: "bold",
      marginEnd: 8,
      color: "#ffffff",
    },
    label: {
      backgroundColor: Colors.BordeDorado,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 12,
      marginTop: 4,
      color: "#000000",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      color: "#ffffff",
    },
    subTitle: {
      fontSize: 14,
      color: "#cccccc",
      marginTop: 4,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    button: {
      flex: 1,
      backgroundColor: Colors.BordeDorado,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.BordeDorado,
    },
    buttonRechazar: {
      flex: 1,
      backgroundColor: "transparent",
      borderColor: Colors.BordeDorado,
      borderWidth: 2,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#000000",
      fontWeight: "bold",
    },
    buttonText2: {
      color: Colors.BordeDorado,
      fontWeight: "bold",
    },
    progressBar: {
      height: 10,
      backgroundColor: "#333333",
      borderRadius: 10,
      marginTop: 15,
    },
    progressFill: {
      backgroundColor: Colors.BordeDorado,
      borderRadius: 10,
      height: 10,
    },
    idContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
  });

  const imageSource = assignment?.Pedido?.puesto?.img
    ? { uri: assignment?.Pedido?.puesto?.img }
    : logo;

  // Si no hay datos o se está cargando, no renderizar nada
  if (!assignment || isLoading || Object.keys(data?.data)?.length === 0) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.info}>
              <View style={styles.idContainer}>
                <Text style={styles.id}>
                  <FontAwesomeIcon icon={faCube} color={Colors.BordeDorado} /> #
                  {assignment?.PedidoId ?? "1234"}
                </Text>
                <Text style={styles.label}>Nuevo Pedido</Text>
              </View>
              <Text style={styles.title}>
                <FontAwesomeIcon icon={faStore} color={Colors.BordeDorado} />{" "}
                {assignment?.Pedido?.puesto?.nombreCarro ?? "Puesto 1"}
              </Text>
              <Text style={styles.subTitle}>
                <FontAwesomeIcon icon={faUserGroup} color={Colors.BordeDorado} />{" "}
                {assignment?.Pedido?.consumidore?.nombre +
                  ", " +
                  assignment?.Pedido?.consumidore?.apellido ?? "Consumidor 1"}
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonRechazar}
              onPress={handleReject}
            >
              <Text style={styles.buttonText2}>Rechazar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAccept}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default CardAsignacionPedido;
