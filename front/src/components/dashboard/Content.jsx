import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ListProduct } from "../shoppingCart/ListProduct";

export const Content = ({ menuShow }) => {

    const [switchMenu, setSwitchMenu] = useState(null);

    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {

        if (menuShow) {
            switch (menuShow) {
                case 'shop':
                    setSwitchMenu(<ListProduct />);
                    setShowMenu(true);
                    break;
                default:
                    setSwitchMenu(<div>Cargando...</div>);
                    setShowMenu(true);
                    break;
            }
        } else {
            setSwitchMenu(<div>Cargando...</div>);
            setShowMenu(!showMenu);
        }

    },
        [menuShow]);

    return (
        <div className="content-container">
            {showMenu ? switchMenu : switchMenu
            }
        </div>
    )
}   