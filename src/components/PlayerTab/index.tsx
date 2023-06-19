import { FC } from "react";
import { IPlayer } from "../../interfaces/IFilm";
import styles from "./index.module.scss";
import RussianIcon from "../../img/lang_ic/ru.png";
import { ReactComponent as DropdownIcon } from "../../icons/Dropdown.svg";
interface Props {
    player: IPlayer
    onClick: () => void
    isSelected: boolean
    index: number
}

const PlayerTab: FC<Props> = ({ player, onClick, isSelected, index }) => {
    return (
        <div className={styles["player-tab-container"]} key={player.url}>
            <div
                className={`${styles["player-tab"]} ${isSelected ? styles.active : ""}`}
                onClick={onClick}
            >
                <div className={styles["player-tab-information"]}>
                    <img className={styles["player-tab-flag"]} src={RussianIcon} alt="Language Flag" />
                    <span className={styles["player-tab-name"]}>Player {index + 1}</span>
                </div>
                <DropdownIcon className={styles["dropdown-button"]}/>
            </div>
        </div>
    );
};

export default PlayerTab;