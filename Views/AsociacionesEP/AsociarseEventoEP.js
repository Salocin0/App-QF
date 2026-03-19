import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useGetEventosSinAsociacionValidaPuestoQuery } from "@/components/App/Service/EventosApi";
import { useGetPuestosAsociacionValidaQuery } from "@/components/App/Service/PuestosApi";
import CardEventoAsociar from "./CardEventoAsociar";
import BuscadorEventos from "../BuscadorEventos";
import Aviso from "../Aviso";
import { useSelector } from "react-redux";
import imgevento from "./../../assets/eventoimg.jpeg";
import logoevento from "./../../assets/logoevento.webp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const AsociarseEventoEP = ({ navigation }) => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const user = useSelector((state) => state.auth);
  const [selectedPuestoId, setSelectedPuestoId] = useState(null);

  const {
    data: dataPuestos,
    error: errorPuestos,
    isLoading: isLoadingPuestos,
  } = useGetPuestosAsociacionValidaQuery({
    estado: "EnPreparacion",
    idConsumidor: user?.consumidorId,
  });
  const {
    data: dataEventos,
    error: errorEventos,
    isLoading: isLoadingEventos,
  } = useGetEventosSinAsociacionValidaPuestoQuery({
    estado: "EnPreparacion",
    idConsumidor: user?.consumidorId,
    idPuesto: selectedPuestoId,
  });

  const renderPuestoItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.Blanco,
        borderRadius: 10,
        shadowColor: Colors.Negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        height: 170,
        marginVertical: 5,
        marginHorizontal: 20,
        borderColor: Colors?.GrisClaroPeroNoTanClaro,
        borderWidth: 2,
      }}
      onPress={() => setSelectedPuestoId(item.id)}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={imgevento}
          style={{
            width: "100%",
            height: "40%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1, padding: 10, marginTop: 70 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            source={logoevento}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              justifyContent: "center",
              display: "flex",
              textAlign: "center",
              alignContent: "center",
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
                color: Colors.Negro,
                textAlign: "center",
              }}
            >
              {item.nombreCarro}
            </Text>
            <Text
              style={{ fontSize: 16, color: Colors.Negro, textAlign: "center" }}
            >
              {item.tipoNegocio}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventoItem = ({ item }) => (
    <CardEventoAsociar
      item={item}
      navigation={navigation}
      selectedPuestoId={selectedPuestoId}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors?.GrisClaro }}>
      {selectedPuestoId === null ? (
        isLoadingPuestos ? (
          <ActivityIndicator size="large" color={Colors?.Azul} />
        ) : errorPuestos ? (
          <Aviso mensaje={errorPuestos.message || "Error al cargar puestos"} />
        ) : dataPuestos.length > 0 ? (
          <>
            <Text
              style={[
                styles.title,
                { alignSelf: "center", marginVertical: 10 },
              ]}
            >
              Puestos
            </Text>
            <FlatList
              data={dataPuestos}
              renderItem={renderPuestoItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styleslocal.flatListContainer}
            />
          </>
        ) : (
          <Aviso mensaje="No hay puestos disponibles" />
        )
      ) : (
        <>
          {isLoadingEventos ? (
            <ActivityIndicator size="large" color={Colors?.Azul} />
          ) : errorEventos ? (
            <Aviso
              mensaje={errorEventos.message || "Error al cargar eventos"}
            />
          ) : dataEventos.length > 0 ? (
            <>
              <BuscadorEventos />
              <FlatList
                data={dataEventos}
                renderItem={renderEventoItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styleslocal.flatListContainer}
              />
            </>
          ) : (
            <Aviso mensaje="No hay nuevos eventos disponibles" />
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
  card: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: "black",
  },
});

export default AsociarseEventoEP;
