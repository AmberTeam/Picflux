import { FC, ReactNode } from "react"
import styles from "./index.module.scss"
interface Props {
    children: ReactNode
    header: string
}

const Filter: FC<Props> = ({header, children}) => {
    return (
        <div className={`${styles.filter}`}>
            <span className={styles["filter-header"]}>{header}</span>
            <div className={styles["filter-content"]}>
                {children}
            </div>
        </div>
    )
}

export default Filter