import {FC, useEffect, useState} from 'react'
import cl from './index.module.sass'
import en from '../../../img/lang_ic/en.png'
import ru from '../../../img/lang_ic/ru.png'
import ukr from '../../../img/lang_ic/ukr.png'

interface IFlagDetector {
    lang: string
    variant: string
}

const FlagDetector: FC<IFlagDetector> = ({...props}) => {

    const [flag, setFlag] = useState<any>()

    useEffect(() => {
        switch(props.lang) {
            case "en": 
                setFlag(en)
                break
            case "ru": 
                setFlag(ru)
                break 
            case "ukr":
                setFlag(ukr)
        }
    }, [])

    return <div className={`${cl.Flag_detector__container}`}><img src={flag}/></div>
}

export default FlagDetector