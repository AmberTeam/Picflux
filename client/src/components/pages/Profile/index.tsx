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
import FilmList from '../../FilmList'

const ProfilePage = () => {

    const {translate} = useTranslation()
    const {store} = useContext(Context)
    const { id } = useParams()

    const [user, setUser] = useState<IUser | null>(null)
    const [err, setErr] = useState<boolean>(false)
    const [tab, setTab] = useState<number>(0)
    
    const reloadWL = async() => {
        try {
            const response = await UserService.getUserBId(id as string, true)
            setUser({...response.data})
        } catch(e) {
            setErr(true)
        }
    }

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
                        <div className={cl.Opts_container}>
                            <button className={`${cl.Opt} ${cl.Default} ${tab == 0 && cl.Active}`} onClick={() => setTab(0)}>
                                <span>WatchLater</span>
                                <div className={cl.Border}></div>
                            </button>
                            <div className={cl.Border_spacer}></div>
                            <button className={`${cl.Opt} ${cl.Default} ${tab == 1 && cl.Active}`} onClick={() => setTab(1)}>
                                <span>Activity</span>
                                <div className={cl.Border}></div>
                            </button>
                            <div className={cl.Border_spacer}></div>
                            <button className={`${cl.Opt} ${cl.Default} ${tab == 2 && cl.Active}`} onClick={() => setTab(2)}>
                                <span>Friends</span>
                                <div className={cl.Border}></div>
                            </button>
                            <div className={cl.Border_spacer}></div>
                            <button className={`${cl.Opt} ${cl.Last}`}>
                                <div className={cl.Border}></div>
                            </button>
                        </div>
                        <section className={cl.Tab_content}>
                            {
                                tab == 0 && user.watchLater
                                    &&
                                    <FilmList observerElem={undefined} notfound={false} films={user.watchLater.map((wlf) => {
                                        return {...{...wlf, watchLater: user.watchLater, wlChangeCb: reloadWL} as IFilm}
                                    })}/>
                            }
                            {
                                tab == 1 && user.watchLater
                                    &&
                                    <h1>Activity</h1>
                            }
                            {
                                tab == 2 && user.watchLater
                                    &&
                                    <h1>Friends</h1>
                            }
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(ProfilePage)