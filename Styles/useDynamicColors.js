import { useSelector } from "react-redux";

const useDynamicColors = () => {
  const modoOscuroActivo = useSelector(
    (state) => state.modoOscuro.modoOscuroActivo
  );

  const Colors = {
    modoOscuroActivo,
    Naranja: modoOscuroActivo ? "#c5a145" : "#FAB607", // Ajustado a web en dark
    Rojo: modoOscuroActivo ? "#ff5733" : "#E24E2A", // Ajustado a web en dark
    GrisClaro: modoOscuroActivo ? "#2F2F2F" : "#F7F7FF",
    GrisOscuro: modoOscuroActivo ? "#A4A8AA" : "#2F2F2F",
    BlancoEnBlanco: modoOscuroActivo ? "#ffffff" : "#ffffff",
    Blanco: modoOscuroActivo ? "#000000" : "#ffffff",
    Negro: modoOscuroActivo ? "#ffffff" : "#000000",
    Gris: modoOscuroActivo ? "#616161" : "#9d9d9d",
    GrisClaroPeroNoTanClaro: modoOscuroActivo ? "#333333" : "#cccccc",

    Azul: modoOscuroActivo ? "#0085fa" : "#028AFF",
    Rosa:modoOscuroActivo ? "#BE185D" : `#EC4899`,
    Purpura:modoOscuroActivo ? "#7E22CE" : `#A855F7`,
    NaranjaDetalle: modoOscuroActivo ? "#ff6d05" : "#F76500",
    NaranjaOscuro: modoOscuroActivo ? "#af6e0e" : "#f0ad4e",
    Verde: modoOscuroActivo ? "#45a145" : "#5cb85c",
    Info: modoOscuroActivo ? "#c5a145" : "#17a2b8", // Cambiado a dorado/naranja en oscuro para cards de eventos
    BordeDorado: "#c5a145", // Color Naranja de la web usado para bordes
  };

  const Styles = {
    card: {
      backgroundColor: Colors.Blanco,
      borderRadius: 10,
      marginVertical: 5,
      padding: 10,
      shadowColor: Colors.Negro,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      borderWidth: modoOscuroActivo ? 1 : 0,
      borderColor: modoOscuroActivo ? Colors.BordeDorado : "transparent",
    }
  };

  return { ...Colors, Styles };
};

export default useDynamicColors;
