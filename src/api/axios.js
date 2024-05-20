import axios from "axios";

//Crear axios para poder guardar las cookies y los datos 
const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: 'true'
})

export default instance

