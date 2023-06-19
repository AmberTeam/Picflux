import { FC, useRef } from "react";
import { IUserMin } from "../../interfaces/IUser";
import UserService from "../../services/UserService";
import styles from "./index.module.scss";
import store from "../../store/store";
import { ReactComponent as AddChatIcon } from "../../icons/AddFriend.svg";
import { ReactComponent as NotFoundUserIcon } from "../../icons/NotFoundUser.svg";
import { Link, useFetcher } from "react-router-dom";
import { IChat } from "../../interfaces/IDirect";
import LoaderMini from "../LoaderMini";
import { observer } from "mobx-react-lite";

export async function searchUsersLoader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    let users: IUserMin[] = [];
    if (username) {
        const response = await UserService.searchCandidates(username);
        users = response.data.users ?? [];
    }
    return { users };
}

interface Props {
    chats: IChat[]
    isActive: boolean
    setIsActive: (arg: boolean) => void
}

const UserSelect: FC<Props> = ({ isActive, setIsActive }) => {
    const timeoutId = useRef<number>();
    const fetcher = useFetcher();
    const isLoading = fetcher.state === "loading" || fetcher.state === "submitting";
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <div className={`${styles.blurer} ${isActive ? styles.active : ""}`} onClick={() => {
                setIsActive(false);
            }}></div>
            <div className={`${styles["user-select-container"]} ${isActive ? styles.active : ""}`}>
                <fetcher.Form
                    className={styles["user-select-form"]}
                    method="get"
                    action="search-users"
                    onChange={(event) => {
                        clearTimeout(timeoutId.current);
                        const formData = new FormData(event.currentTarget);
                        timeoutId.current = window.setTimeout(() => {
                            fetcher.submit({ username: formData.get("username") as string }, {
                                method: "get",
                                action: "/inbox/search-users"
                            });
                        }, 300);
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
                                        <Link 
                                            key={user.id}
                                            to={`/inbox/create/${user.id}`}
                                            className={styles["user-select-item-container"]}
                                            onClick={() => setIsActive(false)}
                                        >
                                            <button
                                                type="submit"
                                                className={styles["user-select-item"]}
                                                name="user-id"
                                                value={user.id}
                                            >
                                                <div className={styles["user-information"]}>
                                                    <img draggable={false} src={user.avatar} className={styles["user-avatar"]} />
                                                    <span>{user.username}</span>
                                                </div>
                                            </button>
                                        </Link>
                                    );
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
    );
};

export default observer(UserSelect);