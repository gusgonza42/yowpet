import { useEffect, useState } from 'react';
import { axiosClient } from './clienteAxios';

export const useAxiosFetch = (
  servlet,
  refreshKey,
  enableAutoRefresh = false,
  intervalTime = 30000
) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Iniciando solicitud a:', servlet);
      setLoading(true);
      const response = await axiosClient.get(`/${servlet}`);

      // Asegurarse que response.data existe y es un array
      if (response && response.data) {
        const dataArray = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log('Datos obtenidos:', dataArray.length, 'elementos');
        setDatos(dataArray);
      } else {
        setDatos([]); // Si no hay datos, establecer array vacío
      }
    } catch (err) {
      console.error('Error al obtener los datos:', err.message);
      setError(err.message);
      setDatos([]); // En caso de error, establecer array vacío
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchData cuando cambia servlet o refreshKey
  useEffect(() => {
    fetchData();
  }, [servlet, refreshKey]);

  // Configurar intervalo solo si enableAutoRefresh es true
  useEffect(() => {
    if (enableAutoRefresh) {
      const interval = setInterval(fetchData, intervalTime);
      return () => clearInterval(interval);
    }
  }, [enableAutoRefresh, intervalTime]);

  return { datos, loading, error, refetch: fetchData };
};
