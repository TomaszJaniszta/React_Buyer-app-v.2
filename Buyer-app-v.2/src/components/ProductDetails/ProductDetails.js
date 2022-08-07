import { React, useEffect, useRef } from 'react';
import commonColumnsStyles from "./ProductsDetails.module.scss";
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
        <div className={commonColumnsStyles.appDetails} tabIndex={1} onKeyDown={handleKeyDown} ref={ref} autoFocus >
            {
                statusProductDetails === "loading" ? (
                    <CircularProgress />
                ) : (
                    <>
                        <h4> Product details </h4>
                        <div className={commonColumnsStyles.details}>
                            <span> Item id: <b>{productDetails.id} </b></span>
                            <span> Item name: <b>{productDetails.name} </b></span>
                            <span> Item category: <b>{productDetails.category} </b></span>
                            <span> Item is food: <b>{new Boolean(productDetails.isFood).toString()} </b></span>
                        </div>
                    </>
                )
            }
            <br />
            <div className={commonColumnsStyles.Arrow} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="large" /> Backspace </div>
        </div >

    );
}

export default ProductDetails;