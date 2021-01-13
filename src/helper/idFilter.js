import { fetchData } from "./fetchData";

export const idFilter = async (id) => {
  const data = await fetchData();
  const arrFiltered = data.filter((e) => e.id === id);
  return arrFiltered[0];
};
