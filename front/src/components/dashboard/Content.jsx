import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Home } from '../pages/Home'
import { Settings } from "../settings/Settings";
import { Stores } from "../stores/Store";
import { StoreView } from "../stores/StoreView";
import { Someone } from '../pages/Someone';
import { You } from '../pages/You';
import { WhatZolve } from "../pages/WhatZolve";
import { FinishZolve } from "../pages/FinishZolve";
import { Cart } from "../pages/ShoppingCart";

export const Content = ({ stores }) => {
=======

export const Content = ({ }) => {
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

    return (
        <div className="content-container">
            <Routes>
<<<<<<< HEAD
                <Route path='/' element={<Home/>} />
                <Route path='/someone' element={<Someone/>} />
                <Route path='/you' element={<You/>} />
                <Route path='/whatProblem?' element={<WhatZolve/>} />
                <Route path='/finalPage' element={<FinishZolve/>} />
                <Route path="settings" element={<Settings/>}/>
                <Route path="/store" element={<Stores stores={stores} />} />
                <Route path="/store/:id" element={<StoreView />} />
                <Route path='/shop' element={<Cart/>} />
=======
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
            </Routes>
        </div>
    )
}   