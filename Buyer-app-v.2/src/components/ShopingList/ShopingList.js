import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { Stack, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getShopingList } from "../../redux/products/selectors";
import { getStatusShopingList } from "../../redux/products/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function ShopingList(props) {
    const _ = require("lodash");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const statusShopingList = useSelector((store) => getStatusShopingList(store));
    const removeFromShopingList = async (id) => {
        dispatch({ type: "SET_SHOPING_LIST_STATE", value: "loading" });
        axios.delete(`http://localhost:9000/products/shopingList/${id}`)
            //  http://localhost:9000/products/shopingList/:id
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
                // console.log(response);
                dispatch({ type: "SET_SHOPING_LIST", value: response.data });
                dispatch({ type: "SET_SHOPING_LIST_STATE", value: "success" });
            })
            .catch(function (error) {
                dispatch({ type: "SET_SHOPING_LIST_STATE", value: "error" });
                console.log(error);
            });
    };

    const products = useSelector((store) => getShopingList(store));

    const productDetails = (id, event) => {
        event.preventDefault();
        navigate(`../../product/productdetails/${id}`)
    };

    return (
        <div className={commonColumnsStyles.App}>
            <header className={commonColumnsStyles.ShoppingList}>
                <p>Shoping List</p>
                <Stack spacing={2}>
                    {statusShopingList === "loading" ? (
                        <CircularProgress />
                    ) : (products?.map((product) => (
                        // <Link key={product.id} to={`/product/productdetails/${product.id}`}>
                        <Paper
                            className={commonColumnsStyles.Products}
                            key={_.uniqueId()}
                            onClick={() => removeFromShopingList(product.id2)}
                            onContextMenu={(event) => productDetails(product.id, event)} >
                            {`${product.id}. ${product.name}`}</Paper>
                        // </Link>
                    )))}
                </Stack>
            </header>
        </div >
    );
}

export default ShopingList;