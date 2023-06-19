import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import styles from "./index.module.scss";
import LanguageSettings from "../LanguageSettings";
import ThemeTumbler from "../ThemeTumbler";
import IAlert from "../../interfaces/IAlert";
import { ReactComponent as CloseIcon } from "../../icons/Close.svg";
import { ReactComponent as HomeIcon } from "../../icons/Home.svg";
import { ReactComponent as ProfileIcon } from "../../icons/Profile.svg";
import { ReactComponent as InboxIcon } from "../../icons/Inbox.svg";
import { Link } from "react-router-dom";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
interface Props {
    close: () => void
    isActive: boolean
}

const Offcanvas: FC<Props> = ({ close, isActive }) => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);
    const [alertsInbox, setAlertsInbox] = useState<number>(0);
    useEffect(() => {
        if (store.alert) {
            const alert_js = toJS(store.alert);
            switch (alert_js.tag) {
                case "msg":
                    setAlertsInbox(alertsInbox + 1);
                    break;
                default:
                    setAlerts([alert_js, ...alerts] as IAlert[]);
            }
        }
    }, [store.alert]);
    return (
        <div className={`${styles["offcanvas-container"]} ${isActive ? styles.active : ""}`}>
            <div onClick={close} />
            <div className={styles["offcanvas-content"]}>
                <div className={styles["offcanvas-main"]}>
                    <div className={styles["offcanvas-header"]}>
                        {
                            store.isAuth ?
                                <div className={styles["account-content"]}>
                                    <Link
                                        to={`/profile/${store.user.id}/preview`}
                                        onClick={close}
                                    >
                                        <img src={store.user.avatar} width="32px" />
                                    </Link>
                                    <button className={styles["logout-button"]} onClick={() => store.callLogoutModal()}>{store.lang.footer.bottom.logout}</button>
                                </div>
                                :
                                <Link
                                    to="/login"
                                    className={`${styles["auth-button"]} ${styles["login-button"]}`}
                                    onClick={close}
                                >
                                    {store.lang.navbar.unauth.opts.login}
                                </Link>
                        }
                        <button className={styles["close-button"]} onClick={close}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className={styles["offcanvas-body"]}>
                        <Link 
                            className={`${styles["offcanvas-link"]}`}
                            to="/"
                            onClick={close}
                        >
                            <HomeIcon />
                            <span>{store.lang.navbar.opts.home}</span>
                        </Link>
                        {
                            store.isAuth ?
                                <>
                                    <Link 
                                        className={`${styles["offcanvas-link"]}`} 
                                        to={`/profile/${store.user.id}/preview`}
                                        onClick={close}
                                    >
                                        <ProfileIcon />
                                        <span>{store.lang.navbar.opts.profile}</span>
                                    </Link>
                                    <Link
                                        className={`${styles["offcanvas-link"]}`}
                                        to="/inbox"
                                        onClick={close}
                                    >
                                        <InboxIcon />
                                        <span>{store.lang.navbar.opts.inbox} {alertsInbox > 0 ? alertsInbox : null}</span>
                                    </Link>
                                </>
                                : null
                        }
                    </div>
                </div>
                <div className={styles.controlls}>
                    <LanguageSettings />
                    <ThemeTumbler />
                </div>
            </div>
        </div>
    );
};

export default observer(Offcanvas);