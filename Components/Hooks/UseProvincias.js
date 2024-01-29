import { useEffect, useState } from 'react';

const useProvincias = () => {
  const [provincias, setProvincias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
        if (!response.ok) {
          throw new Error('Error al cargar las provincias');
        }
        const data = await response.json();
        setProvincias(data.provincias);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProvincias();

  }, []); 

  return { provincias, loading, error };
};

export default useProvincias;
