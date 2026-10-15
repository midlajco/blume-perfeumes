import axios from "axios";

const URL =  "http://localhost:3000/users";


export async function createUser(user){
    const response = await axios.post(`${URL}`,user);
    return response.data
}
