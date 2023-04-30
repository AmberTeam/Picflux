import {FC, useContext, useEffect} from 'react'
import RegistrationPage from './components/pages/Auth/Registration'
import LoginPage from './components/pages/Auth/Login'
import HomePage from './components/pages/Home'
import {Context} from "./index"
import {observer} from "mobx-react-lite"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import LogModal from './components/LogModal'
import FilmPage from './components/pages/Film'
import ProfilePage from './components/pages/Profile'
import SettingsPage from './components/pages/Settings'
import UndefinedRoutePage from './components/pages/UndefRoute'
import Footer from './components/Footer'
import LogoutModal from './components/LogoutModal'
import InboxPage from "./components/pages/Inbox"
import "./sass/index.sass"
import $api from './http' 


const App: FC = () => {
    const {store, wsc} = useContext(Context)

    const setTilestamp = async (): Promise<void> => {
        try {
            await $api.get('/user/tsp')
        } catch(e) {
            console.log("Could not set timestamp.")
        }
    }

    const initSocketConnection = async (): Promise<void> => {
        const conn:Event = await wsc.init(`ws://localhost:5000/wsedge?token=${localStorage.getItem('token')}`)
        if(conn.isTrusted) {
            wsc.initListeners()
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) store.checkAuth()
        if(localStorage.getItem('lang')) store.checkLang()
        else store.setDefaultLang()
        if(localStorage.getItem('theme')) store.checkTheme()
        else store.setDefaultLang()
        //initSocketConnection()
    }, [])

    useEffect(() => {
        if(store.isAuth) {
            setTilestamp()
            initSocketConnection()
            //wsc.send('authorize', {uid: store.user.id})
            store.setSocketAuth(true)
            wsc.addListener('push-alert', (e:any) => {
                store.pushAlert(e.payload)
            })
        }
    }, [store.isAuth])

    if (store.isLoading || !store.lang_ready) {
        return <div>Загрузка...</div>
    }

    return (
        <div data-theme={store.theme} className="app">
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
                            <Route path="/profile">
                                <Route path=":id/preview" element={<ProfilePage/>}/>
                                <Route path="settings" element={<SettingsPage/>}/>
                                <Route path="*" element={<UndefinedRoutePage/>}/>
                            </Route>
                            <Route path="/inbox">
                                <Route path=":id" element={<InboxPage/>}/>
                            </Route>
                        </>
                    } 
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default observer(App)
