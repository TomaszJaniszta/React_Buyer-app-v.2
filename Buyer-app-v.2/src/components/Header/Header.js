import { React } from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from 'axios';

function Header(props) {
    const currentUser = JSON.parse(window.localStorage.getItem("user"));
    const dispatch = useDispatch();

    const setInitialValues = async () => {
        try {
            dispatch({ type: "SET_SHOPING_LIST_STATE", value: "loading" });
            dispatch({ type: "SET_PRODUCT_LIST_STATE", value: "initial" });
            const response = await axios.get(`http://localhost:9000/products`);
            dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: response.data });
            dispatch({ type: "SET_PRODUCT_LIST_STATE", value: "success" });
            dispatch({ type: "SET_INITIAL_FILTERED_PRODUCTS" });
            setInitialValuesShoppingList();
        } catch (e) {
            dispatch({ type: "SET_SHOPING_LIST_STATE", value: "error" });
            console.log("ERROR", e)
        }
    };

    const setInitialValuesShoppingList = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/products/shopingList`);
            dispatch({ type: "SET_SHOPING_LIST", value: response.data });
            dispatch({ type: "SET_SHOPING_LIST_STATE", value: "success" });
        } catch (e) {
            dispatch({ type: "SET_SHOPING_LIST_STATE", value: "error" });
            console.log("ERROR", e)
        }
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.signedUserInfo}>
                <Typography sx={{ m: 2 }} variant="h5">
                    <i>Logged:{" "}</i>
                    {`${currentUser.userfirstName} ${currentUser.userLastName}`}
                </Typography>
                <Button variant="contained" onClick={setInitialValues} >Load products</Button>
                <Link to="/">
                    <Button variant="contained" color="error"> Log off </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;