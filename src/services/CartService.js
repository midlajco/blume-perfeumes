import axios from axios


const URL = "http://localhost:3000/carts";

export const getCart =async (userId) =>{
    const response =await axios.get(URL,{  params:{userId} });
    return response.data[0] || null
}


