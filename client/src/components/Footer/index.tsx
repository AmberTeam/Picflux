import { FC, useContext, useEffect, useState } from "react"
import cl from './footer.module.sass'
import ic from '../../img/Icon_nav.png'
import { useTranslation } from "../../hooks/translator.hook"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { useLocation } from "react-router-dom"
import amber_down from "../../img/amber_png_down.png"
import { useResizeHandler } from "../../hooks/resizehandler.hook"

const Footer: FC = () => {

    const {translate, setLanguage} = useTranslation()
    const [primary, setPrimary] = useState<boolean>(false)
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
    const location = useLocation()

    useResizeHandler((w) => {
        setInnerWidth(w)
    })

    const {store} = useContext(Context)

    useEffect(() => {
        if(location.pathname.includes('film') || location.pathname.includes('login') || location.pathname.includes('registration'))
            setPrimary(true)
        else 
            setPrimary(false)
    }, [location])

    return (
        <footer className={`${cl.Footer_container} ${primary ? cl.Primary : ""}`}> 
            <div className={cl.Footer_header}> 
                <span></span>
                <div className={cl.Amber_logo}>
                    <img src={amber_down} className={cl.Logo}/>
                </div>
                <div className={cl.Online}>
                    <span className={cl.Online_dot}></span>
                    <span className={cl.Online_text}>{store.online.length}</span>
                </div>
            </div>
            <div className={cl.Footer_inners}>
                {
                    innerWidth >= 1100 
                        ?
                        <>
                            <div className={cl.Footer_inner}>
                                <div className={cl.Content}> 
                                    <div> <a href="/FAQ">{translate("footer.inner.1.FAQ")}</a></div>
                                    <div> <a href="/MC">{translate("footer.inner.1.MC")}</a> </div>
                                </div>
                            </div>
                            <div className={cl.Footer_inner}>
                                <div className={cl.Content}> 
                                    <div> <a href="/I">{translate("footer.inner.2.I")}</a> </div> 
                                    <div> <a href="/AU">{translate("footer.inner.2.AU")}</a> </div>
                                    <div> <a href="/WIS">{translate("footer.inner.2.WIS")}</a> </div>         
                                </div>
                            </div>
                            <div className={cl.Footer_inner}>
                                <div className={cl.Content}>
                                    <div> <a href="/account">{translate("footer.inner.3.account")}</a> </div>
                                    <div> <a href="/privacy">{translate("footer.inner.3.privacy")}</a></div>
                                    <div> <a href="/CP">{translate("footer.inner.3.CP")}</a></div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={cl.Footer_inner}>
                                <div className={cl.Content}> 
                                    <div> <a href="/FAQ">{translate("footer.inner.1.FAQ")}</a></div>
                                    <div> <a href="/MC">{translate("footer.inner.1.MC")}</a> </div>
                                    <div> <a href="/account">{translate("footer.inner.3.account")}</a> </div>
                                    <div> <a href="/privacy">{translate("footer.inner.3.privacy")}</a></div>
                                </div>
                            </div>
                            <div className={cl.Footer_inner}>
                                <div className={cl.Content}> 
                                    <div> <a href="/I">{translate("footer.inner.2.I")}</a> </div> 
                                    <div> <a href="/AU">{translate("footer.inner.2.AU")}</a> </div>
                                    <div> <a href="/WIS">{translate("footer.inner.2.WIS")}</a> </div>  
                                    <div> <a href="/CP">{translate("footer.inner.3.CP")}</a></div>       
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className={cl.Footer_bottom}>
                <div className={cl.Logout}>
                </div>
                <div className={cl.Team}>
                    <span> Amber Team 2023. </span> <span> Cimber v1.0.1 </span>
                </div>
                <div className={cl.Lang}>
                </div>
            </div>
        </footer>
    )
}

export default observer(Footer)
