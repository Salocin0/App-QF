import { color } from "react-native-elements/dist/helpers";
import useDynamicColors from "./useDynamicColors";

const useStyles = () => {
  const Colors = useDynamicColors();

  const styles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: Colors?.GrisClaro,
    },
    containerCard: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    card: {
      width: "85%",
      backgroundColor: Colors.Blanco,
      padding: 15,
      borderRadius: 10,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      color: Colors.Negro,
    },
    text:{
      color: Colors.Negro,
      fontWeight: "normal",
    },
    input: {
      borderColor: Colors.Gris,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 3,
      color: Colors.Negro,
    },
    label: {
      color: Colors.Negro,
      fontWeight: "normal",
    },
    button: {
      backgroundColor: Colors.Azul,
      borderRadius: 5,
      marginHorizontal: 10,
      alignSelf: "flex-end",
      width: "33%",
    },
    buttonForm: {
      backgroundColor: Colors.Azul,
      borderRadius: 5,
      padding: 10,
      alignSelf: "flex-end",
      color: "white",
    },
    buttonEndForm: {
      backgroundColor: Colors.Verde,
      borderRadius: 5,
      padding: 10,
      alignSelf: "flex-end",
      color: "white",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    link: {
      color: Colors.Celeste,
    },
    ViewButtom: {
      width: "100%",
    },
    cardheader: {
      marginBottom: 10,
      alignSelf: "center",
    },
    cardBody: {
      alignItems: "center",
      width: "100%",
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.Blanco,
      width: "100%",
      marginVertical: 2,
    },
    buttonGroup: {
      alignItems: "center",
      width: "100%",
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    clearButton: {
      backgroundColor: Colors.GrisClaroPeroNoTanClaro,
      padding: 10,
      borderRadius: 5,
    },
    nextButton: {
      backgroundColor: Colors.Azul,
      padding: 10,
      borderRadius: 5,
    },
    disabledButton: {
      backgroundColor: Colors.Gris,
    },
    btnSelect: {
      marginVertical: 5,
      backgroundColor: Colors.NaranjaOscuro,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      borderRadius: 5,
    },
    btnActive: {
      marginVertical: 5,
      backgroundColor: Colors.Naranja,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      borderRadius: 5,
    },
    textinput: {
      borderColor: Colors.Gris,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
      color: Colors.Negro,
      fontWeight: "normal",
      width: "100%",
    },
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    toggleButton: {
      marginLeft: -25,
      marginBottom: 5,
    },
  };

  return styles;
};

export default useStyles;
