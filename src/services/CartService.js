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

export async function addProductToCart(userId, product) {
  const newItem = {
    productId: product.productId ?? product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    quantity: 1,
  };

  const cart = await getCart(userId);

  // Cart illenkil create cheyyuka
  if (!cart) {
    return await createCart(userId, newItem);
  }

  // Invalid null entries remove cheyyuka
  const items = (cart.items || []).filter(Boolean);

  // Product already cart-il undo enn check cheyyuka
  const existingItem = items.find(
    (cartItem) => String(cartItem.productId) === String(newItem.productId),
  );

  let updatedItems;

  if (existingItem) {
    updatedItems = items.map((cartItem) =>
      String(cartItem.productId) === String(newItem.productId)
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  } else {
    updatedItems = [...items, newItem];
  }

  return await updateCart(cart.id, updatedItems);
}
