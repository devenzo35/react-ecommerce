import { types } from "../types/types";

export const loadHomeProducts = (products) => ({
  type: types.LoadProducts,
  payload: products,
});

export const createProduct = (name, description, price, image) => {
  return async (dispatch) => {
    
      const getProducts = await fetch("https://api.stripe.com/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization:
            "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
        },
        body: `name=${name}&description=${description}&images[0]=${image.imgUrl}`,
      });

      const products = await getProducts.json();

      const getPrices = await fetch("https://api.stripe.com/v1/prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization:
            "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
        },
        body: `unit_amount=${price}&product=${products.id}&currency=usd`,
      });

      const prices = await getPrices.json();

      products.priceInfo = {
        currency: prices.currency,
        unit: prices.unit_amount.toString(),
        priceId: prices.id,
      };
      dispatch(addNewProduct(products));
    
  };
};

const addNewProduct = (newProduct) => ({
  type: types.addNewProduct,
  payload: newProduct,
});

