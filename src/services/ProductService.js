import axios from "axios";

const URL = "http://localhost:3000/products";




export const createProduct = async (product) => {
  const response = await axios.post(URL,product);
  return response.data;
};
export const getProducts = async () => {
  const response = await axios.get(URL);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

export const SoftDeleteProductById = async (id) => {
  const response = await axios.patch(`${URL}/${id}`,{
    isDeleted:true
  });
  return response.data;
};
export const restoreProductById = async (id) => {
  const response = await axios.patch(`${URL}/${id}`, {
    isDeleted: false,
  });

  return response.data;
};
export const getDeletedProducts=async()=>{
  const response =await axios.get(`${URL}?isDeleted=true`);
  return response.data;
}
export const deleteProductById = async (id) => {
  const response = await axios.delete(`${URL}/${id}`);
  return response.data;
};


