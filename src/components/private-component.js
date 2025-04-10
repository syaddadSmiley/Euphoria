import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { useJwt } from "react-jwt";

const PrivateComponent = () => {
    // const [cookies] = useCookies(["token"]);
    // const { decodedToken, isExpired } = useJwt(cookies.token);
    // const auth = cookies.token && !isExpired;
    // return auth ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateComponent;