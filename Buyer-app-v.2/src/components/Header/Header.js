import { React } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Header() {
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
            console.log(document.getElementById("loader").className);
            console.log(document.getElementById("logger").className);
            document.getElementById("loader").className = document.getElementById("logger").className;
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

    const navigate = useNavigate();

    const onClickMenu = (event) => {
        console.log("selected menu " + event.target.value);
        if (event.target.value === "Bouncing ball v.2") {
            navigate(`../../ball2/ball_v2`);
        };
        if (event.target.value === "buyer_app") {
            navigate(`../../products/dashboard`);
        };
    };

    const ballMenu = ["Bouncing ball v.1", "Bouncing ball v.2"];

    return (
        <div>
            <div className={styles.headerWrapper}>
                <div className={styles.menu}>
                    <p>Menu</p>
                    <label className={styles.selects}>
                        <select onChange={onClickMenu} onClick={onClickMenu}>
                            <option key={'default'} value={''}>Bouncing Ball scripts</option>
                            {ballMenu.map((version) => (
                                <option key={version} value={version}>
                                    {version}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button onClick={onClickMenu} value="buyer_app">Buyer application</button>
                    <button>Select2</button>
                    <button>Select3</button>
                    <button>Select4</button>
                </div>
                <div className={styles.headerWrapper}>
                    <div className={styles.signedUserInfo}>
                        <h4>Logged:</h4>
                        <Typography sx={{ m: 1 }} variant="h6" color="blue" font>
                            {` ${currentUser.userfirstName} ${currentUser.userLastName}`}
                        </Typography>
                    </div>
                    <div className={styles.button} >
                        <button id="loader" className={styles.loader} onClick={setInitialValues} >Load products</button>
                        <Link to="/">
                            <button id="logger" className={styles.buttons}>Log off </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;