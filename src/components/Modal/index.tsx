import { observer } from "mobx-react-lite";
import { FC, MouseEvent, ReactNode, useRef } from "react";
import styles from "./index.module.scss";

interface Props {
    isActive: boolean
    close: () => void
    children: ReactNode
    className?: string
}

const Modal: FC<Props> = ({ close, isActive, children, className }) => {
    const blurerRef = useRef<HTMLDivElement>(null);
    const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        if (blurerRef.current === event.target) {
            close();
        }
    };
    return (
        <div
            className={`${styles["modal-container"]} ${isActive ? "" : styles.inactive}`}
            onClick={handleClick}
            ref={blurerRef}
        >
            <div className={`${styles.modal} ${isActive ? styles.active : ""} ${className ?? ""}`}>
                {children}
            </div>
        </div>
    );
};

export default observer(Modal);