import { useState, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Link, Outlet, redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom"
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

enum Tab {
    WatchLaterList = "watchLaterList",
    Friends = "friends"
}

enum ManageFriendshipAction {
    Subscribe = "subscribe",
    Unsubscribe = "unsubscribe",
    None = "none"
}

export async function manageFriendshipAction({ request, params }: { request: Request, params: any }) {
    const { action } = Object.fromEntries(await request.formData())
    if (action === ManageFriendshipAction.Subscribe) {
        await UserService.subscribeUser(params.id)
    }
    else {
        await UserService.unsubscribeUser(params.id)
    }
    return redirect("..")
}

export async function profileLoader({ params }: any) {
    const user = await UserService.getUserBId(params.id, true)
    return { user: user.data }
}

const ProfilePage = () => {
    const { user } = useLoaderData() as { user: IUser }
    const isSameUser = useMemo(() => user.id === store.user.id, [user.id, store.user.id])
    const navigate = useNavigate()
    const [tab, setTab] = useState<Tab>(isSameUser ? Tab.WatchLaterList : Tab.Friends)
    const fetcher = useFetcher()
    const isLoading = fetcher.state === "submitting" || fetcher.state === "loading"
    return (
        <>
            <Outlet />
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
                                <h2 className={`${styles.status} ${styles["statistic-value"]}`}>{store.lang.g.statuses.online}</h2>
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
                                    <Link className={styles["action-button"]} to={`/inbox/${user.id}`}>
                                        <span>{store.lang.profile.intro.actions.send}</span>
                                        <MessageIcon className={styles["action-button-icon"]} />
                                    </Link>
                                    : null
                            }
                            {
                                isSameUser ?
                                    <button className={styles["action-button"]} onClick={() => navigate("edit")}>
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
                                    <button className={`${styles.tab} ${styles.Default} ${tab === Tab.WatchLaterList && styles.Active}`} onClick={() => setTab(Tab.WatchLaterList)}>
                                        {store.lang.profile.tabs.wl}
                                    </button>
                                    :
                                    null
                            }
                            <button className={`${styles.tab} ${tab === Tab.Friends && styles.Active}`} onClick={() => setTab(Tab.Friends)}>
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
        </>
    )
}

export default observer(ProfilePage)