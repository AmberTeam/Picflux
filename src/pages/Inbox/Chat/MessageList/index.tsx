import { useContext, useEffect, RefObject, FC, useState } from "react";
import styles from "./index.module.scss";
import { IMessage } from "../../../../interfaces/IMessage";
import { IUserMin } from "../../../../interfaces/IUser";
import Fragment from "../Fragment";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import Trigger from "../../../../components/Trigger";
import WebSocketEvents from "../../../../enums/WebSocketEvents";
import { ReactComponent as ArrowDownIcon } from "../../../../icons/ArrowDown.svg";
interface Props {
    fragments: IMessage[][]
    observer: IUserMin
    onReply: (message: IMessage) => void
    onDelete: (message: IMessage) => void
    onEdit: (message: IMessage) => void
    chatContainerRef: RefObject<HTMLDivElement>
    getPreviousMessages: () => void
    updateSeenStatus: (messages: IMessage[]) => void
    editingMessage: string | null
    onCancelEdit: () => void
}

export interface IFragment {
    id: string
    messages: IMessage[]
}

const MessageList: FC<Props> = ({ getPreviousMessages, fragments, updateSeenStatus, onEdit, onDelete, onReply, observer, chatContainerRef, editingMessage, onCancelEdit }) => {
    const { wsc } = useContext(Context);
    const [showGoDownButton, setShowGoDownButton] = useState<boolean>(false);
    useEffect(() => {
        function seenHandler(event: MessageEvent) {
            const data = JSON.parse(event.data);
            if (data.event === WebSocketEvents.Seen) {
                const payload = JSON.parse(data.payload);
                if (payload.messages?.length) {
                    updateSeenStatus(payload.messages);
                }
            }
        }
        wsc.addListener("message", seenHandler);
        return () => {
            wsc.removeListener("message", seenHandler);
        };
    }, [updateSeenStatus]);
    return (
        <div className={styles.container}>
            <div
                className={styles["chat-content"]}
                ref={chatContainerRef}
                onScroll={(event) => {
                    const threshold = -100;
                    setShowGoDownButton(event.currentTarget.scrollTop < threshold);
                }}
            >
                <div>
                    {
                        fragments.map((fragment: IMessage[]) => {
                            const inc = fragment.some(message => message.seen === 0 && message.owner !== store.user.id);

                            if (fragment.length) return (
                                <Fragment
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onReply={onReply}
                                    onCancelEdit={onCancelEdit}
                                    isFragmentSeen={!inc}
                                    fragment={fragment}
                                    observer={observer}
                                    key={fragment[0]._id}
                                    editingMessage={editingMessage}
                                />
                            );
                        })
                    }
                </div>
                <Trigger onTrigger={getPreviousMessages} />
            </div>
            <button
                className={`${styles["go-down-button"]} ${showGoDownButton ? styles.active : ""}`}
                onClick={() => {
                    chatContainerRef?.current?.scrollTo({
                        top: Number.MAX_SAFE_INTEGER,
                        behavior: "smooth"
                    });
                }}
            >
                <ArrowDownIcon className={styles["go-down-icon"]} />
            </button>
        </div>
    );
};

export default observer(MessageList);