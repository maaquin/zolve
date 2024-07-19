import { useState } from "react";
import { useLogout as logoutHandler } from "./useLogout"

const getUserDetails = () => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
        return JSON.parse(userDetails);
    }
    return null;
};

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails());

    const logout = () => {
        logoutHandler();
    };

    return {
        isLogged: Boolean(userDetails),
<<<<<<< HEAD
        user: userDetails,
=======
        username: userDetails?.username ? userDetails.username : "Guest",
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
        logout,
    };
};