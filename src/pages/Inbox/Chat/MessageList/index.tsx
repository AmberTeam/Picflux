import { useContext, useEffect, RefObject, FC, useRef } from "react"
import styles from "./index.module.scss"
import { IMessage } from "../../../../interfaces/IMessage"
import { IUserMin } from "../../../../interfaces/IUser"
import Fragment from "../Fragment"
import { Context } from "../../../.."
import { observer } from "mobx-react-lite"
import store from "../../../../store/store"
import Trigger from "../../../../components/Trigger"
import { useParams } from "react-router-dom"
interface Props {
    fragments: IFragment[]
    observer: IUserMin
    onRendered: () => void
    onReply: (message: IMessage) => void
    onDelete: (message: IMessage) => void
    onEdit: (message: IMessage) => void
    chatContainerRef?: RefObject<HTMLDivElement>
    getPreviousMessages: () => void
}

export interface IFragment {
    id: string
    messages: IMessage[]
}

const MessageList: FC<Props> = ({ getPreviousMessages, fragments, ...props }) => {
    const { wsc } = useContext(Context)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const params = useParams()
    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight
        })
    }, [chatContainerRef.current, params.id])

    const updateSeenStatuses = (messages: IMessage[]) => {
        fragments.map(fragment => {
            fragment.messages.map((msg: IMessage) => {
                for (let i = 0; i < messages.length; i++) {
                    if (msg._id === messages[i]._id) msg.seen = 1
                }
                return msg
            })
        })
    }

    useEffect(() => {
        function seenHandler(e: MessageEvent) {
            const data_p = JSON.parse(e.data)
            console.log(data_p)
            const messages_p = JSON.parse(data_p.payload).messages
            if (!messages_p || !messages_p.length) return
            updateSeenStatuses(messages_p)
        }
        wsc.addListener("message", seenHandler)
        return () => {
            wsc.removeListener("message", seenHandler)
        }
    }, [])
    return (
        <div className={styles["chat-content"]} ref={chatContainerRef}>
            <Trigger onTrigger={getPreviousMessages} />
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
                            onRendered={props.onRendered}
                            key={fragment.id}
                        />
                    )
                })
            }
        </div>
    )
}

export default observer(MessageList)