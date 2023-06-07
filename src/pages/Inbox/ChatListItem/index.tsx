import { observer } from "mobx-react-lite"
import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../.."
import { IChat } from "../../../interfaces/IDirect"
import { toJS } from "mobx"
import styles from "./index.module.scss"
import { IMessage } from "../../../interfaces/IMessage"
import WebSocketEvents from "../../../enums/WebSocketEvents"
import WebSocketActions from "../../../enums/WebSocketActions"
import store from "../../../store/store"
import { NavLink } from "react-router-dom"

interface IChatListItemProps {
    chat: IChat
    globalSeenHandler: IMessage[]
    default_unread: IMessage[]
}

const ChatListItem: FC<IChatListItemProps> = (props: IChatListItemProps) => {
    const { wsc } = useContext(Context)
    const [online, setOnline] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<IMessage[]>(props.default_unread ?? [])
    useEffect(() => {
        if (store.isSocketAuth && props.chat.members.length) {
            if (props.chat.members[0].status) setOnline(props.chat.members[0].status === 1 ? true : false)
            const handler = (event: MessageEvent) => {
                if (event.data.type === WebSocketEvents.UpdateUserStatus) {
                    if (event.data.payload.uid === props.chat.members[0].id) setOnline(true)
                }
            }
            wsc.addListener("message", handler)
            wsc.send(WebSocketActions.InitializeSession, { uid: props.chat.members[0].id })
        }
    }, [store.isSocketAuth])

    useEffect(() => {
        if (store.alert) {
            const alert_js: any = toJS(store.alert)
            if (alert_js.tag === "msg" && alert_js.chatid === props.chat.chatid && alert_js.owner === props.chat.members[0].id) {
                store.pushChatMessage(props.chat.chatid, alert_js)
                setAlerts([...alerts, alert_js])
            }
        }
    }, [store.alert])

    useEffect(() => {
        if (props.globalSeenHandler && alerts.length) {
            const gsi = props.globalSeenHandler.map((msg: IMessage) => msg._id)
            const result: IMessage[] = []
            for (let i = 0; i < alerts.length; i++) {
                if (alerts[i] && !gsi.includes(alerts[i]._id)) result.push(alerts[i])
            }
            setAlerts(result)
        }
    }, [props.globalSeenHandler])


    return (
        <NavLink
            className={({ isActive }) => `${styles["chat-list-item-container"]} ${isActive ? styles.Active : styles.Default}`}
            to={`/inbox/${props.chat.chatid}`}
        >
            <div className={styles["chat-list-item-profile"]}>
                <div className={styles.avatar}>
                    <img src={props.chat.members[0].avatar} draggable={false} className={styles["profile-avatar"]} />
                </div>
                <div className={styles.content}>
                    <div className={styles["profile-username"]}>
                        {props.chat.members[0].username}
                    </div>
                    <div className={`${styles["profile-status"]} ${online ? styles.active : styles.default}`}>
                        {online ? store.lang.g.statuses.online : store.lang.g.statuses.offline}
                    </div>
                </div>
            </div>
            {
                alerts.length > 0 && <div className={styles["chat-list-item-alerts"]}>
                    {alerts.length}
                </div>
            }
        </NavLink>
    )
}

export default observer(ChatListItem)