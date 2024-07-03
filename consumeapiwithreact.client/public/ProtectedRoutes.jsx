import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loaderImg from '../src/assets/loader.gif'

function ProtectedRoutes() {
    const [isLogged, setLogged] = useState(false);
    const [waiting, setWaiting] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Set withCredentials for axios requests
        axios.defaults.withCredentials = true;

        async function checkAuthorization() {
            try {
                const userEmail = localStorage.getItem('user');
                setEmail(userEmail); // Set email state with stored user email

                const response = await axios.get("api/Auth/IsAuthorize", {
                    params: { email: userEmail }, // Pass userEmail as parameter
                    withCredentials: true
                });

                const data = response.data;
                setLogged(true);
                setWaiting(false);
                localStorage.setItem("user", data.email);
            } catch (error) {
                console.log("User is unauthenticated");
                setWaiting(false);
                localStorage.removeItem("user");
            }
        }

        checkAuthorization(); // Call the checkAuthorization function
    }, []); // Depend on email to ensure useEffect runs when email changes

    return waiting ? (
        <div className="waiting">
            <div>
                <img src={loaderImg} alt="Loading..." height={100} width={100} className="loaderImg" />
            </div>
        </div>
    ) : isLogged ? (
        <Outlet />
    ) : (
        <Navigate to="/Signin" />
    );
}

export default ProtectedRoutes;
