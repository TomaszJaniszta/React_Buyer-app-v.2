import { React } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
    const currentUser = JSON.parse(window.localStorage.getItem("user"));

    const navigate = useNavigate();

    const onClickMenu = (event) => {
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
                    <h4>Menu</h4>
                    <label className={styles.selects}>
                        <select id="select" onChange={onClickMenu} onClick={onClickMenu}>
                            <option key={'default'} value={''}>Balls</option>
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
                    <div className={styles.buttons} >
                        {/* <button id="loader" onClick={setInitialValues} >Load products</button> */}
                        <Link to="/">
                            <button id="logger" >Log off </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;