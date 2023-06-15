import { FC, useState } from "react"
import { IPlayer } from "../../interfaces/IFilm"
import styles from "./index.module.scss"
import RussianIcon from "../../img/lang_ic/ru.png"
import { ReactComponent as DropdownIcon } from "../../icons/Dropdown.svg"
interface Props {
    player: IPlayer
    onClick: () => void
    isSelected: boolean
    index: number
}

const PlayerTab: FC<Props> = ({ player, onClick, isSelected, index }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    return (
        <div className={styles["player-tab-container"]} key={player.url}>
            <div
                className={`${styles["player-tab"]} ${isSelected ? styles.active : ""} ${isDropdownOpen ? styles["dropdown-active"] : ""}`}
                onClick={() => {
                    if(isSelected) {
                        setIsDropdownOpen(wasDropdownOpen => !wasDropdownOpen)
                    }
                    onClick()
                }}
            >
                <div className={styles["player-tab-information"]}>
                    <img className={styles["player-tab-flag"]} src={RussianIcon} alt="Language Flag" />
                    <span className={styles["player-tab-name"]}>Player {index + 1}</span>
                </div>
                <DropdownIcon className={styles["dropdown-button"]}/>
            </div>
            <ul className={`${isDropdownOpen ? styles.active : ""} ${styles["player-tab-dropdown"]}`}>
                <li className={styles["language-tab"]}>
                    <img className={styles["player-tab-flag"]} src={RussianIcon} alt="Language Flag" />
                    <span className={styles["player-tab-name"]}>Russian</span>
                </li>
                <li className={styles["language-tab"]}>
                    <img className={styles["player-tab-flag"]} src={RussianIcon} alt="Language Flag" />
                    <span className={styles["player-tab-name"]}>Russian</span>
                </li>
            </ul>
        </div>
    )
}

export default PlayerTab