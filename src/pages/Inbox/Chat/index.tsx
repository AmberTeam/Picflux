import { observer } from "mobx-react-lite"
import { FC, useMemo, useEffect, useRef, useState } from "react"
import InboxService from "../../../services/InboxService"
import styles from "./index.module.scss"
import { Link, useLoaderData, useOutletContext, useParams } from "react-router-dom"
import { ReactComponent as InformationIcon } from "../../../icons/Information.svg"
import store from "../../../store/store"
import { ReactComponent as SendIcon } from "../../../icons/Send.svg"
import { IChat } from "../../../interfaces/IDirect"
import MessageList from "./MessageList"
import { IMessage } from "../../../interfaces/IMessage"
import { wsc } from "../../.."
import WebSocketActions from "../../../enums/WebSocketActions"
import uuid from "react-uuid"
import WebSocketEvents from "../../../enums/WebSocketEvents"
import { ReactComponent as CancelIcon } from "../../../icons/Close.svg"
import { ReactComponent as GoBackIcon } from "../../../icons/GoBack.svg"
import useFragmenting from "../../../hooks/useFragmenting.hook"

export async function chatLoader({ params }: { params: any }) {
    const response = await InboxService.getChatHistory(params.id, 0, 15)
    return { messages: response.data.history }
}

const Chat: FC = () => {
    const inputMessageRef = useRef<HTMLInputElement>(null)
    const [canLoadMore, setCanLoadMore] = useState(true)
    const { messages: fetchedMessages } = useLoaderData() as { messages: IMessage[] }
    const [replyingMessage, setReplyingMessage] = useState<IMessage | null>(null)
    const { chats } = useOutletContext<{ chats: IChat[] }>()
    const params = useParams()
    const chat = useMemo(() => chats.find(chat => chat.chatid === params.id), [params.id, chats])
    const { fragments, updateFragments } = useFragmenting(25)
    const user = chat?.members[0]
    const handleMessageSubmit = () => {
        const message = inputMessageRef.current?.value
        if (message && params.id) {
            const messageInformation = {
                owner: store.user.id,
                payload: message,
                chatid: params.id,
                timestamp: Date.now(),
                seen: 0,
                id: "",
                _id: uuid(),
                type: replyingMessage?._id ? "reply" : "default"
            }
            if (message) {
                wsc.send(WebSocketActions.ChatroomMessage, { chatid: params.id, msg: { ...messageInformation, refer: replyingMessage } })
                InboxService.storeMsg({ ...messageInformation, refer: replyingMessage?._id ?? null })
                updateFragments("push", [{ ...messageInformation, refer: replyingMessage ?? "null" }])
                inputMessageRef.current.value = ""
                setReplyingMessage(null)
            }
        }
    }
    const getPreviousMessages = async () => {
        if (canLoadMore && params.id) {
            const response = await InboxService.getChatHistory(params.id, fragments.reduce((acc, fragment) => fragment.messages.length + acc, 0), 15)
            if (!response.data.history.length) {
                setCanLoadMore(false)
            }
            updateFragments("unshift", [...response.data.history])
        }
    }
    useEffect(() => {
        if (fetchedMessages.length && !canLoadMore) {
            setCanLoadMore(true)
        }
        else if (!fetchedMessages.length && canLoadMore) {
            setCanLoadMore(false)
        }
        console.log("Replacing", fetchedMessages)
        updateFragments("replace", fetchedMessages)
    }, [fetchedMessages])
    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            if (data.event === WebSocketEvents.ChatroomMessage) {
                const payload = JSON.parse(data.payload)
                if (payload) {
                    updateFragments("push", [payload])
                }
            }
        }
        wsc.send(WebSocketActions.InitializeChatroom, { chatid: params.id, members: chat?.members })
        wsc.addListener("message", messageHandler)
        return () => {
            wsc.removeListener("message", messageHandler)
            wsc.send(WebSocketActions.DestroyChatroom, { chatid: params.id })
        }
    }, [params.id])
    return (
        <div className={styles["chat-container"]}>
            <div className={styles.header}>
                <Link
                    className={styles["username"]}
                    to={`/profile/${chat?.members[0]?.id}/preview`}
                >
                    {chat?.members[0]?.username ?? "No Username"}
                </Link>
                <Link to="/inbox" className={styles["show-if-mobile"]}>
                    <GoBackIcon className={styles["action-icon"]} />
                </Link>
                <InformationIcon className={`${styles["action-icon"]} ${styles["show-if-desktop"]}`} />
            </div>
            <MessageList
                getPreviousMessages={getPreviousMessages}
                fragments={fragments}
                observer={user ?? {
                    id: "",
                    username: "No Username",
                    avatar: ""
                }}
                onRendered={() => {
                    return
                }}
                onDelete={() => {
                    console.log("TODO")
                }}
                onEdit={() => {
                    console.log("TODO")
                }}
                onReply={(message) => setReplyingMessage(message)}
            />
            <form
                className={styles["send-message-information"]}
                onSubmit={(event) => {
                    event.preventDefault()
                    handleMessageSubmit()
                }}
            >
                {replyingMessage ?
                    <div className={styles["reply-message-container"]}>
                        <div className={styles["reply-container"]}>
                            <span className={styles["reply-username"]}>{replyingMessage.owner === store.user.id ? store.user.username : user?.username}</span>
                            <span className={styles["reply-message"]}>{replyingMessage.payload}</span>
                        </div>
                        <button
                            className={styles["cancel-button"]}
                            onClick={() => setReplyingMessage(null)}
                            type="button"
                        >
                            <CancelIcon className={styles["cancel-icon"]} />
                        </button>
                    </div>
                    : null
                }
                <input type="hidden" name="replying-message" value={JSON.stringify(replyingMessage ?? "")} />
                <div className={styles["send-message-form"]}>
                    <input
                        type="text"
                        placeholder={store.lang.inbox.chat.wam}
                        className={styles["message-input"]}
                        name="message"
                        ref={inputMessageRef}
                    />
                    <button type="submit" className={styles["send-message-button"]}>
                        <SendIcon className={styles["send-message-icon"]} tabIndex={0} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default observer(Chat)