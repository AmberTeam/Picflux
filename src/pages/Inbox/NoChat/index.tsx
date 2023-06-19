import styles from "./index.module.scss";
import { ReactComponent as InboxIcon } from "../../../icons/Inbox.svg";
import store from "../../../store/store";
import { useOutletContext } from "react-router-dom";
import { observer } from "mobx-react-lite";
const NoChat = () => {
    const { setIsActive } = useOutletContext() as { setIsActive: (arg: boolean) => void };
    return (
        <div className={`${styles.container}`}>
            <InboxIcon className={styles["inbox-icon"]} />
            <span className={styles.message}>
                {store.lang.inbox.chat.s_banner[1]}
            </span>
            <button 
                className={styles.button} 
                onClick={() => setIsActive(true)}
            >
                {store.lang.inbox.chat.s_banner[2]}
            </button>
        </div>
    );
};

export default observer(NoChat);