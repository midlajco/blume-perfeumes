import axios from "axios";

const URL =  "http://localhost:3000/users";


export async function createUser(user){
    const response = await axios.post(`${URL}`,user);
    return response.data
}
export async function getUserByEmail(email){
    const response =await axios.get(URL,{params:{email}})
    return response.data[0]
}
