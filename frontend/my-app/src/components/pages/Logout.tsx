import React, {useEffect} from 'react';
import AuthService from "../../Utils/AuthService";
import {Navigate} from "react-router-dom";
import {Jwt} from "../../types/Jwt";
const Logout = (jwt0:Jwt) => {

    useEffect(() => {
        AuthService.logout();
        jwt0.setJwt(null);
    }, [jwt0]);

    return (
        <Navigate to="/login" replace/>
    );
};

export default Logout;