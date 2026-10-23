import axios from "axios";

const URL = "http://localhost:3000/orders";

export async function getorders() {
  const response =await axios.get(URL);
  return response.data
} 

export async function placeOrder(orderData) {
  const response = await axios.post(URL, orderData);
  return response.data;
}

export async function getOrdersById(userId){
  const response =await axios.get(URL,{
    params:{userId}
  })
  return response.data
}
export async function changeOrderStatus({orderId,status}){
  const response =await axios.patch(`${URL}/${orderId}`,{status:status});
  return response.data
}
