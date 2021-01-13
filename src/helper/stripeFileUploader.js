export const fileUploader = async (event) => {
  const formData = new FormData();

  formData.append("file", event.target.files[0]);
  formData.append("purpose", "business_logo");

  const fileUploaded = await fetch("https://files.stripe.com/v1/files", {
    method: "POST",
    headers: {
      authorization:
        "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
    },
    body: formData,
  });

  const data = await fileUploaded.json();

  if (data.error) return { imgUrl: null, error: data.error };

  const imgUrl = await fetch(`https://api.stripe.com${data.links.url}`, {
    method: "POST",
    headers: {
      authorization:
        "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg",
    },
  });

  const imgJson = await imgUrl.json();

  return { imgUrl: imgJson.url, error: null };
};
