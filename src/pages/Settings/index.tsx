import { observer } from "mobx-react-lite"
import styles from "./index.module.scss"

const SettingsPage = () => {
    return (
        <section className={`section_cls ${styles["profile-container"]}`}>
            Settings
        </section>
    )
}

export default observer(SettingsPage)
