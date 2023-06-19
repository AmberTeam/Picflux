import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { IChat } from "../../interfaces/IDirect";
import InboxService from "../../services/InboxService";
import ChatListItem from "./ChatListItem";
import styles from "./index.module.scss";
import UserSelect from "../../components/UserSelect";

export async function inboxLoader() {
    const response = await InboxService.getUserInbox();

    const chats = response.data.inbox;
    return { chats };
}

const InboxPage: FC = () => {
    const { chats } = useLoaderData() as { chats: IChat[] };
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <div className={`container ${styles["inbox-page-container"]} ${styles.Adaptive}`}>
            <div className={styles["contacts-container"]}>
                <UserSelect chats={chats} isActive={isActive} setIsActive={setIsActive} />
                {
                    chats.map((chat: IChat) =>
                        <ChatListItem
                            chat={chat}
                            key={chat.chatid}
                            globalSeenHandler={[]}
                            default_unread={chat.unread}
                        />
                    )
                }
            </div>
            <Outlet context={{ chats, setIsActive }} />
        </div>
    );
};

export default observer(InboxPage);