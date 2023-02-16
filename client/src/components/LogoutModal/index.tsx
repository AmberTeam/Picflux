import { observer } from 'mobx-react-lite'
import {FC, useState, useEffect, useContext} from 'react'
import { Context } from '../..'
import { useTranslation } from '../../hooks/translator.hook'
import cl from './index.module.sass'

const Modal: FC = () => { 

    const [deleteDataFlag, setDeleteDataFlag] = useState<boolean>(false)
    const {store} = useContext(Context)

    const {translate} = useTranslation()

    return (
        <>
            <div className={`${cl.LModal_blurer} ${store.logoutModalActive ? cl.Active : cl.Inactive}`} onClick={() => {
                store.setLogoutModal(false)
            }}></div>
            <div className={`${cl.LModal_container} ${store.logoutModalActive ? cl.Active : cl.Inactive}`}>
                <div className={cl.Modal_inner}>
                    <h2> {translate("modal.header.title")}</h2>
                    <div className={cl.Modal_action}>
                        <div className={cl.Action_sec}>
                            <div className={cl.Radio}>
                                <input onChange={(() => setDeleteDataFlag(false))} id="yes" type="radio" name="question" checked/>
                                <label htmlFor="yes">{translate("modal.action.save")}</label>
                            </div>
                            <div className={cl.Radio}>
                                <input onChange={() => setDeleteDataFlag(true)} id="no" type="radio" name="question"/>
                                <label htmlFor="no"> {translate("modal.action.delete")} </label>
                            </div>
                        </div>
                        <div className={cl.Action_end}>
                            <button className="button" onClick={() => {
                                store.logout(deleteDataFlag)
                                store.setLogoutModal(false)
                            }}>
                                {translate("modal.action.sure")}
                            </button>
                            <button className="button" onClick={() => {
                                store.setLogoutModal(deleteDataFlag)
                                store.setLogoutModal(false)
                            }}>
                                {translate("modal.action.exit")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default observer(Modal)