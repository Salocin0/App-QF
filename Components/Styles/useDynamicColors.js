import { useSelector } from "react-redux";

const useDynamicColors = () => {
  const modoOscuroActivo = useSelector(
    (state) => state.modoOscuro.modoOscuroActivo
  );

  const Colors = {
    GrisClaro: modoOscuroActivo ? "#1a1919" : "#F7F7FF",
    GrisClaroPeroNoTanClaro: modoOscuroActivo ? "#333333" : "#cccccc",
    Azul: modoOscuroActivo ? "#0085fa" : "#028AFF",
    Celeste: modoOscuroActivo ? "#2599fe" : "#0275d8",
    Naranja: modoOscuroActivo ? "#FFA500" : "#FFD700",
    NaranjaOscuro: modoOscuroActivo ? "#af6e0e" : "#f0ad4e",
    NaranjaDetalle: modoOscuroActivo ? "#ff6d05" : "#F76500",
    Verde: modoOscuroActivo ? "#45a145" : "#5cb85c",
    Rojo: modoOscuroActivo ? "#ad2925" : "#d9534f",
    Gris: modoOscuroActivo ? "#616161" : "#9d9d9d",
    Blanco: modoOscuroActivo ? "#000000" : "#fff",
    Negro: modoOscuroActivo ? "#ffffff" : "#000",
    Info: modoOscuroActivo ? "#45d0e8" : "#17a2b8",
    GrisOscuro: modoOscuroActivo ? "#7a7a7a" : "#838383",
  };

  // Semantic color for text placed on primary / colored buttons.
  // In light mode primary buttons have white text; in dark mode we map to Colors.Negro (which is white in dark mode).
  Colors.OnPrimary = modoOscuroActivo ? Colors.Negro : Colors.Blanco;

  return Colors;
};

export default useDynamicColors;
