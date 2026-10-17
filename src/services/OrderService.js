
import axios from "axios";

const URL = "http://localhost:3000/orders";

export async function placeOrder(orderData) {
  const response = await axios.post(URL, orderData);
  return response.data;
}
