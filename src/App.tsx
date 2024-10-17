import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./scss/app.scss";

import Header from "./components/header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Search from "./components/Search";
import FullPizza from "./pages/FullPizza";


function App() {
    return (
        <body>
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/pizza/:id" element={<FullPizza/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </div>
        </body>
    );
}

export default App;
