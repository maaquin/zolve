import { useState } from "react"
import { Login } from '../../components/Login'
import { Register } from '../../components/Register'
import { CheckEmail } from '../../components/auth/ConfirmEmail'
import { NewUser } from '../../components/auth/NewUser'
import { Route, Routes } from "react-router-dom";

import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handlerAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
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
