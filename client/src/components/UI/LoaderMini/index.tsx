import cl from "./index.module.sass"
import {FC} from 'react'

interface ILoaderProps {
    variant?: string
}

const LoaderMini: FC<ILoaderProps> = ({...props}) => {

    return <span className={`${cl.Loader} loader-${props.variant}`}></span>
}

export default LoaderMini