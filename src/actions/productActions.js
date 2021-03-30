import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("http://localhost:5000/api/v1/products");
  const data = await response.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
