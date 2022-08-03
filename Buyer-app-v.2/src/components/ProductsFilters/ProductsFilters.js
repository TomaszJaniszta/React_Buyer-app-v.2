import { useEffect, useState, React } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

function ProductsFilters() {
    const dispatch = useDispatch();
    // let textInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const [isFoodCategory, setIsFoodCategory] = useState(false);
    const initialProducts = () => { dispatch({ type: "SET_INITIAL_FILTERED_PRODUCTS" }) };
    const filteredByValue = () => { dispatch({ type: "SET_FILTERED_PRODUCTS_BY_VALUE", value: searchValue }) };
    const filteredByFood = () => { dispatch({ type: "SET_FILTERED_PRODUCTS_FOOD", value: isFoodCategory }) };

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
        <div className={styles.filtersHeaderWrapper}>
            <div className={styles.filtersForm}>
                <h4><i> Filter products: </i></h4>
                {/* <Typography variant="h6"></Typography> */}
                <FormGroup>
                    <FormControlLabel
                        control={
                            <TextField
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
                <h4><i> Only food: </i></h4>
                {/* <Typography variant="h6"></Typography> */}
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            value={isFoodCategory}
                            onChange={onChangeIsFoodCategory}
                        />}
                    />
                </FormGroup >
            </div>
        </div >
    );
}

export default ProductsFilters;