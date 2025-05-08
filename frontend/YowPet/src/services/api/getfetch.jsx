import { useState, useEffect } from 'react';
import { axiosClient } from './clienteAxios';
//import { axiosClient } from '@/services/axiosClient';

export const useAxiosFetch = (servlet, refreshKey, intervalTime = 30000) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Iniciando solicitud a:', servlet);

      const response = await axiosClient.get(`/${servlet}`);
      // console.warn(response)
      if (response) {
        console.log('Datos obtenidos: Perfectamente');
        setDatos(response);
      } else {
        throw new Error('Formato de respuesta inesperado');
      }
    } catch (err) {
      console.error('Error al obtener los datos:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // On mount and when servlet or refreshKey changes
  }, [servlet, refreshKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Fetching data periodically...');
      fetchData();
    }, intervalTime);

    return () => clearInterval(interval); // Clean up
  }, [intervalTime]);

  return { datos, loading, error };
};
