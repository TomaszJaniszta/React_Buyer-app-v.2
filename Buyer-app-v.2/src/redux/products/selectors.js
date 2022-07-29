export const getProductsList = (store) => {
    return store.products.productsList;
};

export const getShopingList = (store) => {
    return store.products.shopingList;
};

export const getStatusShopingList = (store) => {
    return store.products.shopingLoadingState;
};

export const getFilteredProducts = (store) => {
    return store.products.filteredProducts;
};

export const getProductDetails = (store) => {
    return store.products.selectedProduct
    // return store.products.productsList.find((product) => product.id === id);
};

export const getStatusProductDetails = (store) => {
    return store.products.productLoadingState;
};
