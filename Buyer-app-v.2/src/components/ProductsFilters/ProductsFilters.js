import { useEffect, useState, React } from "react";
import styles from "./ProductsFilters.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
// import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from 'axios';

function ProductsFilters() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [isFoodCategory, setIsFoodCategory] = useState(false);
    const initialProducts = () => { dispatch({ type: "SET_INITIAL_FILTERED_PRODUCTS" }) };
    const filteredByValue = () => { dispatch({ type: "SET_FILTERED_PRODUCTS_BY_VALUE", value: searchValue }) };
    const filteredByFood = () => { dispatch({ type: "SET_FILTERED_PRODUCTS_FOOD", value: isFoodCategory }) };

    const setInitialValues = async () => {
        try {
            dispatch({ type: "SET_SHOPING_LIST_STATE", value: "loading" });
            dispatch({ type: "SET_PRODUCT_LIST_STATE", value: "initial" });
            const response = await axios.get(`http://localhost:9000/products`);
            dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: response.data });
            dispatch({ type: "SET_PRODUCT_LIST_STATE", value: "success" });
            dispatch({ type: "SET_INITIAL_FILTERED_PRODUCTS" });
            setInitialValuesShoppingList();
            document.getElementById("loader").id = "normalBtn";
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

    useEffect(() => {
        initialProducts();
        filteredByValue();
        if (isFoodCategory) { filteredByFood() };
    }, [searchValue])

    useEffect(() => {
        if (isFoodCategory) { filteredByFood() } else {
            initialProducts();
            if (searchValue) { filteredByValue() };
        }
    }, [isFoodCategory])

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onChangeIsFoodCategory = (event) => {
        setIsFoodCategory(!isFoodCategory);
    };

    return (
        <>
            <p>Works only with runing attached server. Products from remote resource + Redux</p>
            <div className={styles.FiltersHeaderWrapper}>
                <div className={styles.buttons}>
                    <button id="loader" className={styles.buttons} onClick={setInitialValues} >Load products</button>
                </div>
                <div className={styles.FilterName}>
                    <h4>Filter products:</h4>
                    {/* <Typography variant="h6"></Typography> */}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <TextField
                                    className={styles.Inputs}
                                    id="textInput"
                                    margin="dense"
                                    label="product name"
                                    variant="outlined"
                                    value={searchValue}
                                    onChange={onChangeSearchValue}
                                />
                            }
                        />
                    </FormGroup >
                </div>

                <div className={styles.FilterFood}>
                    <h4> Only food: </h4>
                    {/* <Typography variant="h6">Only food:</Typography> */}
                    <FormGroup>
                        <label className={styles.checkbox}>
                            <FormControlLabel
                                control={<Checkbox
                                    type="checkbox"
                                    id="checkbox"
                                    value={isFoodCategory}
                                    onChange={onChangeIsFoodCategory}
                                />}
                            />
                        </label>
                    </FormGroup >
                </div>
            </div >
        </>
    );
}

export default ProductsFilters;
