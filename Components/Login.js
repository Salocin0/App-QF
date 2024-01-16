import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

export default Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/inicio");
  };

  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Presionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#3498db',
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });