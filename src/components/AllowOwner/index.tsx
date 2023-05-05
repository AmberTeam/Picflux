import {FC, ReactNode, useContext} from 'react'
import { Context } from '../..'

type props = {
    compareid:string
    children: ReactNode
}

const AllowOwner: FC<props> = ({children, compareid}) => {

    const {store} = useContext(Context)

    if(store.isAuth && compareid === store.user.id) return <> {children} </>

    return <></>
}

export default AllowOwner