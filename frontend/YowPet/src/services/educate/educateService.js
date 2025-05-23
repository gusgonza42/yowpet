import { axiosClient } from '../api/clienteAxios';

export const educateService = {
  getAllLessons: () =>
    axiosClient
      .get('/lesson/all')
      .then(response => response.data)
      .catch(error => {
       console.warn('Error fetching lessons:', error);
        throw error;
      }),
};
