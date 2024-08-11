import React, { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCube, faUserGroup, faStore } from "@fortawesome/free-solid-svg-icons";
import {
  useGetAsignacionesQuery,
  useAcceptAsignacionMutation,
  useRejectAsignacionMutation,
} from "@/components/App/Service/AsignacionesApi";

import logo from "../../assets/favicon.png";

const CardAsignacionPedido = () => {
  const dispatch = useDispatch();
  const [progress] = useState(new Animated.Value(100));
  const [visible, setVisible] = useState(true);
  const [hiddenAssignments, setHiddenAssignments] = useState([]);
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const userId = user?.consumidorId;
  const { data, isLoading, error } = useGetAsignacionesQuery(userId, {
    pollingInterval: 5000,
  });

  // Hooks for mutations
  const [acceptAsignacion] = useAcceptAsignacionMutation();
  const [rejectAsignacion] = useRejectAsignacionMutation();

  // Extract the assignment data
  const assignment = data?.data;

  useEffect(() => {
    if (assignment) {
      if (hiddenAssignments.includes(assignment.id)) {
        setVisible(false);
        return;
      }
      const updateProgress = () => {
        const elapsedTime =
          (Date.now() - new Date(assignment.createdAt).getTime()) / 1000;
        const remainingTime = 45 - elapsedTime;
        const newProgress = Math.max((remainingTime / 45) * 100, 0);

        Animated.timing(progress, {
          toValue: newProgress,
          duration: 1000,
          useNativeDriver: false,
        }).start();

        if (newProgress <= 0) {
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
  }, [assignment, hiddenAssignments]); // Depend on `assignment` and `hiddenAssignments`

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

  if (!visible || isLoading) return null;
  if (error) return <Text>Error: {error.message}</Text>;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: Colors.Blanco,
      width: "90%",
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: 8,
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      resizeMode: "contain", // To ensure the image fits within the bounds
    },
    info: {
      marginLeft: 10,
    },
    id: {
      fontSize: 16,
      fontWeight: "bold",
      marginEnd: 8,
      color: Colors.Negro,
    },
    label: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 12,
      marginTop: 4,
      color: Colors.Negro,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      color: Colors.Negro,
    },
    subTitle: {
      fontSize: 14,
      color: Colors.Negro,
      marginTop: 4,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    button: {
      flex: 1,
      backgroundColor: Colors.Azul,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
    },
    buttonRechazar: {
      flex: 1,
      backgroundColor: Colors.Blanco,
      borderColor: Colors.Negro,
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
    },
    buttonText: {
      color: Colors.Blanco,
      fontWeight: "bold",
    },
    buttonText2: {
      color: Colors.Negro,
      fontWeight: "bold",
    },
    progressBar: {
      height: 10,
      backgroundColor: Colors.Negro,
      borderRadius: 10,
      marginTop: 15,
    },
    idContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  });
  const imageSource = assignment?.Pedido?.puesto?.img ? { uri: assignment.Pedido.puesto.img } : logo;

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
                  <FontAwesomeIcon icon={faCube} color={Colors.Negro} /> #
                  {assignment?.PedidoId ?? "1234"}
                </Text>
                <Text style={styles.label}>Nuevo Pedido</Text>
              </View>
              <Text style={styles.title}>
                <FontAwesomeIcon icon={faStore} color={Colors.Negro} />{" "}
                {assignment?.Pedido?.puesto?.nombreCarro ?? "Puesto 1"}
              </Text>
              <Text style={styles.subTitle}>
                <FontAwesomeIcon icon={faUserGroup} color={Colors.Negro} />{" "}
                {assignment?.Pedido?.consumidore?.nombre +
                  ", " +
                  assignment?.Pedido?.consumidore?.apellido ??
                  "Consumidor 1"}
              </Text>
            </View>
          </View>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
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
