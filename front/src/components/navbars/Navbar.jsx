import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/navbar.png';
import { useUserDetails } from '../../shared/hooks';
import Header from '../Header'; 

const NavLogo = ({ onClickHandler }) => {
    return (
        <span className="nav-logo-container" onClick={onClickHandler}>
            <img className="nav-logo" src={logo} alt="Logo" />
            <span className='nav-title'>Solve</span>
        </span>
    );
};

const NavButton = ({ text, icon, onClickHandler, isActive }) => {
    return (
        <span className={`nav-button ${isActive ? 'active' : ''}`} onClick={onClickHandler}>
            <i className={icon} style={{ color: '#000000' }}></i>
            <span>{text}</span>
        </span>
    );
};

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    const [showHeader, setShowHeader] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleNavigate = (path, button) => {
        setActiveButton(button);
        setShowHeader(button === 'shopping');
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        setActiveButton('');
        setShowHeader(false);
    };

    return (
        <>
            <div className={`nav-container ${collapsed ? 'collapsed' : ''}`}>
                <NavLogo onClickHandler={toggleCollapse} />
                <div className="nav-buttons-container">
                    <NavButton
                        text="Home"
                        icon="fa-solid fa-house-chimney"
                        onClickHandler={() => handleNavigate('/', '')}
                        isActive={activeButton === ''}
                    />
                    <NavButton
                        text="Stores"
                        icon="fa-solid fa-car-side"
                        onClickHandler={() => handleNavigate('/store', 'stores')}
                        isActive={activeButton === 'stores'}
                    />
                    <NavButton
                        text="Shopping"
                        icon="fa-solid fa-cart-shopping"
                        onClickHandler={() => handleNavigate('/shop', 'shopping')}
                        isActive={activeButton === 'shopping'}
                    />
                    {!isLogged ? (
                        <NavButton
                            text="Log in"
                            icon="fa-solid fa-right-to-bracket"
                            onClickHandler={() => handleNavigate('/auth', 'login')}
                            isActive={activeButton === 'login'}
                        />
                    ) : (
                        <div className="mini-buttons-container">
                            <NavButton
                                text="Settings"
                                icon="fa-solid fa-gear"
                                onClickHandler={() => handleNavigate('/settings', 'settings')}
                                isActive={activeButton === 'settings'}
                            />
                            <NavButton
                                text="Log out"
                                icon="fa-solid fa-right-from-bracket"
                                onClickHandler={handleLogout}
                                isActive={activeButton === 'logout'}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showHeader && <Header />} {/* Muestra el header si showHeader es true */}
        </>
    );
};
