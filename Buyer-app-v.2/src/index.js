import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./components/Dashboard/Dashboard";
import { store } from "./redux/store";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Provider } from "react-redux";

// import Ball1 from "./components/Ball1/Ball1";
import Ball2 from "./components/Ball2/Ball2";
import Main from "./components/Main/Main";
import Chess from "./components/Chess/Chess";
import Gol from "./components/Gol/Gol";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="products" element={<App />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route path="product" element={<App />}>
                    <Route path="productdetails/:id" element={<ProductDetails />} />
                </Route>
                {/* <Route path="ball1" element={<App />}>
                    <Route path="ball_v1" element={<Ball1 />} />
                </Route> */}
                <Route path="ball2" element={<App />}>
                    <Route path="ball_v2" element={<Ball2 />} />
                </Route>
                <Route path="main" element={<App />}>
                    <Route path="main" element={<Main />} />
                </Route>
                <Route path="chess" element={<App />}>
                    <Route path="chess" element={<Chess />} />
                </Route>
                <Route path="gol" element={<App />}>
                    <Route path="gol" element={<Gol />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();