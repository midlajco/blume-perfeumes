import axios from "axios";

const URL = "http://localhost:3000/carts";

export const getCart = async (userId) => {
  const response = await axios.get(URL, { params: { userId } });
  return response.data[0] || null;
};

export async function createCart(userId, product) {
  const response = await axios.post(URL, {
    userId,
    items: [product],
  });
  return response.data;
}
export async function updateCart(cartId, product) {
  const response = await axios.patch(`${URL}/${cartId}`, {
    items: product,
  });
  return response.data;
}
