import axios from 'axios';

const API_URL = axios.create({
  baseURL: 'http://10.0.2.2:8080',
});

export const AlarmesService = {
  getAlarmes: async (user_id) => {
    try {
      const response = await axios.get(`${API_URL}/alarmes/${user_id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      
      console.error('Erro ao buscar alarmes:', error);
      return [];
    }
  
  },
};