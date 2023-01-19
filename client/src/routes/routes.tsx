import React, {FC, useContext, useEffect, useState} from 'react'
import RegistrationPage from '../components/pages/Auth/Registration'
import LoginPage from '../components/pages/Auth/Login'
import HomePage from '../components/pages/Home'
import {Context} from "../index"
import {observer} from "mobx-react-lite"
import {IUser} from "../models/IUser"
import UserService from "../services/UserService"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import Modal from '../components/LogModal'
import FilmPage from '../components/pages/Film'
import ProfilePage from '../components/pages/Profile'


const Routes_ = () => {

    const {store} = useContext(Context)

    return (
        <>
        <Navbar/>
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
                        <Route path="/profile/:id" element={<ProfilePage/>}/>
                    </>
                }
            </Routes>
        </>
    )
}

export default observer(Routes_)