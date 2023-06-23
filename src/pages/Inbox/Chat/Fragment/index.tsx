import { FC, useContext, useCallback } from "react";
import styles from "./index.module.scss";
import { IMessage } from "../../../../interfaces/IMessage";
import Message from "../Message";
import { IUserMin } from "../../../../interfaces/IUser";
import InboxService from "../../../../services/InboxService";
import { Context } from "../../../..";
import WebSocketActions from "../../../../enums/WebSocketActions";
import store from "../../../../store/store";
import { useParams } from "react-router-dom";
import Trigger from "../../../../components/Trigger";
import { observer } from "mobx-react-lite";

interface Props {
    fragment: IMessage[]
    observer: IUserMin
    isFragmentSeen: boolean
    onReply: (arg: IMessage) => void
    onDelete: (arg: IMessage) => void
    onEdit: (arg: IMessage) => void
    editingMessage: string | null
    onCancelEdit: () => void
}

const Fragment: FC<Props> = ({ fragment, observer, isFragmentSeen, onReply, onDelete, onEdit, editingMessage, onCancelEdit }) => {
    const params = useParams<"id">();
    const { wsc } = useContext(Context);

    const updateSeenStatus = useCallback(async (): Promise<void> => {
        if (params.id && !isFragmentSeen) {
            InboxService.updateSeen(params.id, JSON.stringify(fragment));
            const messages = fragment.filter(message => {
                return message.owner !== store.user.id && message.seen === 0;
            });
            wsc.send(WebSocketActions.Seen, {
                chatid: params.id,
                messages: messages
            });
        }
    }, [fragment, params.id, store.user.id, isFragmentSeen]);
    return (
        <div
            className={styles["fragment-container"]}
        >
            {
                fragment.map((message: IMessage) =>
                    <Message 
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onReply={onReply}
                        onCancelEdit={onCancelEdit}
                        observer={observer}
                        message={message}
                        key={message._id}
                        isBeingEdited={editingMessage === message._id}
                    />
                )
            }
            <Trigger onTrigger={updateSeenStatus} />
        </div>
    );
};

export default observer(Fragment);