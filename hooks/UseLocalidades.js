import { useEffect, useState } from 'react';

const useLocalidades = () => {
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocalidades = async (provincia) => {
    setLoading(true);
    try {
      if (!provincia) {
        setLocalidades([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&campos=id,nombre&max=700`);
      if (!response.ok) {
        throw new Error('Error al cargar las localidades');
      }
      const data = await response.json();
      const sortedLocalidades = data.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setLocalidades(sortedLocalidades);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { localidades, loading, error, fetchLocalidades, setLocalidades };
};

export default useLocalidades;
