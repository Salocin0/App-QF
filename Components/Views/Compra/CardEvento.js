import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardEvento = ({ titulo, descripcion }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
        </View>
    );
};

export default CardEvento;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    descripcion: {
        fontSize: 16,
    },
});
