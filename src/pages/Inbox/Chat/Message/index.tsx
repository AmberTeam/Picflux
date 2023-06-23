import { FC, useState } from "react";
import { IMessage } from "../../../../interfaces/IMessage";
import styles from "./index.module.scss";
import { IUserMin } from "../../../../interfaces/IUser";
import store from "../../../../store/store";
import { ReactComponent as OneTickIcon } from "../../../../icons/OneTick.svg";
import { ReactComponent as TwoTicksIcon } from "../../../../icons/TwoTicks.svg";
import { ReactComponent as MoreIcon } from "../../../../icons/More.svg";
import { ReactComponent as ReplyIcon } from "../../../../icons/Reply.svg";
import { ReactComponent as DeleteIcon } from "../../../../icons/Delete.svg";
import { ReactComponent as EditMessageIcon } from "../../../../icons/EditMessage.svg";
import { ReactComponent as CancelIcon } from "../../../../icons/Close.svg";
import { observer } from "mobx-react-lite";
interface IMessageProps {
    message: IMessage
    observer: IUserMin
    onReply: (arg: IMessage) => void
    onDelete: (arg: IMessage) => void
    onEdit: (arg: IMessage) => void
    isBeingEdited: boolean
    onCancelEdit: () => void
}

const Message: FC<IMessageProps> = ({ observer, message, onReply, onDelete, onEdit, isBeingEdited, onCancelEdit }) => {
    const [controllerActive, setControllerActive] = useState<boolean>(false);
    return (
        <div
            className={`${styles["message-container"]} ${message.owner === store.user.id ? styles["own-message"] : ""}`}
            id={message._id}
        >
            <img
                draggable={false}
                onDragStart={() => false}
                src={message.owner === store.user.id ? store.user.avatar : observer.avatar}
                className={styles["message-user-avatar"]}
            />
            <div className={`${styles["message-data"]} ${isBeingEdited ? styles["editing"] : ""}`}>
                {message.refer && typeof message.refer !== "string" ?
                    <div className={styles["reply-container"]}>
                        <span className={styles["reply-username"]}>{message.refer.owner === store.user.id ? store.user.username : observer.username}</span>
                        <span className={styles["reply-message"]}>{message.refer.payload}</span>
                    </div>
                    : null
                }
                <div className={styles["message"]}>
                    <span>{message.payload}</span>
                    <div className={styles["message-details"]}>
                        {
                            message.owner === store.user.id ?
                                message.seen
                                    ?
                                    <TwoTicksIcon className={styles["message-status-icon"]} />
                                    :
                                    <OneTickIcon className={styles["message-status-icon"]} />
                                : null
                        }
                    </div>
                </div>
            </div>
            <div className={`${styles["message-actions-container"]} ${controllerActive ? styles.active : ""}`}>
                {controllerActive ?
                    <div className={styles["message-actions"]}>
                        <button
                            title={store.lang.inbox.chat.message.title.repl}
                            className={styles.action}
                            onClick={() => {
                                onReply(message);
                                setControllerActive(false);
                            }}
                        >
                            <ReplyIcon className={styles["action-icon"]} />
                        </button>
                        {
                            message.owner === store.user.id &&
                            <>
                                <button
                                    title={store.lang.inbox.chat.message.title.del}
                                    className={styles.action}
                                    onClick={() => {
                                        onDelete(message);
                                        setControllerActive(false);
                                    }}
                                >
                                    <DeleteIcon className={styles["action-icon"]} />
                                </button>
                                <button
                                    title={store.lang.inbox.chat.message.title.edit}
                                    className={styles.action}
                                    onClick={() => {
                                        onEdit(message);
                                        setControllerActive(false);
                                    }}
                                >
                                    <EditMessageIcon className={styles["action-icon"]} />
                                </button>
                            </>
                        }
                        <button
                            title={store.lang.inbox.chat.message.title.cl}
                            className={styles.action}
                            onClick={() => setControllerActive(false)}
                        >
                            <CancelIcon className={styles["action-icon"]} />
                        </button>
                    </div>
                    :
                    <button
                        className={`${styles.action} ${styles["more-action"]}`}
                        onClick={() => setControllerActive(true)}
                    >
                        <MoreIcon className={styles["action-icon"]} />
                    </button>
                }
            </div>
        </div>
    );
};

export default observer(Message);