import { FC, useContext } from "react";
import cl from './footer.module.sass'
import ic from '../../img/Icon_nav.png'
import { useTranslation } from "../../hooks/translator.hook";
import LangDropdown from "../UI/LangDropdown";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Footer: FC = () => {

    const {translate, setLanguage} = useTranslation()

    const {store} = useContext(Context)

    return (
        <footer className={cl.Footer_container}> 
            <div className={cl.Footer_header}> <img src={ic} draggable={false} width="44px" /> </div>
            <div className={cl.Footer_inners}>
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
            </div>
            <div className={cl.Footer_bottom}>
                <div className={cl.Logout}>
                    {store.isAuth && <button className={cl.Logout_btn} onClick={() => store.callLogoutModal()}>{translate("footer.bottom.logout")}</button>}
                </div>
                <div className={cl.Team}>
                    <span> Amber Team 2022 </span>
                </div>
                <div className={cl.Lang}>
                    <LangDropdown orientation={'mobile'}/> 
                </div>
            </div>
        </footer>
    )
}

export default observer(Footer)
