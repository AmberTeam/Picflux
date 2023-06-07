import { FC, useContext, useCallback } from "react"
import { IFragment } from "../MessageList"
import styles from "./index.module.scss"
import { IMessage } from "../../../../interfaces/IMessage"
import Message from "../Message"
import { IUserMin } from "../../../../interfaces/IUser"
import InboxService from "../../../../services/InboxService"
import { Context } from "../../../.."
import WebSocketActions from "../../../../enums/WebSocketActions"
import store from "../../../../store/store"
import { useParams } from "react-router-dom"
import Trigger from "../../../../components/Trigger"

interface IFragmentProps {
    fragment: IFragment
    observer: IUserMin
    onRendered?: () => void
    isFragmentSeen: boolean
    onReply: (arg: IMessage) => void
    onDelete: (arg: IMessage) => void
    onEdit: (arg: IMessage) => void
}

const Fragment: FC<IFragmentProps> = ({ fragment, observer, onRendered, isFragmentSeen, onReply, onDelete, onEdit }) => {
    const params = useParams()
    const { wsc } = useContext(Context)

    const updateSeenStatus = useCallback(async (): Promise<void> => {
        if (params.id && !isFragmentSeen) {
            InboxService.updateSeen(params.id, JSON.stringify(fragment.messages))
            const messages = fragment.messages.filter(message => {
                return message.owner !== store.user.id
            })
            wsc.send(WebSocketActions.Seen, {
                chatid: params.id,
                messages: messages
            })
        }
    }, [fragment.messages, params.id, store.user.id, isFragmentSeen])

    return (
        <div
            className={styles["fragment-container"]}
        >
            {
                fragment.messages.map((msg: IMessage) =>
                    <Message onEdit={onEdit} onDelete={onDelete} onReply={onReply} observer={observer} onRender={msg.last ? onRendered : undefined} message={msg} key={msg._id} />
                )
            }
            <Trigger onTrigger={updateSeenStatus} />
        </div>
    )
}

export default Fragment