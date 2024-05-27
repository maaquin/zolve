import { Route, Routes } from "react-router-dom";
import { Home } from '../pages/Home'

export const Content = ({ }) => {

    return (
        <div className="content-container">
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    )
}   