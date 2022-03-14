const { default: axios } = require('axios');

export const loginRequest = (req) => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/login.php?codigo=${req.username}&pass=${req.password}`,
  );
};

export const signupRequest = (req) => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/registro.php?nombre=${req.name}&codigo=${req.code}&correo=${req.correo}&telefono=${req.phone}&centro=${req.school}&semestre=${req.grade}&pass=${req.password}`,
  );
};

export const getCorredoresRequest = () => {
  return axios.get(
    `https://marvelous-valley.000webhostapp.com/getCorredores.php`,
  );
};
