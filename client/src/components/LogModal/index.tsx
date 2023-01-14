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
    const [status, setStatus] = useState<string>('error')

    const deconfigStatusCode = (status: number = 0) => {
        switch(status) {
            case 0: 
                setStatus('error')
                return 'error'
            case 1:
                setStatus('message')
                return 'message'
            case 2:
                setStatus('success')
                return 'success'
            
        } 
    }

    const deconfigLogCode = (code: string, status: number = 0) => {
        var gseg = deconfigStatusCode(status)
        setCurrDeconfigured(translate(`g.${gseg}.${code}`))
    }

    const autoclose = () => {
        setTimeout(() => {
            store.closeLogModal()
            setActive(false)
        }, 10000)
    }

    useEffect(() => {
        setActive(store.logModalActive)
        deconfigLogCode(store.logModalConfig.code, store.logModalConfig.status)
        autoclose()
    }, [store.logModalActive, currLang])

    return (
        <div className={`${cl.Modal_container} ${active ? cl.Active : ""} ${`${status}_log`}`}>
            <div className={cl.Content}>
                {
                    status === 'message' &&
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                    </svg>
                }
                <span className={cl.Message}> {currDeconfigured} </span>
            </div>
            <button onClick={() => store.closeLogModal()} className={cl.Close_btn}>
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" width="20px" height="20px" viewBox="0 0 24 24">
                    <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/>
                </svg>
            </button>
        </div>
    )
}

export default observer(LogModal)