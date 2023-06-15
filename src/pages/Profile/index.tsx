import { useState, useMemo, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Link, useFetcher, useLoaderData, ActionFunctionArgs, Params, ParamParseKey, useParams } from "react-router-dom"
import styles from "./index.module.scss"
import { IUser } from "../../interfaces/IUser"
import UserService from "../../services/UserService"
import store from "../../store/store"
import { ReactComponent as RemoveFriendIcon } from "../../icons/RemoveFriend.svg"
import { ReactComponent as AddFriendIcon } from "../../icons/AddFriend.svg"
import { ReactComponent as ShareIcon } from "../../icons/Share.svg"
import { ReactComponent as MessageIcon } from "../../icons/Message.svg"
import { ReactComponent as EditIcon } from "../../icons/Edit.svg"
import FilmList from "../../components/FilmList"
import LoaderMini from "../../components/LoaderMini"
import { wsc } from "../.."
import WebSocketEvents from "../../enums/WebSocketEvents"
import WebSocketActions from "../../enums/WebSocketActions"
import EditProfileModal from "../../components/EditProfileModal"

enum Tab {
    WatchLaterList = "watchLaterList",
    Friends = "friends"
}

enum ManageFriendshipAction {
    Subscribe = "subscribe",
    Unsubscribe = "unsubscribe",
    None = "none"
}

const path = "/inbox/:id" as const

interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof path>>
}

export async function manageFriendshipAction({ request, params }: Args) {
    if (params.id) {
        const { action } = Object.fromEntries(await request.formData())
        if (action === ManageFriendshipAction.Subscribe) {
            await UserService.subscribeUser(params.id)
        }
        else {
            await UserService.unsubscribeUser(params.id)
        }
    }
}

export async function profileLoader({ params }: Args) {
    if (params.id) {
        const user = await UserService.getUserBId(params.id, true)
        return { user: user.data }
    }
}

const ProfilePage = () => {
    const { user } = useLoaderData() as { user: IUser | undefined }
    const params = useParams<"id">()
    const isSameUser = useMemo(() => user?.id === store.user.id, [user, store.user.id])
    const [tab, setTab] = useState<Tab>(isSameUser ? Tab.WatchLaterList : Tab.Friends)
    const [isOnline, setIsOnline] = useState<boolean>(store.user.id === params.id ? true : user?.id !== undefined ? !!user.id : false)
    const [isInEditMode, setIsInEditMode] = useState<boolean>(false)
    const fetcher = useFetcher()
    const isLoading = fetcher.state === "submitting" || fetcher.state === "loading"
    useEffect(() => {
        if(params.id && params.id !== store.user.id) {
            const handler = (event: MessageEvent) => {
                const data = JSON.parse(event.data)
                if(data?.event === WebSocketEvents.UpdateUserStatus) {
                    const payload = JSON.parse(data.payload)
                    if(payload.uid === params.id) setIsOnline(!!payload.status)
                }
            }
            wsc.addListener("message", handler)
            wsc.send(WebSocketActions.InitializeSession, { uid: params.id })
            return () => {
                wsc.removeListener("message", handler)
            }
        }
    }, [params.id])
    return (
        <>
            <EditProfileModal isActive={isInEditMode} setIsActive={setIsInEditMode}/>
            {user?.id ?

                <section className={styles["profile-section"]}>
                    <img src={user.avatar} className={styles.avatar} />
                    <div className={styles["profile-content"]}>
                        <div className={styles["user-information"]}>
                            <h1 className={styles.username}>{user.username}</h1>
                            {
                                user.biography
                                &&
                                <div className={styles["profile-biography"]}>
                                    {user.biography}
                                </div>
                            }
                            <div className={styles["user-statistics"]}>
                                <div className={styles.statistic}>
                                    <h2 className={styles["statistic-value"]}>
                                        {user.friends.length}
                                    </h2>
                                    <span className={styles["statistic-name"]}>{store.lang.profile.intro.stats.fr}</span>
                                </div>
                                <div className={styles.statistic}>
                                    <h2 className={styles["statistic-value"]}>Kino Geek</h2>
                                    <span className={styles["statistic-name"]}>{store.lang.profile.intro.stats.id}</span>
                                </div>
                                <div className={styles.statistic}>
                                    <h2 className={`${styles.status} ${styles["statistic-value"]}`}>{isOnline ? store.lang.g.statuses.online : store.lang.g.statuses.offline}</h2>
                                    <span className={styles["statistic-name"]}>{store.lang.profile.intro.stats.stat}</span>
                                </div>
                            </div>
                            <div className={styles["profile-actions"]}>
                                {
                                    !isSameUser ?
                                        <fetcher.Form
                                            method="post"
                                            action="friendship"
                                            onSubmit={(event) => {
                                                if (isLoading) {
                                                    event.preventDefault()
                                                }
                                            }}
                                        >
                                            <button
                                                className={styles["action-button"]}
                                                value={user.subscribed ? ManageFriendshipAction.Unsubscribe : ManageFriendshipAction.Subscribe}
                                                name="action"
                                            >
                                                {isLoading ? <LoaderMini /> :
                                                    <>
                                                        <span>{user.subscribed ? store.lang.profile.intro.actions.uns : store.lang.profile.intro.actions.sub}</span>
                                                        {
                                                            user.subscribed
                                                                ?
                                                                <RemoveFriendIcon className={styles["action-button-icon"]} />
                                                                :
                                                                <AddFriendIcon className={styles["action-button-icon"]} />
                                                        }
                                                    </>
                                                }
                                            </button>
                                        </fetcher.Form>
                                        : null
                                }
                                <button
                                    onClick={() => navigator.clipboard.writeText(location.href)}
                                    className={styles["action-button"]}
                                >
                                    <span>{store.lang.profile.intro.actions.sh}</span>
                                    <ShareIcon className={styles["action-button-icon"]} />
                                </button>
                                {
                                    !isSameUser ?
                                        <Link className={styles["action-button"]} to={`/inbox/create/${user.id}`}>
                                            <span>{store.lang.profile.intro.actions.send}</span>
                                            <MessageIcon className={styles["action-button-icon"]} />
                                        </Link>
                                        : null
                                }
                                {
                                    isSameUser ?
                                        <button className={styles["action-button"]} onClick={() => setIsInEditMode(true)}>
                                            <span>{store.lang.profile.intro.actions.ed}</span>
                                            <EditIcon className={styles["action-button-icon"]} />
                                        </button>
                                        : null
                                }
                            </div>
                        </div>
                        <div className={`container ${styles["user-interactions"]}`}>
                            <div className={styles.tabs}>
                                {
                                    isSameUser ?
                                        <button className={`${styles.tab} ${styles.Default} ${tab === Tab.WatchLaterList ? styles.active : ""}`} onClick={() => setTab(Tab.WatchLaterList)}>
                                            {store.lang.profile.tabs.wl}
                                        </button>
                                        :
                                        null
                                }
                                <button className={`${styles.tab} ${tab === Tab.Friends ? styles.active : ""}`} onClick={() => setTab(Tab.Friends)}>
                                    {store.lang.profile.tabs.friends}
                                </button>
                            </div>
                            <section className={styles["tab-content"]}>
                                {tab === Tab.WatchLaterList && user.watchLater ?
                                    <FilmList films={user.watchLater} />
                                    :
                                    tab === Tab.Friends ?
                                        <div>TODO</div>
                                        : null
                                }
                            </section>
                        </div>
                    </div>
                </section>
                : null}
        </>
    )
}

export default observer(ProfilePage)