import { observer } from "mobx-react-lite";
import { FC } from "react";
import styles from "./index.module.scss";
import Theme from "../../enums/Theme";
import store from "../../store/store";

const ThemeTumbler: FC = () => {
    const changeActive = (theme: Theme) => {
        store.setTheme(theme);
    };
    return (
        <div className={styles["tumbler-container"]} onClick={() => changeActive(store.theme == Theme.Light ? Theme.Dark : Theme.Light)}>
            <div className={`${styles.switcher} ${store.theme == Theme.Dark ? styles.active : styles.inactive}`}></div>
        </div>
    );
};

export default observer(ThemeTumbler);