import { FC, MouseEvent, FunctionComponent, SVGProps } from "react";
import styles from "./index.module.scss";

interface Props {
    onClick: (event: MouseEvent<HTMLDivElement>) => void
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>
    className?: string
    isSelected: boolean
}

const PlayerController: FC<Props> = ({ onClick, Icon, className, isSelected }) => {
    return (
        <div 
            className={`${styles["controller-button"]} ${isSelected ? styles.active : ""} ${className ?? ""}`}
            onClick={onClick}
        >
            <Icon className={styles["controller-icon"]} />
        </div>
    );
};

export default PlayerController;