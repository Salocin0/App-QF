import { useSelector } from "react-redux";

const useDynamicColors = () => {
  const modoOscuroActivo = useSelector(
    (state) => state.modoOscuro.modoOscuroActivo
  );

  const Colors = {
    modoOscuroActivo,
    // Colores FIXOS (no cambian con tema)
    NegroFijo: "#000000",
    BlancoFijo: "#ffffff",
    BordeDorado: "#c5a145", // Color Naranja de la web usado para bordes
    // Colores que dependen del modo - FONDO (para backgrounds)
    Blanco: modoOscuroActivo ? "#1a1a1a" : "#ffffff", // Fondo: oscuro en modo oscuro, blanco en modo claro
    Negro: modoOscuroActivo ? "#ffffff" : "#000000", // Texto: blanco en modo oscuro, negro en modo claro
    GrisClaro: modoOscuroActivo ? "#2F2F2F" : "#F7F7FF",
    GrisOscuro: modoOscuroActivo ? "#A4A8AA" : "#2F2F2F",
    BlancoEnBlanco: "#ffffff",
    Gris: modoOscuroActivo ? "#616161" : "#9d9d9d",
    GrisClaroPeroNoTanClaro: modoOscuroActivo ? "#333333" : "#cccccc",
    // Colores que dependen del modo - ACCENT
    Naranja: modoOscuroActivo ? "#c5a145" : "#FAB607",
    Rojo: modoOscuroActivo ? "#ff5733" : "#E24E2A",
    Azul: modoOscuroActivo ? "#0085fa" : "#028AFF",
    Rosa: modoOscuroActivo ? "#BE185D" : `#EC4899`,
    Purpura: modoOscuroActivo ? "#7E22CE" : `#A855F7`,
    NaranjaDetalle: modoOscuroActivo ? "#ff6d05" : "#F76500",
    NaranjaOscuro: modoOscuroActivo ? "#af6e0e" : "#f0ad4e",
    Verde: modoOscuroActivo ? "#45a145" : "#5cb85c",
    Info: modoOscuroActivo ? "#c5a145" : "#17a2b8",
    Celeste: modoOscuroActivo ? "#64b5f6" : "#00BCD4",
    // Colores de fondo para componentes
    CardBackground: modoOscuroActivo ? "#222222" : "#ffffff",
    TabBackground: modoOscuroActivo ? "#181818" : "#f2f2f2",
    HeaderBackground: modoOscuroActivo ? "#181818" : "#ffffff",
    // Colores de cards específicos para modo oscuro
    FondoCardOscuro: "#3a2e10",
    FondoCardClaro: "#fff9e6",
    TextoSobreFondoOscuro: "#ffffff",
    TextoSobreFondoClaro: "#000000",
    FondoInputOscuro: "#1a1a1a",
    FondoInputClaro: "#fafafa",
  };

  const Styles = {
    card: {
      backgroundColor: Colors.CardBackground,
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
