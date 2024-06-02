/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { } from "../../shared/hooks";

import "./dashboardPage.css";
import { useParams } from "react-router-dom";

export const DashboardPage = ({ menu }) => {
    // switchHandle: estado para dl Content
    const [switchHandle, setSwitchHandle] = useState(null);
    // switchMenu: estado para el menu que se va a mostrar
    const [switchMenu, setSwitchMenu] = useState('');

    useEffect(() => {
        //el if es para verificar si se envio un menu
        if (menu) {
            //dependiendo del menu se mostrara el content con el menu que se envio
            switch (menu) {
                case 'shop':
                    setSwitchHandle(true);
                    setSwitchMenu('shop');
                    break;
                case 'store':
                    setSwitchHandle(true);
                    setSwitchMenu('store');
                    break;
                default:
                    setSwitchHandle(!switchHandle);
                    break;
            }
        }else{
            //si no se envio un menu se renderiza un componente por defecto
            setSwitchHandle(!switchHandle);
        }
    }, [menu]);

    return (
        <div className="dashboard-container">
            <Navbar />
            {switchHandle ? (<div><Content menuShow={switchMenu} /></div>) : (<div><Content /></div>)
            }
        </div>
    );
};