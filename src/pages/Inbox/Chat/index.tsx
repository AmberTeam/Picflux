import { observer } from "mobx-react-lite";
import { FC, useMemo, useEffect, useRef, useState, useCallback, useContext } from "react";
import InboxService from "../../../services/InboxService";
import styles from "./index.module.scss";
import { ActionFunctionArgs, Link, ParamParseKey, Params, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { ReactComponent as InformationIcon } from "../../../icons/Information.svg";
import store from "../../../store/store";
import { ReactComponent as SendIcon } from "../../../icons/Send.svg";
import { IChat } from "../../../interfaces/IDirect";
import MessageList from "./MessageList";
import { IMessage, INotReadMessages } from "../../../interfaces/IMessage";
import WebSocketActions from "../../../enums/WebSocketActions";
import uuid from "react-uuid";
import WebSocketEvents from "../../../enums/WebSocketEvents";
import { ReactComponent as CancelIcon } from "../../../icons/Close.svg";
import { ReactComponent as GoBackIcon } from "../../../icons/GoBack.svg";
import useFragmenting from "../../../hooks/useFragmenting.hook";
import { Context } from "../../..";
import FragmentingAction from "../../../enums/FragmentingAction";

const path = "/inbox/:id" as const;

interface IOutletContext {
    chats: IChat[]
    setNotReadMessages: (newNotReadMessages: INotReadMessages | ((previousNotReadMessages: INotReadMessages) => INotReadMessages)) => void
}

interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof path>>
}

export async function chatLoader({ params }: Args) {
    if (params.id) {
        const response = await InboxService.getChatHistory(params.id, 0, 25);
        return { messages: response.data.history };
    }
    return { messages: [] };
}

