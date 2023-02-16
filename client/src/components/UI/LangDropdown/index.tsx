import {FC, useEffect, useState} from "react"
import gconfig from "../../../lang_packets/config/global.json"
import en_img from "../../../img/lang_ic/en.png"
import ru_img from "../../../img/lang_ic/ru.png"
import ukr_img from "../../../img/lang_ic/ukr.png"
import cl from "./index.module.sass"
import { useTranslation } from "../../../hooks/translator.hook"
import { observer } from "mobx-react-lite"
import { useResizeHandler } from "../../../hooks/resizehandler.hook"

interface ILangDropdown {
    orientation?: string
}

const LangDropdown: FC<ILangDropdown> =  ({...props}) => {

    const {setLanguage, currLang, decodeLangPackByName} = useTranslation()

    const [fAvailableLangs, setfAvailableLangs] = useState<any []>([])
    const [fLangs, setfLangs] = useState<any[]>([])
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        setfAvailableLangs(gconfig.langs_available.filter(lang => lang.name !== currLang.packet_name))
        let fLangs = [] as any
        gconfig.langs_available.map((lang: any) => {
            const isActive = lang.name === currLang.packet_name
            return fLangs.push({
                ...lang,
                active: isActive
            })
        })
        setfLangs([...fLangs])
    }, [currLang])

    useResizeHandler((width) => {
        setInnerWidth(width)
    })

    return (
        <div className={cl.Dropdown_oriented}>
            {fLangs.map((lang: any) => {
                const _lang = decodeLangPackByName(lang.name)
                return (
                    <div className={cl.Lang} key={lang.name}>
                        <img className={`${lang.active ? cl.Active : ""}`} onClick={() => setLanguage(lang.name)} src={_lang.img}/>
                    </div>
                )
            })}
        </div>
    )
}

export default observer(LangDropdown)