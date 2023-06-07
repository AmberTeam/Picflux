import { useState, useRef, useEffect, FC } from "react"
import store from "../../store/store"
import styles from "./index.module.scss"
import { ReactComponent as PinIcon } from "../../icons/Pin.svg"
import { ReactComponent as AdIcon } from "../../icons/Ad.svg"
import RussianIcon from "../../img/lang_ic/ru.png"
import FCRService from "../../services/FCRService"

interface Props {
    players: string[]
}

const Player: FC<Props> = ({ players }) => {
    const [isFixed, setIsFixed] = useState<boolean>(false)
    const [selectedPlayer, setSelectedPlayer] = useState<string>(players[0])
    const playerRef = useRef<HTMLIFrameElement>(null)
    const controllersRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [selectedPlayerDoc, setSelectedPlayerDoc] = useState<string>("")
    useEffect(() => {
        FCRService.rewriteByHostname(selectedPlayer, () => {return})
            .then(response => {
                setSelectedPlayerDoc(response.data ?? "")
            })
    }, [selectedPlayer])
    useEffect(() => {
        const handleMouseEnter = () => {
            controllersRef.current?.classList.add(styles.inactive)
            sidebarRef.current?.classList.add(styles.inactive)
        }
        const handleMouseLeave = () => {
            controllersRef.current?.classList.remove(styles.inactive)
            sidebarRef.current?.classList.remove(styles.inactive)
        }
        if(playerRef.current) {
            playerRef.current.addEventListener("mouseenter", handleMouseEnter)
            playerRef.current.addEventListener("mouseleave", handleMouseLeave)
        }
        return () => {
            if(playerRef.current) {
                playerRef.current.removeEventListener("mouseenter", handleMouseEnter)
                playerRef.current.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [playerRef.current])
    return (
        <div className={styles["player-container"]}>
            <div ref={controllersRef} className={`${styles["player-controllers"]} ${isFixed ? "" : styles["is-not-fixed"]}`}>
                <button
                    className={`${styles["controller-button"]} ${isFixed ? styles.active : ""} ${styles["full-size-only"]}`}
                    onClick={() => setIsFixed(wasFixed => !wasFixed)}
                >
                    <PinIcon className={styles["controller-icon"]} />
                </button>
                <button className={styles["controller-button"]}>
                    <AdIcon className={styles["controller-icon"]} />
                </button>
            </div>
            <iframe ref={playerRef} className={styles.player} srcDoc={selectedPlayerDoc} />
            <div ref={sidebarRef} className={`${styles["player-sidebar"]} ${isFixed ? "" : styles["is-not-fixed"]}`}>
                <div className={styles["change-player-container"]}>
                    {players.map((player, index) => {
                        return (
                            <div 
                                key={player} 
                                className={`${styles["change-player-option"]} ${player === selectedPlayer ? styles["active"] : ""}`}
                                onClick={() => {
                                    setSelectedPlayer(player)
                                }}
                            >
                                <img className={styles["player-language-flag"]} src={RussianIcon} alt="Language Flag" />
                                <span className={styles["player-number"]}>Player {index + 1}</span>
                            </div>
                        )
                    })}
                </div>
                <ul className={styles["actions"]}>
                    <li className={styles["action-container"]}>
                        <a href="https://t.me/cimber_bot" target="_blank" rel="noreferrer" className={styles["action"]}>{store.lang.film.player.tab.opts.question}</a>
                    </li>
                    <li className={styles["action-container"]}>
                        <a href="https://t.me/cimber_bot" target="_blank" rel="noreferrer" className={styles["action"]}>{store.lang.film.player.tab.opts.issue}</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Player