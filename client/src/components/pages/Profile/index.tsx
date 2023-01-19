import { observer } from 'mobx-react-lite'
import {FC, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import cl from "./index.module.sass"
import {Context} from "../../../"
import { useTranslation } from '../../../hooks/translator.hook'
import { IUser } from '../../../models/IUser'
import UserService from '../../../services/UserService'
import Film from "../Home/Film"
import { IFilm } from '../../../models/IFilm'

const ProfilePage = () => {

    const {translate} = useTranslation()
    const {store} = useContext(Context)
    const { id } = useParams()

    const [user, setUser] = useState<IUser | null>(null)
    const [err, setErr] = useState<boolean>(false)

    const fetchUser = async (current: boolean) => {
        try {
            const response = await UserService.getUserBId(id as string, current)
            setUser({...response.data})
        } catch(e) {
            return setErr(true)
        }
    }

    useEffect(() => {
        fetchUser(id === store.user.id ? true : false)
    }, [id])

    if(!user) return <h1>loading</h1>
    
    return (
        <section className={`section_cls ${cl.Profile_section}`}>
            <div className={cl.Profile_header}>
                <div className={cl.Avatar_container}>
                    <div className={cl.Line}></div>
                    <img className={cl.Avatar} draggable={false} src={user.avatar}/>
                    <div className={cl.Line}></div>
                </div>
            </div>
            <div className={cl.Profile_content}>
                <div className={cl.Content}>
                    <div className={cl.Profile_username}>
                        <h1>{user.username}</h1>
                    </div>
                    <div className={cl.Profile_stats}>
                        <div className={cl.Stats_container}>
                            <div className={`${cl.Stat_friends} ${cl.Stat}`}>
                                <h3>4k</h3>
                                <span>friends</span>
                            </div>
                            <div className={cl.Stat_separator}></div>
                            <div className={`${cl.Stat_status} ${cl.Stat}`}>
                                <h3> Kino Geek </h3>
                                <span>identity</span>
                            </div>
                            <div className={cl.Stat_separator}></div>
                            <div className={`${cl.Stat_status} ${cl.Stat}`}>
                                <h3> Offline </h3>
                                <span>status</span>
                            </div>
                        </div>
                    </div>
                    <div className={cl.Content_body}>
                        <section className={cl.WL_section}>
                            <div className={cl.WL_header}>
                                <h1>Watch Later</h1>
                            </div>
                            {
                                user.watchLater &&
                                    <div className={cl.WL_container}>
                                        {
                                            user.watchLater.map((film: IFilm) => 
                                                <Film {...film} key={film.id}/>
                                            )
                                        }
                                    </div>
                            }
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(ProfilePage)
