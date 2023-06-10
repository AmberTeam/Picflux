import { observer } from "mobx-react-lite"
import { FC, useMemo, useEffect, useRef, useState, useCallback } from "react"
import InboxService from "../../../services/InboxService"
import styles from "./index.module.scss"
import { ActionFunctionArgs, Link, ParamParseKey, Params, useLoaderData, useOutletContext, useParams } from "react-router-dom"
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

const path = "/inbox/:id" as const

interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof path>>
}

export async function chatLoader({ params }: Args) {
    if (params.id) {
        const response = await InboxService.getChatHistory(params.id, 0, 25)
        return { messages: response.data.history }
    }
    return { messages: [] }
}

const Chat: FC = () => {
    const inputMessageRef = useRef<HTMLInputElement>(null)
    const [canLoadMore, setCanLoadMore] = useState(true)
    const { messages: fetchedMessages } = useLoaderData() as { messages: IMessage[] }
    const [replyingMessage, setReplyingMessage] = useState<IMessage | null>(null)
    const { chats } = useOutletContext<{ chats: IChat[] }>()
    const params = useParams<"id">()
    const chat = useMemo(() => chats.find(chat => chat.chatid === params.id), [params.id, chats])
    const { fragments, updateFragments, setNewFragments } = useFragmenting(25)
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
                updateFragments("push", [{ ...messageInformation, refer: replyingMessage ?? null }])
                inputMessageRef.current.value = ""
                setReplyingMessage(null)
            }
        }
    }
    const getPreviousMessages = useCallback(async () => {
        if (canLoadMore && params.id && fragments.length) {
            const response = await InboxService.getChatHistory(params.id, fragments.reduce((acc, fragment) => fragment.messages.length + acc, 0), 25)
            if (!response.data.history.length) {
                setCanLoadMore(false)
            }
            updateFragments("unshift", [...response.data.history])
        }
    }, [canLoadMore, params.id, fragments])
    useEffect(() => {
        setCanLoadMore(!!fetchedMessages.length)
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
    const updateSeenStatus = useCallback((messages: IMessage[]) => {
        let currentSeenMessageIndex = 0
        const newFragments = fragments.map(fragment => {
            return {
                ...fragment, messages: fragment.messages.map(message => {
                    const currentSeenMessage = messages[currentSeenMessageIndex]
                    if (message._id === currentSeenMessage._id) {
                        message.seen = 1
                        currentSeenMessageIndex++
                    }
                    return message
                })
            }
        })
        setNewFragments(newFragments)
    }, [fragments])
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
                updateSeenStatus={updateSeenStatus}
                observer={user ?? {
                    id: "",
                    username: "No Username",
                    avatar: ""
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