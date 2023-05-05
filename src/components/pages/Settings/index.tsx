import { observer } from 'mobx-react-lite'
import cl from "./index.module.sass"

const SettingsPage = () => {
    
    return (
        <section className={`section_cls ${cl.Profile_section}`}>
            Settings
        </section>
    )
}

export default observer(SettingsPage)
