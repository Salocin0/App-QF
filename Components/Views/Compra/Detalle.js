import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDynamicColors from '../../Styles/useDynamicColors'
import useStyles from '../../Styles/useStyles'

const Detalle = () => {
  const styles = useStyles()
  const Colors = useDynamicColors();
  return (
    <View style={[styles.container]}>
      <Text style={{color:Colors.Negro}}>Datos del producto</Text>
    </View>
  )
}

export default Detalle

const styles = StyleSheet.create({})