import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CardEvento from './CardEvento';

const Inicio = () => {
    const eventosActivos = [
        { id: 1, titulo: 'Evento 1', descripcion: 'Descripción del Evento 1' },
        { id: 2, titulo: 'Evento 2', descripcion: 'Descripción del Evento 2' },
        { id: 3, titulo: 'Evento 3', descripcion: 'Descripción del Evento 3' },
    ];

    const renderEvento = ({ item }) => (
        <CardEvento titulo={item.titulo} descripcion={item.descripcion} />
    );

    return (
        <View style={styles.container}>
            <Text>Inicio</Text>
            <FlatList
                data={eventosActivos}
                renderItem={renderEvento}
                keyExtractor={(item) => item?.id?.toString()}
            />
        </View>
    );
};

export default Inicio;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});