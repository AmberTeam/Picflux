import { observer } from "mobx-react-lite";
import { FC, useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { IChat } from "../../interfaces/IDirect";
import InboxService from "../../services/InboxService";
import ChatListItem from "./ChatListItem";
import styles from "./index.module.scss";
import UserSelect from "../../components/UserSelect";
import { INotReadMessages } from "../../interfaces/IMessage";
export async function inboxLoader() {
    const response = await InboxService.getUserInbox();
    const chats = response.data.inbox;
    return { chats };
}

const InboxPage: FC = () => {
    const { chats } = useLoaderData() as { chats: IChat[] };
    const [isActive, setIsActive] = useState<boolean>(false);
    const [notReadMessages, setNotReadMessages] = useState<INotReadMessages>({});

    useEffect(() => {
        setNotReadMessages(previousNotReadMessages => {
            const newNotReadMessages = {...previousNotReadMessages};
            chats.forEach(chat => {
                if(!newNotReadMessages[chat.chatid]){
                    newNotReadMessages[chat.chatid] = chat.unread;
                }
            });
            return newNotReadMessages;
        });
    }, [chats]);
    return (
        <div className={`container ${styles["inbox-page-container"]} ${styles.Adaptive}`}>
            <div className={styles["contacts-container"]}>
                <UserSelect chats={chats} isActive={isActive} setIsActive={setIsActive} />
                {
                    chats.map((chat: IChat) => (
                        <ChatListItem
                            chat={chat}
                            key={chat.chatid}
                            notReadMessages={notReadMessages[chat.chatid] ?? []}
                        />
                    ))
                }
            </div>
            <Outlet context={{ chats, setIsActive, setNotReadMessages }} />
        </div>
    );
};

export default observer(InboxPage);