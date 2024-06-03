import { Route, Routes } from "react-router-dom";
import { Home } from '../pages/Home'
import { Settings } from "../settings/Settings";
import { Stores } from "../stores/Store";
import { StoreView } from "../stores/StoreView";
import { ListProduct } from '../shop/ListProduct'

export const Content = ({ stores }) => {

    return (
        <div className="content-container">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="settings" element={<Settings/>}/>
                <Route path="store" element={<Stores stores={stores} />} />
                <Route path="store/:id" element={<StoreView />} />
                <Route path='cart' elemnt={<ListProduct/>}/>
            </Routes>
        </div>
    )
}   