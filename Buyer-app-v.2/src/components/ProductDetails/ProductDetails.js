import { React, useEffect, useRef } from 'react';
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/products/selectors";
import { getStatusProductDetails } from "../../redux/products/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';

function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const productDetails = useSelector((store) => getProductDetails(store));
    const statusProductDetails = useSelector((store) => getStatusProductDetails(store)); // loading details status

    useEffect(() => {
        dispatch({ type: "SET_PRODUCT_DETAILS_STATE", value: "loading" });
        axios.get(`http://localhost:9000/products/${id}`)
            // http://localhost:9000/products/:id
            .then(function (response) {
                console.log(response.data)
                dispatch({ type: "SET_PRODUCT_DETAILS", value: response.data });
                dispatch({ type: "SET_PRODUCT_DETAILS_STATE", value: "success" });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleKeyDown = (event) => {
        console.log("key ", event.code);
        if (event.code === "Backspace") { navigate(-1) };
    };

    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    }, []);

    return (
        <div className={commonColumnsStyles.App} tabIndex={1} onKeyDown={handleKeyDown} ref={ref} autoFocus >
            <header className={commonColumnsStyles.AppHeader}>
                <ArrowBackIcon onClick={() => navigate(-1)} fontSize="large" />
                <p>Product Details</p>

                {statusProductDetails === "loading" ? (
                    <CircularProgress />
                ) : (
                    <>
                        <span> Item id: {productDetails.id} </span>
                        <span> Item name: {productDetails.name} </span>
                        <span> Item category: {productDetails.category} </span>
                        <span> Item is food: {new Boolean(productDetails.isFood).toString()} </span>
                    </>
                )}
            </header>
        </div >

    );
}

export default ProductDetails;