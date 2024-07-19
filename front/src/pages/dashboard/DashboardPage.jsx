/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
<<<<<<< HEAD
import { useUserDetails } from "../../shared/hooks";
import { useStores } from "../../shared/hooks/store/useStore.jsx";

import "./dashboardPage.css";
import './estilos/settings.css'
import './estilos/finishZolve.css'

=======
import {  } from "../../shared/hooks";

import "./dashboardPage.css";
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
import { useParams } from "react-router-dom";

export const DashboardPage = () => {

<<<<<<< HEAD
    const { getStores, allStores, isFetching: isStoresFetching } = useStores();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getStores(isLogged);
    }, []);

    if (isStoresFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content 
            stores={allStores || []} getStores={getStores}
            />
=======
    return (
        <div className="dashboard-container">
            <Navbar />
            <Content/>
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
        </div>
    );
};

