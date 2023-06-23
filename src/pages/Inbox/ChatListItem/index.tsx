import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { IChat } from "../../../interfaces/IDirect";
import styles from "./index.module.scss";
import { IMessage } from "../../../interfaces/IMessage";
import WebSocketEvents from "../../../enums/WebSocketEvents";
import WebSocketActions from "../../../enums/WebSocketActions";
import store from "../../../store/store";
import { NavLink } from "react-router-dom";

interface IChatListItemProps {
    chat: IChat
    notReadMessages: IMessage[]
}

const ChatListItem: FC<IChatListItemProps> = ({ chat, notReadMessages }) => {
    const { wsc } = useContext(Context);
    const [online, setOnline] = useState<boolean>(false);

    useEffect(() => {
        if (store.isSocketAuth && chat.members.length) {
            if (chat.members[0].status) setOnline(!!chat.members[0].status);
            const handler = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.event === WebSocketEvents.UpdateUserStatus) {
                    const payload = JSON.parse(data.payload);
                    if (payload.uid === chat.members[0].id) setOnline(true);
                }
            };
            wsc.addListener("message", handler);
            wsc.send(WebSocketActions.InitializeSession, { uid: chat.members[0].id });
            return () => {
                wsc.removeListener("message", handler);
            };
        }
    }, [store.isSocketAuth]);

    return (
        <NavLink
            className={({ isActive }) => {
                return `${styles["chat-list-item-container"]} ${isActive ? styles.active : ""}`;
            }}
            to={`/inbox/${chat.chatid}`}
        >
            <div className={styles["chat-list-item-profile"]}>
                <div className={styles.avatar}>
                    <img src={chat.members[0].avatar} draggable={false} className={styles["profile-avatar"]} />
                </div>
                <div className={styles.content}>
                    <div className={styles["profile-username"]}>
                        {chat.members[0].username}
                    </div>
                    <div className={`${styles["profile-status"]} ${online ? styles.active : ""}`}>
                        {online ? store.lang.g.statuses.online : store.lang.g.statuses.offline}
                    </div>
                </div>
            </div>
            {notReadMessages.length ? 
                <div className={styles["chat-list-item-alerts"]}>
                    {notReadMessages.length}
                </div>
                : null
            }
        </NavLink>
    );
};

export default observer(ChatListItem);