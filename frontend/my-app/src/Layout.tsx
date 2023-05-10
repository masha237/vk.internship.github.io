import React from 'react';
import Logo from "./components/Logo";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {Outlet} from "react-router-dom";
import "./styles/layout.css"
import {Jwt} from "./types/Jwt";
const Layout = (jwt0:Jwt) => {
    return <div id="main-layout">
        <Logo/>
        <Header/>
        <Sidebar jwt={jwt0.jwt} setJwt={jwt0.setJwt}/>
        <Outlet/>
    </div>;
}

export default Layout;
