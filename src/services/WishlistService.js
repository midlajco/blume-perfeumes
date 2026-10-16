import axios from "axios";

const URL = "http://localhost:3000/wishlists";

export const getWishList = async (userId) => {
  const response = await axios.get(URL, { params: { userId } });
  return response.data[0] || null;
};
export async function createWishlist(userId, productId) {
  const response = await axios.post(URL, {
    userId,
    items: [{ productId }],
  });

  return response.data;
}
export async function updateWishlist(wishlistId, items) {
  const response = await axios.patch(`${URL}/${wishlistId}`, {
    items,
  });

  return response.data;
}
