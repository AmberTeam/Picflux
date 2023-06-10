import { useContext, useEffect, RefObject, FC, useRef } from "react"
import styles from "./index.module.scss"
import { IMessage } from "../../../../interfaces/IMessage"
import { IUserMin } from "../../../../interfaces/IUser"
import Fragment from "../Fragment"
import { Context } from "../../../.."
import { observer } from "mobx-react-lite"
import store from "../../../../store/store"
import Trigger from "../../../../components/Trigger"
import WebSocketEvents from "../../../../enums/WebSocketEvents"
interface Props {
    fragments: IFragment[]
    observer: IUserMin
    onReply: (message: IMessage) => void
    onDelete: (message: IMessage) => void
    onEdit: (message: IMessage) => void
    chatContainerRef?: RefObject<HTMLDivElement>
    getPreviousMessages: () => void
    updateSeenStatus: (messages: IMessage[]) => void
}

export interface IFragment {
    id: string
    messages: IMessage[]
}

const MessageList: FC<Props> = ({ getPreviousMessages, fragments, updateSeenStatus, ...props }) => {
    const { wsc } = useContext(Context)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function seenHandler(event: MessageEvent) {
            const data = JSON.parse(event.data)
            if (data.event === WebSocketEvents.Seen) {
                const payload = JSON.parse(data.payload)
                if (payload.messages?.length) {
                    updateSeenStatus(payload.messages)
                }
            }
        }
        wsc.addListener("message", seenHandler)
        return () => {
            wsc.removeListener("message", seenHandler)
        }
    }, [updateSeenStatus])

    return (
        <div className={styles["chat-content"]} ref={chatContainerRef}>
            <div>
                {
                    fragments.map((fragment: IFragment) => {
                        const inc = fragment.messages.some(message => message.seen === 0 && message.owner !== store.user.id)

                        if (fragment.messages.length) return (
                            <Fragment
                                onEdit={props.onEdit}
                                onDelete={props.onDelete}
                                onReply={props.onReply}
                                isFragmentSeen={!inc}
                                fragment={fragment}
                                observer={props.observer}
                                key={fragment.id}
                            />
                        )
                    })
                }
            </div>
            <Trigger onTrigger={getPreviousMessages} />
        </div>
    )
}

export default observer(MessageList)