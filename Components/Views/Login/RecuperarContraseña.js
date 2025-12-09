import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useStyles from "../../Styles/useStyles";
import useDynamicColors from "../../Styles/useDynamicColors";
import { useRecuperarContraseniaMutation } from "../../App/Service/authApi";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecuperarContraseña = () => {
  const styles = useStyles();
  const Colors = useDynamicColors();
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [recuperarContraseña] = useRecuperarContraseniaMutation();

  const handleRecuperarContraseña = () => {
    const result = recuperarContraseña(email);
    if (result) {
      ToastAndroid.show("Email enviado", ToastAndroid.SHORT);
      navigation.navigate("Login");
    } else {
      ToastAndroid.show("Error al enviar el Email", ToastAndroid.SHORT);
    }
  };

  const handleTengoUnCodigo = () => {
    navigation.navigate("TengoCodigo");
  };

  return (
    <ImageBackground source={require("../../../assets/QuickFoodCortado.png")} style={styles.backgroundImage}>
      <View style={styles.containerCard}>
        <View style={[styles.card, { borderWidth: 1, borderColor: Colors.Gris }]}> 
          <View style={styles.cardheader}>
            <Text style={styles.title}>Enviar codigo al Email</Text>
          </View>
          <View style={[styles.cardBody, { alignItems: 'stretch' }]}> 
            <View style={styles.inputContainerAlternativa}>
              <Text style={[styles.label, { alignSelf: 'flex-start', marginLeft: 4, marginBottom: 6 } ]}>Email</Text>
              <TextInput
                style={[styles.inputAlternativo, { width: '100%', paddingVertical: 12, fontSize: 15, color: Colors.Negro }]}
                placeholder="Correo Electrónico"
                placeholderTextColor={Colors.Gris}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>
          <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <TouchableOpacity onPress={() => handleTengoUnCodigo()} style={{ flex: 1, backgroundColor: Colors.Verde, padding: 12, borderRadius: 6, marginRight: 6 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Tengo un codigo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 6 }]} onPress={() => handleRecuperarContraseña()}>
              <Text style={{ color: '#fff', textAlign: 'center', padding: 12 }}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RecuperarContraseña;

const styles = StyleSheet.create({});
