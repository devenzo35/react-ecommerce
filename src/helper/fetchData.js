export const fetchData = async () => {
  const res = await Promise.all([
    fetch("https://api.stripe.com/v1/products", {
      headers: {
        Authorization:
          "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
      },
    }),

    fetch("https://api.stripe.com/v1/prices", {
      headers: {
        Authorization:
          "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
      },
    }),
  ]);

  const json = await Promise.all(res.map((e) => e.json()));

  const products = json[0].data;
  const prices = json[1].data;

  const productsData = prices.map((price) => {
    const productsData = products.filter(
      (product) => product.id === price.product
    );

    productsData.map((product) => {
      return (product.priceInfo = {
        currency: price.currency,
        unit: price.unit_amount_decimal,
        priceId: price.id,
      });
    });

    return productsData;
  });

  const finalProduct= productsData.map(e=>e[0])

  return finalProduct;
};
