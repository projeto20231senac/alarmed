import axios from 'axios';

// let baseURL;

// if (Platform.OS === 'android') {
//   baseURL = 'http://10.0.2.2:5000';
// } else {
//   baseURL = 'http://localhost:5000';
// }

const API_URL = axios.create({
  baseURL: 'http://10.0.2.2:5000',
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