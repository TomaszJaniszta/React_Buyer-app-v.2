import { React, useRef, useEffect, useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { Stack, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "../../redux/products/selectors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsList() {
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
  const [currentFocused, setCurrentFocused] = useState(0);
  const productsref = useRef();
  useEffect(() => {
    if (products.length === 9) {
      let el = document.getElementsByClassName(commonColumnsStyles.Products)[currentFocused];
      el.focus();
    }
  }, [products.length, currentFocused]);

  const keypressHandler = (event, product) => {
    let next = currentFocused;
    if (event.code === "ArrowDown" && next < products.length) { next++ };
    if (event.code === "ArrowUp" && next > 0) { next-- };
    let el = document.getElementsByClassName(commonColumnsStyles.Products)[next];
    if (!el) { return } else { el.focus() }
    // console.log("key ", event.code, " ", product);
    if (event.code === "Enter") { addToShopingList(product) };
    if (event.code === "KeyD") { navigate(`../../product/productdetails/${product.id}`) };
    // use scrollIntoView() method so the focused element will always show on the browser view port
    // el.scrollIntoView(false);
    setCurrentFocused(next);
  };

  const productMenu = (id, event) => {
    event.preventDefault();
  };

  return (
    <div className={commonColumnsStyles.App} >
      <h4>{`Products list: ${products.length}`}</h4>
      <p>Right click on item to add to shopping list.<br />  If focused you can move arrow up/down to change item and enter to do the same.</p>
      <div className={commonColumnsStyles.ProductList}>
        <Stack spacing={2} >
          {products?.map((product) => (
            <>
              <Paper autoFocus className={commonColumnsStyles.Products}
                ref={productsref}
                // ref={element => {
                //   // save element on `productElement.current`, we can access it later
                //   productsRef.current = element;
                // }}
                key={_.uniqueId()}
                // tabIndex={product.id}
                tabIndex={1}
                onClick={() => addToShopingList(product)}
                onContextMenu={(event) => productMenu(product.id, event)}
                onKeyDown={(e) => keypressHandler(e, product)}
              >
                {`${product.id}. ${product.name}`}
              </Paper>
            </>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default ProductsList;