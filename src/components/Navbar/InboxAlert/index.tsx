import { FC, ReactNode } from "react"
import IAlert from "../../../interfaces/IAlert"
import styles from "./index.module.scss"
import TimeVisualizator from "../../TimeVisualizator"
import Alert from "../../../enums/Alert"

const InboxAlert: FC<IAlert> = ({ tag, owner, timestamp }) => {

    const renderCustomInboxMessage = (): ReactNode => {
        switch (tag) {
            case Alert.Subscribed:
                return (
                    <div>
                        Subscribed to you :/
                    </div>
                )
            default:
                return <></>
        }
    }

    return (
        <div className={styles["inbox-alert-container"]}>
            <div className={styles["inbox-alert-intro"]}>
                <div className={styles["inbox-alert-content"]}>
                    <img className={styles["inbox-alert-avatar"]} src={owner.avatar} />
                    <span className={styles["inbox-alert-username"]}>
                        {owner.username}
                    </span>
                </div>
                <div className={styles["inbox-alert-time"]}>
                    <TimeVisualizator time={timestamp} />
                </div>
            </div>
            <div className={styles["inbox-alert-content"]}>
                {renderCustomInboxMessage()}
            </div>
        </div>
    )
}

export default InboxAlert