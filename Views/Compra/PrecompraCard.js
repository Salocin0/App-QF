import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useDynamicColors from "@/Styles/useDynamicColors";

const PrecompraCard = ({ setfecha, nextNavigate, evento }) => {
  const Colors = useDynamicColors();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEventDay, setSelectedEventDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setfecha(selectedDate);

    // Busca el día de evento correspondiente a la fecha seleccionada
    const eventDay = evento.diaEventos.find(dia => 
      new Date(dia.fechaHoraInicioDiaEvento).getTime() === new Date(selectedDate).getTime()
    );
    setSelectedEventDay(eventDay);
  }, [selectedDate]);

  const handleConfirmar = () => {
    setModalVisible(false);
    nextNavigate();
  };

  const { height } = Dimensions.get("window");

  // Get current date and time
  const now = new Date();

  // Function to format date to DD/MM/YY HH:MM
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("es-ES", options).replace(",", "");
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.Gris,
      borderRadius: 8,
      padding: 20,
      backgroundColor: Colors.Blanco,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      margin: 20,
      height: height * 0.55,
    },
    header: {
      alignItems: "center",
      marginBottom: 15,
    },
    icon: {
      marginBottom: 10,
      color: Colors.Negro,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: Colors.Negro,
      textAlign: "center",
    },
    scrollContainer: {
      flex: 1,
    },
    datesContainer: {
      flexDirection: "row",
      flexWrap: "wrap", // This allows the buttons to wrap to the next line
      justifyContent: "space-between", // Adjust spacing between buttons
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    dateButton: {
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 8,
      padding: 10,
      width: "30%", // Set width to 30% to allow for three buttons per row
      alignItems: "center",
      backgroundColor: Colors.GrisClaro,
      marginBottom: 10, // Add margin to create space between rows
    },
    disabledDateButton: {
      backgroundColor: Colors.Gris,
    },
    currentDateButton: {
      backgroundColor: Colors.Naranja, // Different color for current date
    },
    dateText: {
      color: Colors.Negro,
    },
    selectedDateText: {
      color: Colors.Blanco,
      
    },
    selectedDateButton: {
      backgroundColor: Colors.Gris,
      
    },
    selectedText: {
      textAlign: "center",
      fontSize: 16,
      color: Colors.Negro,
      marginVertical: 10,
    },
    confirmButton: {
      backgroundColor: Colors.Naranja,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    confirmButtonText: {
      color: Colors.Negro,
      fontSize: 16,
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: Colors.Blanco,
      borderRadius: 8,
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalMessage: {
      fontSize: 16,
      color: Colors.Negro,
      textAlign: "center",
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButtonCancel: {
      backgroundColor: Colors.Blanco,
      borderColor: Colors.Negro,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginRight: 10,
    },
    modalButtonTextCancel: {
      color: Colors.Negro,
      fontSize: 16,
    },
    modalButtonAccept: {
      backgroundColor: Colors.Negro,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    modalButtonTextAccept: {
      color: Colors.Blanco,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name="calendar-outline" size={30} style={styles.icon} />
        <Text style={styles.title}>Precompra</Text>
        <Text style={styles.subtitle}>
          Programa tus compras para este evento
        </Text>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.datesContainer}>
          {evento.diaEventos.map((dia, index) => {
            const fechaInicio = new Date(dia.fechaHoraInicioDiaEvento);
            const isPast = now > new Date(dia.fechaHoraFinDiaEvento);
            const isCurrent = now >= fechaInicio && now <= new Date(dia.fechaHoraFinDiaEvento);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  isPast && styles.disabledDateButton,
                  isCurrent && styles.currentDateButton,
                  selectedDate === dia.fechaHoraInicioDiaEvento && styles.selectedDateButton,
                ]}
                onPress={() => {
                  if (!isPast && !isCurrent) setSelectedDate(dia.fechaHoraInicioDiaEvento);
                }}
                disabled={isPast}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === dia.fechaHoraInicioDiaEvento && styles.selectedDateText,
                  ]}
                >
                  {new Date(dia.fechaHoraInicioDiaEvento).toLocaleDateString("es-ES")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Advertencia</Text>
            {selectedEventDay && (
              <Text style={styles.modalMessage}>
                Está por realizar una compra programada. Asegúrese de poder
                asistir al evento el día correspondiente. La compra programada va
                a estar disponible desde {formatDate(selectedEventDay.fechaHoraInicioDiaEvento)} hasta {formatDate(selectedEventDay.fechaHoraFinDiaEvento)}.
              </Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonAccept}
                onPress={handleConfirmar}
              >
                <Text style={styles.modalButtonTextAccept}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PrecompraCard;
