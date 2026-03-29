import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays, faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import useDynamicColors from "../../Styles/useDynamicColors";
import ThemedModal from "../../components/ThemedModal/ThemedModal";

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
      backgroundColor: Colors.modoOscuroActivo ? Colors.FondoCardOscuro : Colors.FondoCardClaro,
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
      backgroundColor: Colors.modoOscuroActivo ? Colors.FondoCardOscuro : Colors.FondoCardClaro,
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

      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="¿Confirmar Fecha?"
        buttons={[
          { text: "Cancelar", variant: "secondary", onPress: () => setModalVisible(false) },
          { text: "Aceptar", onPress: handleConfirmar },
        ]}
      >
        <View style={{ alignItems: 'center', marginBottom: 15 }}>
          <FontAwesomeIcon icon={faTriangleExclamation} size={40} color={Colors.Naranja} />
        </View>
        {selectedEventDay && (
          <Text style={{ fontSize: 15, color: Colors.Negro, textAlign: 'center', lineHeight: 22, marginBottom: 25 }}>
            Tu pedido estará disponible únicamente{" "}
            <Text style={{fontWeight: 'bold'}}>
            el {formatDateLabel(selectedEventDay.fechaHoraInicioDiaEvento)} 
            </Text> de {new Date(selectedEventDay.fechaHoraInicioDiaEvento).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} a {new Date(selectedEventDay.fechaHoraFinDiaEvento).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} hs.
          </Text>
        )}
      </ThemedModal>
    </View>
  );
};

export default PrecompraCard;
