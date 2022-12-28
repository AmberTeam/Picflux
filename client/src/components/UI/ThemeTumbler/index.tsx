import { observer } from "mobx-react-lite"
import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../.."
import cl from "./index.module.sass"

const ThemeTumbler: FC = () => {

    const {store} = useContext(Context)

    const [theme, setTheme] = useState<string>()

    const changeActive = (_theme: string) => {
        setTheme(_theme)
        store.setTheme(_theme)
    }

    useEffect(() => {
        setTheme(store.theme)
    }, [store.theme])

    if(!theme) return <></>

    return (
        <div className={cl.Tumblr_container} onClick={() => changeActive(theme == 'light' ? 'dark' : 'light')}>
            <div className={`${cl.Switcher} ${theme == 'dark' ? cl.Active : cl.Inactive}`}></div>
        </div>
    )
}

export default observer(ThemeTumbler)