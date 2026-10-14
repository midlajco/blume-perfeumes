import axios from "axios";

const URL ="http://localhost:3000/products";

export const getProducts =async()=>{
    const response =await axios.get(URL);
    return response.data;
}


