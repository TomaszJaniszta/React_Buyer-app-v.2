import { React } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
    const currentUser = JSON.parse(window.localStorage.getItem("user"));

    const navigate = useNavigate();
    // navigate(`../../ball2/ball_v2`);

    const ballMenu = ["Bouncing ball v.1", "Bouncing ball v.2"];

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.menu}>
                <h4>Menu</h4>
                <div>
                    <ol>
                        <li>
                            <a href="#">Main page</a>
                        </li>
                        <li>
                            <a>Buyer apps</a>
                            <ul>
                                <li>
                                    <a href="#">Buyer v.1</a>
                                </li>
                                <li>
                                    <a href="../../products/dashboard">Buyer v.2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Ball apps</a>
                            <ul>
                                <li>
                                    <a href="../../ball1/ball_v1">Ball v.1</a>
                                </li>
                                <li>
                                    <a href="../../ball2/ball_v2">Ball v.2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Chess app</a>
                        </li>
                        <li>
                            <a>Other</a>
                            <ul>
                                <li>
                                    <a href="#">link - 1</a>
                                </li>
                                <li>
                                    <a href="#">link - 2</a>
                                </li>
                                <li>
                                    <a href="#">link - 3</a>
                                </li>
                                <li>
                                    <a href="#">link - 4</a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>
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
    );
}

export default Header;