const Chat: FC = () => {
    const { wsc } = useContext(Context);
    const inputMessageRef = useRef<HTMLInputElement>(null);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const { messages: fetchedMessages } = useLoaderData() as { messages: IMessage[] };
    const [replyingMessage, setReplyingMessage] = useState<IMessage | null>(null);
    const [editingMessage, setEditingMessage] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { chats, setNotReadMessages } = useOutletContext<IOutletContext>();
    const params = useParams<"id">();
    const chat = useMemo(() => chats.find(chat => chat.chatid === params.id), [params.id, chats]);
    const { fragments, updateFragments, setNewFragments, removeMessage } = useFragmenting(25);
    const [pendingScroll, setPendingScroll] = useState<boolean>(false);
    const user = chat?.members[0];
    const handleMessageSubmit = async () => {
        const message = inputMessageRef.current?.value;
        if (message && message.trim() && params.id) {
            if (editingMessage) {
                wsc.send(WebSocketActions.ChatroomEvent, { chatid: params.id, payload: { event: "edit", message: { _id: editingMessage, payload: message } } });
                handleMessageEdited(editingMessage, message);
                setEditingMessage(null);
                InboxService.editMsg(params.id, editingMessage, message);
            }
            else {
                const messageInformation = {
                    owner: store.user.id,
                    payload: message,
                    chatid: params.id,
                    timestamp: Date.now(),
                    seen: 0,
                    id: "",
                    _id: uuid(),
                    type: replyingMessage?._id ? "reply" : "default"
                };
                updateFragments(FragmentingAction.Push, [{ ...messageInformation, refer: replyingMessage ?? null }]);
                wsc.send(WebSocketActions.ChatroomMessage, { chatid: params.id, msg: { ...messageInformation, refer: replyingMessage } });
                InboxService.storeMsg({ ...messageInformation, refer: replyingMessage?._id ?? null });
                setReplyingMessage(null);
                setPendingScroll(true);
            }
            inputMessageRef.current.value = "";
        }
    };
    const handleMessageEdited = (messageId: string, messageContent: string) => {
        setNewFragments((previousFragments) => {
            return previousFragments.map(fragment => {
                return fragment.map(message => {
                    const modifiedMessage = { ...message };
                    if (modifiedMessage._id === messageId) {
                        modifiedMessage.payload = messageContent;
                    }
                    if (modifiedMessage.refer && typeof modifiedMessage.refer !== "string" && modifiedMessage.refer._id === messageId) {
                        modifiedMessage.refer.payload = messageContent;
                    }
                    return modifiedMessage;
                });
            });
        });
    };
    const updateSeenStatus = useCallback((messages: IMessage[]) => {
        if(chat) {
            let currentSeenMessageIndex = 0;
            setNotReadMessages(previousNotReadMessages => {
                return {
                    ...previousNotReadMessages,
                    [chat.chatid]: previousNotReadMessages[chat.chatid]?.filter(message => {
                        const isNotSeen = message._id !== messages[currentSeenMessageIndex]._id;
                        if(!isNotSeen) currentSeenMessageIndex++;
                        return isNotSeen;
                    }) ?? []
                };
            });
        }
        setNewFragments((previousFragments) => {
            let currentSeenMessageIndex = 0;
            return previousFragments.map(fragment => {
                return fragment.map(message => {
                    const currentSeenMessage = messages[currentSeenMessageIndex];
                    const modifiedMessage = { ...message };
                    if (modifiedMessage._id === currentSeenMessage?._id) {
                        modifiedMessage.seen = 1;
                        currentSeenMessageIndex++;
                    }
                    return modifiedMessage;
                });
            });
        });
    }, []);
    const getPreviousMessages = useCallback(() => {
        if (canLoadMore && params.id, fragments.length) {
            setTimeout(async () => {
                const response = await InboxService.getChatHistory(params.id ?? "", fragments.reduce((acc, fragment) => {
                    return fragment.length + acc;
                }, 0), 25);
                if (!response.data.history?.length) {
                    setCanLoadMore(false);
                }
                else {
                    updateFragments(FragmentingAction.Unshift, response.data.history);
                }
            }, 300);
        }
    }, [canLoadMore, params.id, fragments]);

    useEffect(() => {
        if (pendingScroll) {
            chatContainerRef.current?.scrollTo({
                behavior: "smooth",
                top: Number.MAX_SAFE_INTEGER
            });
            setPendingScroll(false);
        }
    }, [pendingScroll]);
    useEffect(() => {
        setCanLoadMore(!!fetchedMessages.length);
        updateFragments(FragmentingAction.Replace, fetchedMessages);
    }, [fetchedMessages]);
    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.event === WebSocketEvents.ChatroomMessage) {
                const payload = JSON.parse(data.payload);
                if (payload) {
                    updateFragments(FragmentingAction.Push, [payload]);
                }
            }
        };
        const handleChatroomEvent = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.event === WebSocketEvents.ChatroomEvent) {
                const payload = JSON.parse(data.payload);
                if (payload.event === "edit") {
                    handleMessageEdited(payload.message._id, payload.message.payload);
                }
                else if (payload.event === "delete") {
                    removeMessage(payload.message._id);
                }
            }
        };
        wsc.send(WebSocketActions.InitializeChatroom, { chatid: params.id, members: chat?.members });
        wsc.addListener("message", messageHandler);
        wsc.addListener("message", handleChatroomEvent);
        return () => {
            wsc.removeListener("message", messageHandler);
            wsc.removeListener("message", handleChatroomEvent);
            wsc.send(WebSocketActions.DestroyChatroom, { chatid: params.id });
        };
    }, [params.id]);
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
                chatContainerRef={chatContainerRef}
                getPreviousMessages={getPreviousMessages}
                fragments={fragments}
                updateSeenStatus={updateSeenStatus}
                editingMessage={editingMessage}
                observer={user ?? {
                    id: "",
                    username: "No Username",
                    avatar: ""
                }}
                onDelete={async (message) => {
                    if (inputMessageRef.current) {
                        if (params.id) {
                            wsc.send(WebSocketActions.ChatroomEvent, { chatid: params.id, payload: { event: "delete", message: { _id: message._id } } });
                            removeMessage(message._id);
                            InboxService.deleteMsg(params.id, message._id);
                        }
                    }
                }}
                onEdit={(message) => {
                    if (inputMessageRef.current) {
                        inputMessageRef.current.value = message.payload;
                        inputMessageRef.current.focus();
                        setEditingMessage(message._id);
                    }
                }}
                onCancelEdit={() => {
                    setEditingMessage(null);
                }}
                onReply={(message) => setReplyingMessage(message)}
            />
            <form
                className={styles["send-message-information"]}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleMessageSubmit();
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
                <div className={styles["send-message-form"]}>
                    <input
                        type="text"
                        placeholder={store.lang.inbox.chat.wam}
                        className={styles["message-input"]}
                        ref={inputMessageRef}
                    />
                    <button type="submit" className={styles["send-message-button"]}>
                        <SendIcon className={styles["send-message-icon"]} tabIndex={0} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default observer(Chat);