import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import styles from "./LoginPage.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function LoginPage() {
  let navigate = useNavigate();

  const [userfirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const signInUser = (e) => {
    e.preventDefault();
    window.localStorage.setItem(
      "user",
      JSON.stringify({ userfirstName, userLastName })
    );
    navigate("/products/dashboard");
  };
  return (
    <div className={styles.loginPageWrapper}>
      <form onSubmit={signInUser}>
        <Box sx={{ m: 1 }}>
          <div className={styles.Inputs}>
            <TextField
              className={styles.Inputs}
              type="text"
              margin="dense"
              id="outlined-basic"
              label="First name"
              variant="outlined"
              value={userfirstName}
              onChange={(event) => setUserFirstName(event.target.value)}
            />
          </div>
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            className={styles.Inputs}
            type="text"
            margin="dense"
            id="outlined-basic"
            label="Last name"
            variant="outlined"
            value={userLastName}
            onChange={(event) => setUserLastName(event.target.value)}
          />
        </Box>
        <div align="center">
          <Box sx={{ m: 1 }}>
            <Button
              disabled={!userfirstName || !userLastName}
              variant="contained"
              type="submit"
            >
              Log in
            </Button>
          </Box>
        </div>
      </form>
    </div >
  );
}

export default LoginPage;
