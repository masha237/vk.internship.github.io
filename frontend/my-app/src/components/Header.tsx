import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./../styles/layout.css"
import {Jwt} from "../types/Jwt";
const Header: React.FC = () => {
    const [jwt, setJwt] = useState<string | null>();

    useEffect(() => {
        setJwt(localStorage.getItem("jwt"))
    }, [localStorage]);
    return (
        <div id="header">
            {jwt && <Link to={"/logout"}>Logout</Link>}
            {!jwt && <Link to={"/login"}>Login</Link>}
        </div>
    );
};

export default Header;