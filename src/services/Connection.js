import AsyncStorage from '@react-native-async-storage/async-storage';

const { default: axios } = require('axios');

export const loginRequest = (req) => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/login.php?codigo=${req.username}&pass=${req.password}`,
  );
};

export const signupRequest = (req) => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/registro.php?nombre=${req.name}&codigo=${req.code}&correo=${req.email}&telefono=${req.phone}&centro=${req.school}&semestre=${req.grade}&pass=${req.password}`,
  );
};

export const getCorredoresRequest = (req) => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/getCorredores.php?codigo=${req.codigo}`,
  );
};

export const userKm = (codigo) => {
  return axios.get(`https://marvelous-valley.000webhostapp.com/avance.php?codigo=${codigo}`);
};

export const logout = async () => {
  await AsyncStorage.removeItem('user');
};
