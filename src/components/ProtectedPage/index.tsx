import { FC, ReactNode } from "react"
import store from "../../store/store"
import { Navigate } from "react-router-dom"
import { observer } from "mobx-react-lite"

interface Props {
  children: ReactNode
  hasToBeLoggedIn: boolean
}

const ProtectedPage: FC<Props> = ({ children, hasToBeLoggedIn }) => {
    if(hasToBeLoggedIn) {
        if(store.isAuth) {
            return <>{children}</>
        }
        return <Navigate to="/login" />
    }
    else {
        if(store.isAuth) {
            return <Navigate to="/" />
        }
        return <>{children}</>
    }
}

export default observer(ProtectedPage)