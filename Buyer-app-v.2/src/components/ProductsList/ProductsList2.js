import { React, useRef, useEffect, useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { Stack, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts, getProductsList } from "../../redux/products/selectors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const productsAll = useSelector((store) => getProductsList(store));
  const products = useSelector((store) => getFilteredProducts(store));
  const navigate = useNavigate();
  const _ = require("lodash");
  const dispatch = useDispatch();
  const addToShopingList = async (product) => {
    dispatch({ type: "SET_SHOPING_LIST_STATE", value: "loading" });
    axios.post('http://localhost:9000/products/shopingList/new', {
      id: product.id,
      name: product.name,
      id2: _.uniqueId()
    })
      .then(function (response) {
        updateShopingList();
      })
      .catch(function (error) {
        dispatch({ type: "SET_SHOPING_LIST_STATE", value: "error" });
        console.log(error);
      });
  };
  const updateShopingList = async () => {
    axios.get(`http://localhost:9000/products/shopingList`)
      .then(function (response) {
        dispatch({ type: "SET_SHOPING_LIST", value: response.data });
        dispatch({ type: "SET_SHOPING_LIST_STATE", value: "success" });
      })
      .catch(function (error) {
        dispatch({ type: "SET_SHOPING_LIST_STATE", value: "error" });
        console.log(error);
      });
  };

  // --- keyboard navigation ---
  const [preSelectedItem, setPreSelectedItem] = useState(productsAll[0]);
  const productsref = useRef();

  useEffect(() => {
    // if (products.length === 9) { 
    productsref.current.focus();
    console.log(1);
    // }
  }, [products]);

  const keypressHandler = (event, product) => {
    const preSelectedItemIndex = products.findIndex((product) => product.id === preSelectedItem.id);
    console.log(preSelectedItemIndex);
    if (event.code === "ArrowDown") { setPreSelectedItem(products[preSelectedItemIndex + 1]) };
    if (event.code === "ArrowUp") { setPreSelectedItem(products[preSelectedItemIndex - 1]) };
    if (event.code === "Enter") { addToShopingList(product) };
    if (event.code === "KeyD") { navigate(`../../product/productdetails/${product.id}`) };
  };

  return (
    <div className={commonColumnsStyles.App}
      ref={productsref}
      tabIndex={1}
    >
      <header className={commonColumnsStyles.AppHeader} >
        <p>Products list</p>
        <Stack spacing={2} >
          {products?.map((product) => (
            <>
              <Paper autoFocus
                tabIndex={1}
                onClick={() => addToShopingList(product)}
                onKeyDown={(e) => keypressHandler(e, product)}
                className={
                  product?.id === preSelectedItem?.id ?
                    commonColumnsStyles.preSelectedProduct : commonColumnsStyles.product
                }
                key={_.uniqueId()}
              >
                {`${product.id}. ${product.name}`}
              </Paper>
            </>
          ))}
        </Stack>
      </header>
    </div >
  );
}

export default ProductsList;