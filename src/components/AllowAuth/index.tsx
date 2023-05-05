import {FC, ReactNode, useContext} from 'react'
import { Context } from '../..'

type props = {
    children: ReactNode
}

const AllowAuth: FC<props> = ({children}) => {

    const {store} = useContext(Context)

    if(store.isAuth) return <> {children} </>

    return <></>
}

export default AllowAuth