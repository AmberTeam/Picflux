import { FC, useContext, useEffect } from "react";
import RegistrationPage, { registrationAction } from "./pages/Auth/Registration";
import LoginPage, { loginAction } from "./pages/Auth/Login";
import HomePage, { getFilmsLoader, homeLoader } from "./pages/Home";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilmPage, { filmLoader, manageWatchLaterAction, rateFilmAction } from "./pages/Film";
import ProfilePage, { manageFriendshipAction, profileLoader } from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import UndefinedRoutePage from "./pages/UndefRoute";
import InboxPage, { inboxLoader } from "./pages/Inbox";
import "./sass/index.scss";
import $api from "./http";
import Root from "./pages/Root/Root";
import store from "./store/store";
import { editProfileModalAction } from "./components/EditProfileModal";
import NoChat from "./pages/Inbox/NoChat";
import Chat, { chatLoader } from "./pages/Inbox/Chat";
import { searchUsersLoader } from "./components/UserSelect";
import ProtectedPage from "./components/ProtectedPage";
import CreateChat, { createChatAction } from "./components/CreateChat";

const router = createBrowserRouter([
    {
        errorElement: <UndefinedRoutePage />,
        children: [
            {
                path: "/login",
                element: <ProtectedPage hasToBeLoggedIn={false}><LoginPage /></ProtectedPage>,
                action: loginAction
            },
            {
                path: "/registration",
                element: <ProtectedPage hasToBeLoggedIn={false}><RegistrationPage /></ProtectedPage>,
                action: registrationAction
            },
            {
                path: "/",
                element: <Root />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                        loader: homeLoader
                    },
                    {
                        path: "get-films",
                        loader: getFilmsLoader
                    },
                    {
                        path: "film/:id",
                        element: <FilmPage />,
                        loader: filmLoader,
                        children: [
                            {
                                path: "manage-watch-list",
                                action: manageWatchLaterAction
                            },
                            {
                                path: "rate-film",
                                action: rateFilmAction
                            }
                        ]
                    },
                    {
                        path: "profile",
                        children: [
                            {
                                path: ":id/preview",
                                element: <ProtectedPage hasToBeLoggedIn={true}><ProfilePage /></ProtectedPage>,
                                loader: profileLoader,
                                children: [
                                    {
                                        path: "edit",
                                        action: editProfileModalAction
                                    },
                                    {
                                        path: "friendship",
                                        action: manageFriendshipAction
                                    }
                                ]
                            },
                            {
                                path: "settings",
                                element: <ProtectedPage hasToBeLoggedIn={true}><SettingsPage /></ProtectedPage>
                            }
                        ]
                    },
                    {
                        path: "inbox",
                        element: <ProtectedPage hasToBeLoggedIn={true}><InboxPage /></ProtectedPage>,
                        loader: inboxLoader,
                        children: [
                            {
                                index: true,
                                element: <NoChat />
                            },
                            {
                                path: ":id",
                                element: <Chat />,
                                loader: chatLoader,
                            },
                            {
                                path: "search-users",
                                loader: searchUsersLoader
                            },
                            {
                                path: "create/:id",
                                element: <CreateChat />,
                                action: createChatAction
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

const App: FC = () => {
    const { wsc } = useContext(Context);
    const setTilestamp = async (): Promise<void> => {
        try {
            await $api.get("/user/tsp");
        } catch (e) {
            console.log("Could not set timestamp.");
        }
    };

    const initSocketConnection = () => {
        wsc.init(`ws://localhost:5000/wsedge?token=${localStorage.getItem("token")}`);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) store.checkAuth();
        if (localStorage.getItem("lang")) store.checkLang();
        else store.setDefaultLang();
        if (localStorage.getItem("theme")) store.checkTheme();
        else store.setDefaultTheme();
    }, []);

    useEffect(() => {
        if (store.isAuth) {
            setTilestamp();
            initSocketConnection();
            store.setSocketAuth(true);
        }
    }, [store.isAuth]);

    if (store.isLoading || !store.lang_ready) {
        return <div>Загрузка...</div>;
    }
    return (
        <div data-theme={store.theme} className="app">
            <RouterProvider router={router} />
        </div>
    );
};

export default observer(App);