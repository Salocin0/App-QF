import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import logoBot from './../../assets/bot-img.png';
import useDynamicColors from '@/Styles/useDynamicColors';

const FloatingButton = () => {
  const Colors = useDynamicColors();
  const navigation = useNavigation(); // Get navigation object

  const navigateToChatbot = () => {
    navigation.navigate('Chatbot'); // Navigate to Chatbot screen
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 30,
      right: 20,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 80,
      height: 80,
      paddingHorizontal: 10,
      borderRadius: 50,
      backgroundColor: Colors.Rosa,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: Colors.Blanco,
    },
    botImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToChatbot}>
        <Image source={logoBot} style={styles.botImage} />
      </TouchableOpacity>
    </View>
  );
};



export default FloatingButton;
