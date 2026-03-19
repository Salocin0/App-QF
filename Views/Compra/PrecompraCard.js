import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays, faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "../../Styles/useDynamicColors";

const PrecompraCard = ({ setfecha, nextNavigate, evento }) => {
  const Colors = useDynamicColors();
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventDay, setSelectedEventDay] = useState(null);
  
  const now = new Date();

  useEffect(() => {
    if (selectedDate) {
      setfecha(selectedDate);
      const eventDay = evento.diaEventos.find(dia => 
        dia.fechaHoraInicioDiaEvento === selectedDate
      );
      setSelectedEventDay(eventDay);
    }
  }, [selectedDate]);

  const handleConfirmar = () => {
    setModalVisible(false);
    nextNavigate();
  };

  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).toUpperCase();
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-AR", options).replace(",", "");
  };

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : Colors.GrisClaroPeroNoTanClaro,
      borderRadius: 25,
      padding: 25,
      backgroundColor: Colors.Blanco,
      marginHorizontal: 15,
      marginTop: 20,
      minHeight: 380,
      ...Colors.Styles.card,
    },
    header: {
      alignItems: "center",
      marginBottom: 20,
    },
    iconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: Colors.modoOscuroActivo ? "#3a2e10" : "#fff9e6",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : "transparent",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 15,
      color: Colors.Gris,
      textAlign: "center",
      marginBottom: 10,
    },
    scrollWrapper: {
      maxHeight: 180,
    },
    datesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingBottom: 10,
    },
    dateButton: {
      width: '48%',
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
      backgroundColor: Colors.GrisClaro,
      borderRadius: 15,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    selectedDateButton: {
      borderColor: Colors.Naranja,
      backgroundColor: Colors.modoOscuroActivo ? "#3a2e10" : "#fff9e6",
      borderWidth: 2,
    },
    disabledDateButton: {
      opacity: 0.4,
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
    },
    dateText: {
      fontSize: 13,
      fontWeight: "bold",
      color: Colors.Negro,
    },
    selectedDateText: {
      color: Colors.Naranja,
    },
    footer: {
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: Colors.GrisClaroPeroNoTanClaro,
      paddingTop: 15,
    },
    confirmButton: {
      backgroundColor: Colors.Naranja,
      borderRadius: 15,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    disabledButton: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      opacity: 0.6,
    },
    confirmText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
    },
    // Modal Styles
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
      width: "85%",
      backgroundColor: Colors.Blanco,
      borderRadius: 25,
      padding: 25,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.modoOscuroActivo ? Colors.BordeDorado : "transparent",
    },
    modalIcon: {
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.Negro,
      marginBottom: 15,
    },
    modalMessage: {
      fontSize: 15,
      color: Colors.Negro,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 25,
    },
    modalButtons: {
      flexDirection: "row",
      width: "100%",
      gap: 10,
    },
    modalBtn: {
      flex: 1,
      padding: 15,
      borderRadius: 12,
      alignItems: "center",
    },
    modalBtnCancel: {
      backgroundColor: Colors.GrisClaro,
      borderWidth: 1,
      borderColor: Colors.GrisClaroPeroNoTanClaro,
    },
    modalBtnAccept: {
      backgroundColor: Colors.Naranja,
    },
    modalBtnText: {
      fontWeight: "bold",
      fontSize: 15,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faCalendarDays} size={35} color={Colors.Naranja} />
        </View>
        <Text style={styles.title}>Precompra</Text>
        <Text style={styles.subtitle}>Retirá tu pedido el día que elijas.</Text>
      </View>

      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.datesContainer} showsVerticalScrollIndicator={false}>
          {evento.diaEventos.map((dia, index) => {
            const isPast = now > new Date(dia.fechaHoraFinDiaEvento);
            const isSelected = selectedDate === dia.fechaHoraInicioDiaEvento;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton, 
                  isSelected && styles.selectedDateButton,
                  isPast && styles.disabledDateButton
                ]}
                onPress={() => !isPast && setSelectedDate(dia.fechaHoraInicioDiaEvento)}
                disabled={isPast}
              >
                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                  {formatDateLabel(dia.fechaHoraInicioDiaEvento)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, !selectedDate && styles.disabledButton]} 
          onPress={() => setModalVisible(true)}
          disabled={!selectedDate}
        >
          <FontAwesomeIcon icon={faCheckCircle} color="white" size={20} />
          <Text style={styles.confirmText}>Confirmar día</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <FontAwesomeIcon icon={faTriangleExclamation} size={40} color={Colors.Naranja} />
            </View>
            <Text style={styles.modalTitle}>¿Confirmar Fecha?</Text>
            {selectedEventDay && (
              <Text style={styles.modalMessage}>
                Tu pedido estará disponible únicamente{" "}
                <Text style={{fontWeight: 'bold'}}>
                el {formatDateLabel(selectedEventDay.fechaHoraInicioDiaEvento)} 
                </Text> de {new Date(selectedEventDay.fechaHoraInicioDiaEvento).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} a {new Date(selectedEventDay.fechaHoraFinDiaEvento).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} hs.
              </Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnCancel]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalBtnText, {color: Colors.Negro}]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnAccept]} onPress={handleConfirmar}>
                <Text style={[styles.modalBtnText, {color: 'white'}]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PrecompraCard;
