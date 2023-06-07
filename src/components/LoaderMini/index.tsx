import styles from "./index.module.scss"
import { FC } from "react"

interface ILoaderProps {
    variant?: string
}

const LoaderMini: FC<ILoaderProps> = ({ ...props }) => {

    return <span className={`${styles.loader} loader-${props.variant}`}></span>
}

export default LoaderMini