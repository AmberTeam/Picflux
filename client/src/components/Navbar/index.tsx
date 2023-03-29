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
import LangDropdown from '../UI/LangDropdown'
import ThemeTumbler from '../UI/ThemeTumbler'
import amber_down from "../../img/amber_png_down_cropped.png"

const Navbar: FC = () => {
    
    const scrollDirection = useScrollDirection()

    const {translate} = useTranslation()

    const {store} = useContext(Context)

    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [navigatorActive, setNavigatorActive] = useState<boolean>(false)

    const location = useLocation()

    useEffect(() => {
        if(location.pathname == '/login' || location.pathname == '/registration') setIsAuth(true)
        else setIsAuth(false)
    }, [location])


    useEffect(() => {

    }, [navigatorActive])

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
                        <a href='/' title={translate("navbar.opts.home")}>
                            <img className={cl.Amber_logo} src={amber_down}/>
                        </a>
                    </div>
                    <button className={cl.Burger_container} onClick={() => setNavigatorActive(!navigatorActive)}>
                        <span className={`${cl.Line} ${cl.Top}`}></span>
                        <span className={`${cl.Line} ${cl.Middle}`}></span>
                        <span className={`${cl.Line} ${cl.Bottom}`}></span>
                    </button>
                </div>
                <div className={cl.Navbar_space}></div>
            </div>
            <div className={`${cl.Navigator_container} ${navigatorActive ? cl.Active : ""}`}>
                <div className={`${cl.Blurer} ${navigatorActive ? cl.Active : ""}`} onClick={() => setNavigatorActive(false)}></div>
                <div className={cl.Navigator_content}>
                    <div className={cl.Navigator_main}>
                        <div className={cl.Navigator_header}>
                            <div className={cl.Header_account}>
                                <AllowAuth>
                                    <div className={cl.Account_content}>
                                        <a className={cl.Profile} href={`/profile/${store.user.id}/preview`}>
                                            <img className={cl.Icon} src={store.user.avatar} width="32px"/>
                                        </a>
                                        <button className="button_mini" onClick={() => store.callLogoutModal()}>{translate("footer.bottom.logout")}</button>
                                    </div>
                                </AllowAuth>
                                <AllowNotAuth>
                                    <div className={cl.Btns_container}>
                                        <a href="/login" className={`${cl.Auth_btn} ${cl.Login_btn}`}>
                                            {translate("navbar.unauth.opts.login")}
                                        </a>
                                    </div>
                                </AllowNotAuth>
                            </div>
                            <button className={cl.Header_exec} onClick={() => setNavigatorActive(!navigatorActive)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className={cl.HR}></div>
                        <div className={cl.Navigator_body}>
                            <AllowAuth>
                                <>
                                    <a className={cl.Navigator_link} href="/">
                                        {translate("navbar.opts.home")}
                                    </a>
                                    <a className={cl.Navigator_link} href={`/profile/${store.user.id}/preview`}>
                                        {translate("navbar.opts.profile")}
                                    </a>
                                    <a className={cl.Navigator_link} href="/inbox/overview">
                                        Chat
                                    </a>
                                </>
                            </AllowAuth>
                        </div>
                    </div>
                    <div className={cl.Navigator_bottom}>
                        <div className={cl.Controlls}>
                            <LangDropdown/>
                            <ThemeTumbler/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(Navbar)