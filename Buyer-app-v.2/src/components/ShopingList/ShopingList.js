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
            <h4>{!products ? `Shopping list: 0` :

                `Shopping list: ${products.length}`}</h4>

            <p>Right click on item to remove.<br /> Left click to go to the item details.</p>
            <div className={commonColumnsStyles.ShoppingList}>
                <Stack spacing={2}>

                    {statusShopingList === "loading" ? (
                        <CircularProgress />
                    ) : (
                        <p>tekst</p>,
                        products?.map((product, id) => (
                            // <Link key={product.id} to={`/product/productdetails/${product.id}`}>
                            <Paper
                                className={commonColumnsStyles.Products}
                                key={_.uniqueId()}
                                onClick={() => removeFromShopingList(product.id2)}
                                onContextMenu={(event) => productDetails(product.id, event)} >
                                {`${id + 1}. ${product.name}`}
                            </Paper>
                            // </Link>
                        )))}
                </Stack>
            </div>
        </div >
    );
}

export default ShopingList;