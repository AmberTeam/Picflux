import { useState, useRef, useEffect, FC, useMemo } from "react";
import store from "../../store/store";
import styles from "./index.module.scss";
import { ReactComponent as PinIcon } from "../../icons/Pin.svg";
import { ReactComponent as AdIcon } from "../../icons/Ad.svg";
import FCRService from "../../services/FCRService";
import { IPlayer } from "../../interfaces/IFilm";
import PlayerController from "../PlayerController";
import PlayerTab from "../PlayerTab";
import { observer } from "mobx-react-lite";

interface Props {
    players: IPlayer[]
}

const Player: FC<Props> = ({ players }) => {
    const defaultSelectedPlayer = useMemo(() => {
        const savedPlayer = localStorage.getItem("player");
        if (savedPlayer) {
            return players.find(player => player.url === savedPlayer) ?? players[0];
        }
        return players[0];
    }, []);
    const [isFixed, setIsFixed] = useState<boolean>(localStorage.getItem("pinned") === "true");
    const [adMode, setAdMode] = useState<boolean>(localStorage.getItem("ad") === "true");
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayer>(defaultSelectedPlayer);
    const playerRef = useRef<HTMLIFrameElement>(null);
    const controllersRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [selectedPlayerDoc, setSelectedPlayerDoc] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        FCRService.rewriteByHostname(selectedPlayer.url)
            .then(response => {
                if (response.status === "ok") {
                    setSelectedPlayerDoc(response.data ?? "");
                    setError(false);
                }
                else {
                    setError(true);
                }
            });
    }, [selectedPlayer]);
    useEffect(() => {
        const handleMouseEnter = () => {
            controllersRef.current?.classList.add(styles.inactive);
            sidebarRef.current?.classList.add(styles.inactive);
        };
        const handleMouseLeave = () => {
            controllersRef.current?.classList.remove(styles.inactive);
            sidebarRef.current?.classList.remove(styles.inactive);
        };
        if (playerRef.current) {
            playerRef.current.addEventListener("mouseenter", handleMouseEnter);
            playerRef.current.addEventListener("mouseleave", handleMouseLeave);
        }
        
        return () => {
            if (playerRef.current) {
                playerRef.current.removeEventListener("mouseenter", handleMouseEnter);
                playerRef.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [selectedPlayerDoc]);
    return (
        <div className={styles["player-container"]}>
            <div ref={controllersRef} className={`${styles["player-controllers"]} ${isFixed ? "" : styles["is-not-fixed"]}`}>
                <PlayerController
                    onClick={() => {
                        setIsFixed(wasFixed => {
                            localStorage.setItem("pinned", wasFixed ? "false" : "true");
                            return !wasFixed;
                        });
                    }}
                    className={styles["full-size-only"]}
                    isSelected={isFixed}
                    Icon={PinIcon}
                />
                <PlayerController
                    onClick={() => {
                        setAdMode(wasInAdMode => {
                            localStorage.setItem("ad", wasInAdMode ? "false" : "true");
                            return !wasInAdMode;
                        });
                    }}
                    Icon={AdIcon}
                    isSelected={adMode}
                />
            </div>
            {error ?
                <div className={styles.player} style={{ color: "black", backgroundColor: "red"}}>Hola</div>
                : <iframe ref={playerRef} className={styles.player} srcDoc={adMode ? undefined : selectedPlayerDoc} src={adMode ? selectedPlayer.url : undefined} />
            }
            <div ref={sidebarRef} className={`${styles["player-sidebar"]} ${isFixed ? "" : styles["is-not-fixed"]}`}>
                <div className={styles["change-player-container"]}>
                    {players.map((player, index) => {
                        return (
                            <PlayerTab
                                onClick={() => {
                                    setSelectedPlayer(player);
                                    localStorage.setItem("player", player.url);
                                }}
                                player={player}
                                isSelected={player === selectedPlayer}
                                playerName={`Player ${index + 1}`}
                                key={player.url}
                            />
                        );
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
    );
};

export default observer(Player);