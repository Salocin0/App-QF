import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import useDynamicColors from "@/Styles/useDynamicColors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCube,
  faUserGroup,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const CardAsignacionPedido = ({
  idPedido,
  imagenPuesto,
  nombrePuesto,
  nombreConsumidor,
  fechaCreacion,
}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(new Animated.Value(100));
  const [visible, setVisible] = useState(true);
  const Colors = useDynamicColors();

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime =
        (Date.now() - new Date(fechaCreacion).getTime()) / 1000;
      const remainingTime = 45 - elapsedTime;
      const newProgress = Math.max((remainingTime / 45) * 100, 0);
      Animated.timing(progress, {
        toValue: newProgress,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      if (newProgress <= 0) {
        setVisible(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaCreacion, progress]);

  const handleAccept = () => {
    //dispatch(acceptAssignment(idPedido));
  };

  const handleReject = () => {
    //dispatch(rejectAssignment(idPedido));
  };

  if (!visible) return null;
  const styles = StyleSheet.create({
    card: {
      backgroundColor: Colors.Blanco,
      width: "100%",
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
    },
    info: {
      marginLeft: 10,
    },
    id: {
      fontSize: 16,
      fontWeight: "bold",
      marginEnd:8,
      color:Colors.Negro
    },
    label: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 12,
      marginTop: 4,
      color:Colors.Negro
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      color:Colors.Negro
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
      color: Colors.Negro,
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
  });
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: imagenPuesto }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.idContainer}>
            <Text style={styles.id}>
              <FontAwesomeIcon icon={faCube} color={Colors.Negro} /> #{idPedido ?? "1234"}
            </Text>
            <Text style={styles.label}>Nuevo Pedido</Text>
          </View>
          <Text style={styles.title}>
            <FontAwesomeIcon icon={faStore} color={Colors.Negro} /> {nombrePuesto ?? "Puesto 1"}
          </Text>
          <Text style={styles.subTitle}>
            <FontAwesomeIcon icon={faUserGroup} color={Colors.Negro}/>{" "}
            {nombreConsumidor ?? "Consumidor 1"}
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
        <TouchableOpacity style={styles.buttonRechazar} onPress={handleReject}>
          <Text style={styles.buttonText2}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardAsignacionPedido;
