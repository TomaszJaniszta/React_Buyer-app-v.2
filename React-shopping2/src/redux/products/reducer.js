import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return { ...state, productsList: action.value };

    case "SET_SHOPING_LIST":
      return { ...state, shopingList: action.value };
    case "SET_SHOPING_LIST_STATE":
      return { ...state, shopingLoadingState: action.value };
    case "GET_SHOPING_LIST_STATE":
      return { shopingLoadingState: action.shopingLoadingState };

    case "SET_INITIAL_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: state.productsList };
    case "SET_FILTERED_PRODUCTS_BY_VALUE":
      return {
        ...state, filteredProducts: (state.productsList.filter(
          (product) => product.name.toLowerCase().includes(action.value.toLowerCase())
        )
        )
      };
    case "SET_FILTERED_PRODUCTS_FOOD":
      return {
        ...state, filteredProducts: (state.filteredProducts.filter(
          (product) => product.isFood === true)
        )
      };

    case "SET_PRODUCT_DETAILS_STATE":
      return { ...state, productLoadingState: action.value };
    case "GET_PRODUCT_DETAILS_STATE":
      return { productLoadingState: action.productLoadingState };
    case "SET_PRODUCT_DETAILS":
      return { ...state, selectedProduct: action.value };

    default:
      return state;
  }
};