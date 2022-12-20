import cl from './modal.module.sass'
import {useContext, useEffect, FC, useState} from 'react'
import {Context} from '../../index'
import { observer } from 'mobx-react-lite'
import { useTranslation } from '../../hooks/translator.hook'

const LogModal: FC = () => {

    const [currDeconfigured, setCurrDeconfigured] = useState<string>("")

    const {store} = useContext(Context)
    const {translate, currLang} = useTranslation()
    const [active, setActive] = useState<boolean>(false)

    const deconfigLogCode = (code: string) => {
        setCurrDeconfigured(translate(`g.error.${code}`))
    }

    const autoclose = () => {
        setTimeout(() => {
            store.closeLogModal()
            setActive(false)
        }, 10000)
    }

    useEffect(() => {
        setActive(store.logModalActive)
        deconfigLogCode(store.logModalConfig.code)
        autoclose()
    }, [store.logModalActive, currLang])

    return (
        <div className={`${cl.Modal_container} ${active ? cl.Active : ""}`}>
            <span className={cl.Message}> {currDeconfigured} </span>
            <button onClick={() => store.closeLogModal()} className={cl.Close_btn}>
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" width="20px" height="20px" viewBox="0 0 24 24">
                    <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/>
                </svg>
            </button>
        </div>
    )
}

export default observer(LogModal)