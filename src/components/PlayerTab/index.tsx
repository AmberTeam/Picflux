import { FC } from "react";
import { IPlayer } from "../../interfaces/IFilm";
import styles from "./index.module.scss";
import RussianIcon from "../../img/lang_ic/ru.png";
interface Props {
    player: IPlayer
    playerName: string
    onClick: () => void
    isSelected: boolean
}

const PlayerTab: FC<Props> = ({ player, isSelected, onClick, playerName }) => {
    return (
        <div 
            className={`${isSelected ? styles.active : ""} ${styles["player-tab"]}`}
            key={player.url}
            onClick={onClick}
        >
            <div className={styles["player-tab-information"]}>
                <img className={styles["player-tab-flag"]} src={RussianIcon} alt="Language Flag" />
                <span className={styles["player-tab-name"]}>{playerName}</span>
            </div>
        </div>
    );
};

export default PlayerTab;