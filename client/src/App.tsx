import React, {FC, useContext, useEffect, useState} from 'react'
import RegistrationPage from './components/pages/Auth/Registration'
import LoginPage from './components/pages/Auth/Login'
import HomePage from './components/pages/Home'
import {Context} from "./index"
import {observer} from "mobx-react-lite"
import {IUser} from "./models/IUser"
import UserService from "./services/UserService"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import LogModal from './components/LogModal'
import FilmPage from './components/pages/Film'
import ProfilePage from './components/pages/Profile'
import Footer from './components/Footer'
import LogoutModal from './components/LogoutModal'

const client = new WebSocket('ws://127.0.0.1:5001');

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        if(localStorage.getItem('lang')) {
            store.checkLang()
        } else { 
            store.setDefaultLang()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <LogoutModal/>
            <LogModal/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/film/:id" element={<FilmPage/>}/>
                {
                    !store.isAuth ? 
                    <>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>
                    </>
                    :
                    <>
                        <Route path="/registration" element={<Navigate to="/"/>}/>
                        <Route path="/login" element={<Navigate to="/"/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </>
                }     
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default observer(App)
