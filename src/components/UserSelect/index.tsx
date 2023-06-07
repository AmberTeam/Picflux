import { FC, useRef } from "react"
import { IUserMin } from "../../interfaces/IUser"
import UserService from "../../services/UserService"
import styles from "./index.module.scss"
import store from "../../store/store"
import { ReactComponent as AddChatIcon } from "../../icons/AddFriend.svg"
import { ReactComponent as NotFoundUserIcon } from "../../icons/NotFoundUser.svg"
import { Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import InboxService from "../../services/InboxService"
import { IChat } from "../../interfaces/IDirect"
import LoaderMini from "../LoaderMini"

export async function searchUsersLoader({ request }: { request: Request }) {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    let users: IUserMin[] = []
    if (username) {
        const response = await UserService.searchCandidates(username)
        users = response.data.users ?? []
    }
    return { users }
}

export async function createChatAction({ request }: { request: Request }) {
    const formData = await request.formData()
    const userId = formData.get("user-id")
    if(userId) {
        const response = await InboxService.createChat([userId as string])
        console.log("Chat created successfully", response.data)
        if (response.data) {
            return redirect(`/inbox/${response.data.chatid}`)
        }
    }
    return redirect("/inbox")
}

interface Props {
    chats: IChat[]
    isActive: boolean
    setIsActive: (arg: boolean) => void
}

const UserSelect: FC<Props> = ({ chats, isActive, setIsActive }) => {
    const timeoutId = useRef<number>()
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isLoading = fetcher.state === "loading" || fetcher.state === "submitting"
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <div className={`${styles.blurer} ${isActive ? styles.active : ""}`} onClick={() => {
                setIsActive(false)
            }}></div>
            <div className={`${styles["user-select-container"]} ${isActive ? styles.active : ""}`}>
                <fetcher.Form
                    className={styles["user-select-form"]}
                    method="get"
                    action="search-users"
                    onChange={(event) => {
                        clearTimeout(timeoutId.current)
                        const formData = new FormData(event.currentTarget)
                        timeoutId.current = window.setTimeout(() => {
                            fetcher.submit({ username: formData.get("username") as string }, {
                                method: "get",
                                action: "/inbox/search-users"
                            })
                        }, 300)
                    }}
                >
                    <input
                        className={styles["user-select-input"]}
                        placeholder={store.lang.inbox.user_select.placeholder}
                        name="username"
                        onFocus={() => setIsActive(true)}
                        ref={inputRef}
                    />
                    <AddChatIcon />
                </fetcher.Form>
                <div className={styles["user-select-results"]}>
                    {
                        isLoading ?
                            <div className={styles["message-container"]}>
                                <LoaderMini />
                                <span>{store.lang.inbox.user_select.loading}</span>
                            </div>
                            :
                            fetcher.data?.users.length
                                ?
                                fetcher.data.users.map((user: IUserMin) => {
                                    return (
                                        <Form 
                                            key={user.id}
                                            method="post"
                                            action="create-chat"
                                        >
                                            <button
                                                type="submit"
                                                className={styles["user-select-item"]}
                                                name="user-id"
                                                value={user.id}
                                                onClick={async (event) => {
                                                    setIsActive(false)
                                                    if(user.id === store.user.id) {
                                                        event.preventDefault()
                                                    }
                                                    else {
                                                        for (const chat of chats) {
                                                            for (const member of chat.members) {
                                                                if (member.id === user.id) {
                                                                    navigate(`/inbox/${chat.chatid}`)
                                                                    event.preventDefault()
                                                                }
                                                            }
                                                        }
                                                        if (inputRef.current) {
                                                            inputRef.current.value = ""
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className={styles["user-information"]}>
                                                    <img draggable={false} src={user.avatar} className={styles["user-avatar"]} />
                                                    <span>{user.username}</span>
                                                </div>
                                            </button>
                                        </Form>
                                    )
                                })
                                :
                                <div className={styles["message-container"]}>
                                    <NotFoundUserIcon />
                                    <span>{store.lang.inbox.user_select.not_found}</span>
                                </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UserSelect