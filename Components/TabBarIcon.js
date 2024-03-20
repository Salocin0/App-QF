import { StyleSheet, Text, View } from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { Colors } from './Styles/Colors'

const TabBarIcon = ({title,nameIcon,focused}) => {
  return (
    <View style={styles.container}>
      <Entypo name={nameIcon} size={25} color={focused ? Colors.Azul:Colors.Gris}/>  
      <Text style={[styles.text,!focused && styles.textFocused]} >{title}</Text>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({

    container:{
        alignItems: 'center'
    },
    text:{
        textAlign:"center",
        fontSize:12,
        color: Colors.Azul,
        //fontFamily: fonts.Spartan,
    },
    textFocused:{
        color:Colors.Gris,
        //fontFamily: fonts.Spartan,
    }

})