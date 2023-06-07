import { FC, useEffect, useState } from "react"
import languagesConfiguration from "../../lang_packets/config/global"
import styles from "./index.module.scss"
import { observer } from "mobx-react-lite"
import store from "../../store/store"
import Language from "../../enums/Language"

interface ILanguageInformation {
    name: Language
    icon: string
    active?: boolean
}

const LanguageSettings: FC = () => {
    const [languages, setLanguages] = useState<ILanguageInformation[]>([])
    useEffect(() => {
        setLanguages((languagesConfiguration.langs_available as ILanguageInformation[]).map((lang: ILanguageInformation) => {
            return {
                ...lang,
                active: lang.name === store.lang.packet_name
            }
        }))
    }, [store.lang])

    return (
        <div className={styles["languages-container"]}>
            {languages.map((language: ILanguageInformation) => {
                return (
                    <img key={language.name} className={`${styles["language-icon"]} ${language.active ? styles.active : ""}`} onClick={() => store.setLanguage(store.getLanguageTexts(language.name))} src={language.icon} />
                )
            })}
        </div>
    )
}

export default observer(LanguageSettings)