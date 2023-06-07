import styles from "./index.module.scss"
import { useEffect, FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ReactComponent as CloseIcon } from "../../icons/Close.svg"
import { ReactComponent as AlertIcon } from "../../icons/Alert.svg"
import store from "../../store/store"
const AlertMessage: FC = () => {
    const [currDeconfigured, setCurrDeconfigured] = useState<string>("")
    const [status, setStatus] = useState<string>("error")
    const deconfigStatusCode = (status = 0) => {
        const possibleStatus = ["error", "message, success"]
        const currentStatus = possibleStatus[status]
        setStatus(currentStatus)
        return currentStatus
    }
    const deconfigLogCode = (code: string, status = 0) => {
        const gseg = deconfigStatusCode(status)
        setCurrDeconfigured(store.lang.g[gseg][code])
    }
    useEffect(() => {
        deconfigLogCode(store.logModalConfig.code, store.logModalConfig.status)
        const timeoutid = setTimeout(() => {
            store.closeLogModal()
        }, store.logModalConfig.duration ? store.logModalConfig.duration : 10000)
        return () => clearTimeout(timeoutid)
    }, [store.logModalActive, store.lang])

    return (
        <div className={`${styles.container} ${store.logModalActive ? styles.active : ""}`}>
            <div className={styles.content}>
                {status === "message" ? <AlertIcon /> : null}
                <span className={styles.message}>{currDeconfigured}</span>
            </div>
            <button onClick={() => store.closeLogModal()} className={styles["close-button"]}>
                <CloseIcon />
            </button>
        </div>
    )
}

export default observer(AlertMessage)