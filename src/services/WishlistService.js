import axios from "axios";

const URL = "http://localhost:3000/wishlists";

export const getWishList = async (userId) => {
  const response = await axios.get(URL, { params: { userId } });
  return response.data[0] || null;
};
export async function createWishlist(userId, product) {
  const response = await axios.post(URL, {
    userId,
    items: [product],
  });

  return response.data;
}
export async function updateWishlist(wishlistId, items) {
  const response = await axios.patch(`${URL}/${wishlistId}`, {
    items: items,
  });

  return response.data;
}
