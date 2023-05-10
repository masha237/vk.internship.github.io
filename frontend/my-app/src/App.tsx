import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Friends from "./components/pages/Friends";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import IndexPage from "./components/pages/IndexPage";
import UserPage from "./components/pages/UserPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import Logout from "./components/pages/Logout";
import {IUser} from "./types/IUser";
import {Jwt} from "./types/Jwt";

const App: React.FC = () => {
    const [jwt, setJwt] = useState<string | null>(null);
    const [friends, setFriends] = useState<Array<IUser> | null>(null);
    const [jwt0, setJwt0] = useState<Jwt>();

    useEffect(() => {
        setJwt(localStorage.getItem("jwt"))
        setJwt0({jwt, setJwt});
    }, [jwt]);
    return <div>
        {jwt0?.jwt &&
            <Routes>
                <Route path="/" element={<Layout jwt={jwt} setJwt={setJwt}/>}>

                    <Route index element={<IndexPage jwt0={jwt0}/>}/>
                    <Route path="friends" element={<Friends jwt0={jwt0} friends={friends} setFriends={setFriends}/>}/>
                    <Route path="logout" element={<Logout jwt={jwt} setJwt={setJwt}/>}/>
                    <Route path="user/:login" element={<UserPage  jwt0={jwt0} setFriends={setFriends}/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>}
        {!jwt0?.jwt &&
            <Routes>
                <Route path="/" element={<Layout jwt={jwt} setJwt={setJwt}/>}>
                    <Route path="*" element={<LoginPage jwt={jwt} setJwt={setJwt}/>}/>
                    <Route index element={<LoginPage jwt={jwt} setJwt={setJwt}/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                </Route>
            </Routes>}

    </div>;
}

export default App;
