import {FC, ReactNode, useContext} from 'react'
import { Context } from '../..'

type props = {
    children: ReactNode
}

const AllowNotAuth: FC<props> = ({children}) => {

    const {store} = useContext(Context)

    if(!store.isAuth) return <> {children} </>

    return <></>
}

export default AllowNotAuth