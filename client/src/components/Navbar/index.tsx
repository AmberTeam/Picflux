import { observer } from 'mobx-react-lite'
import {FC, useContext, useEffect, useState} from 'react'
import cl from './index.module.sass'
import {Context} from "../../index"
import ic from "../../img/Icon_nav.png"
import { useLocation } from 'react-router-dom'
import { useTranslation } from '../../hooks/translator.hook'
import AllowAuth from '../AllowAuth'
import AllowNotAuth from '../AllowNotAuth'
import { useScrollDirection } from '../../hooks/sd.hook'
import { ScrollDirection } from '../../hooks/sd.hook'

const Navbar: FC = () => {
    
    const scrollDirection = useScrollDirection()

    const [navigatorDisabled, setNDisabled] = useState<boolean>(true)

    const {translate} = useTranslation()

    const {store} = useContext(Context)

    const [isAuth, setIsAuth] = useState<boolean>(false)

    const location = useLocation()

    useEffect(() => {
        if(location.pathname == '/login' || location.pathname == '/registration') setIsAuth(true)
        else setIsAuth(false)
        if(location.pathname == '/') setNDisabled(false)
        else if(navigatorDisabled) setNDisabled(true)
    }, [location])

    if(isAuth) return <a href="/" className={cl.Return_btn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        {translate("navbar.returner")}
    </a>

    return (
        <>
            <div className={`${cl.Navbar} ${scrollDirection === ScrollDirection.down ? cl.Down : cl.Up}`}>
                <div className={cl.Navbar_space}></div>
                <div className={cl.Navbar_promo}>
                    <div className={cl.Amber}>
                        <img className={cl.Icon} src={ic} width="32"/>
                        <span className={cl.Name}> imber </span>
                    </div>
                    <div className={cl.Opts}>
                        <div className={cl.Route}>
                            <a href="/"> {translate("navbar.opts.home")}</a>
                        </div>
                    </div>
                    <AllowAuth>
                        <a className={cl.Profile} href={`/profile/${store.user.id}/preview`}>
                            <img className={cl.Icon} src={store.user.avatar} width="32px"/>
                        </a>
                    </AllowAuth>
                    <AllowNotAuth>
                        <div className={cl.Btns_container}>
                            <a href="/login" className={`${cl.Auth_btn} ${cl.Login_btn}`}>
                                {translate("navbar.unauth.opts.login")}
                            </a>
                        </div>
                    </AllowNotAuth>
                </div>
                <div className={cl.Navbar_space}></div>
            </div>
            <div className={`${cl.Navbar_navigator} ${scrollDirection === ScrollDirection.down ? cl.Down : cl.Up}`} style={{display: navigatorDisabled ? 'none' : 'flex'}}>
                <div className={cl.Navigator_content}>
                    <div className={cl.Navigator_links}>
                        <div className={cl.Navigator_link}>
                            <a href="#">Главная</a>
                        </div>
                        <AllowAuth>
                            <div className={cl.Navigator_link}>
                                <a href="#">Профилль</a>
                            </div>      
                        </AllowAuth>
                        <div className={cl.Navigator_link}>
                            <a href="#">Настройки</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(Navbar)