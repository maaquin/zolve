import { useState } from "react"
import { Login } from '../../components/Login'
import { Register } from '../../components/Register'
import { CheckEmail } from '../../components/auth/ConfirmEmail'
import { NewUser } from '../../components/auth/NewUser'
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Botones } from '../../components/auth/Botones';
=======
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handlerAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
<<<<<<< HEAD
    <div>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="auth-container">
              {isLogin ? (
                <Login switchAuthHandler={handlerAuthPageToggle} />
              ) : (
                <Register switchAuthHandler={handlerAuthPageToggle} />
              )}
            </div>
          </div>
        } />
      </Routes>
      <div className="container-extra">
        <Routes>
          <Route path='/confirm' element={<CheckEmail />} />
          <Route path='/confirme' element={<Botones />} />
          <Route path='/store-owner' element={<NewUser />} />
        </Routes>
      </div>
    </div>
  )
}
=======
    <div className="container">
      <Routes>
        <Route path="/" element={
          <div className="auth-container">
            {isLogin ? (
              <Login switchAuthHandler={handlerAuthPageToggle} />
            ) : (
              <Register switchAuthHandler={handlerAuthPageToggle} />
            )}
          </div>
        } />
        <Route path='/confirm' element={<CheckEmail/>} />
        <Route path='/confirme' element={<NewUser/>}/>
      </Routes>
    </div>
  )
}
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
