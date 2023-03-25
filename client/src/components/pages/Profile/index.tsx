import { observer } from 'mobx-react-lite'
import {FC, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import cl from "./index.module.sass"
import {Context} from "../../../"
import { useTranslation } from '../../../hooks/translator.hook'
import { IUser, IUserAuthorityResponse } from '../../../models/IUser'
import UserService from '../../../services/UserService'
import Film from "../Home/Film"
import { IFilm } from '../../../models/IFilm'
import FilmList from '../../FilmList'
import LoaderMini from '../../UI/LoaderMini'
import UndefinedRoutePage from '../UndefRoute'
import { AxiosResponse } from 'axios'
import AllowAuth from '../../AllowAuth'
import AllowOwner from '../../AllowOwner'
import ContentModal from '../../ContentModal'

const ProfilePage = () => {

    const {translate} = useTranslation()
    const {store} = useContext(Context)
    const { id } = useParams()

    const [user, setUser] = useState<IUser | null>(null)
    const [err, setErr] = useState<boolean>(false)
    const [tab, setTab] = useState<number>(0)
    const [followActionLoading, setFAL] = useState<boolean>(false)
    const [profileEditConfig, setPEC] = useState<IUser>(store.user)
    const [profileEditModalActive, setPEMA] = useState<boolean>(false)
    const [profileEditErrs, setPEE] = useState<string[]>([])
    const [profileEditModalLoading, setPEML] = useState<boolean>(false)
    const [previewFile, setPreviewFile] = useState<File | null>(null)
    
    const reloadWL = async(): Promise<void> => {
        try {
            const response = await UserService.getUserBId(id as string, true)
            setUser({...response.data})
        } catch(e) {
            setErr(true)
        }
    }

    const fetchUser = async (current: boolean): Promise<void> => {
        try {
            const response = await UserService.getUserBId(id as string, current)
            if(!response.data) setErr(true)
            else setUser({...response.data})
        } catch(e) {
            return setErr(true)
        }
    }

    const friendshipAction = async(): Promise<void> => {
        setFAL(true)
        try {
            var response:AxiosResponse;
            switch(user?.subscribed) {
                case true:
                    response = await UserService.describeUser(user!.id)
                    setUser({...user, subscribed: false, friends: user.friends?.filter(p => p.id !== store.user.id)})
                    break
                case false: 
                    response = await UserService.subscribeUser(user!.id)
                    setUser({...user, subscribed: true, friends: [...user?.friends as IUser[], store.user]} as IUser)
                    break
            }
        } catch(e) {
            console.error(e)
            store.callLogModal({ 
                code: "x1",
                alt: "Unknown error. Please check that the data you entered is correct.",
                status: 0
            })
        } finally {
            setFAL(false)
        }
    }

    const previewSelectedAvatar = (data:any) => {
        setPreviewFile(data)
        const url = URL.createObjectURL(data)
        setPEC({...profileEditConfig, avatar: url})
    }

    const verifyDataAuthenticity = async(): Promise<void> => {
        const response:AxiosResponse<IUserAuthorityResponse> = await UserService.verifyDataAuthority({username: profileEditConfig.username})
        if(response.data.username === 1) setPEE([...profileEditErrs, "username"])
        else setPEE([...profileEditErrs.filter(p => p !== 'username')])
    }

    const updateUserData = async(): Promise<void> => {
        setPEML(true)
        try {
            const formData = new FormData()
            formData.append("avatar", previewFile!)
            formData.append("username", profileEditConfig.username)
            formData.append("biography", profileEditConfig.biography)
            const response = await UserService.update(formData)
            if(response.data.data) {
                setUser({...user, 
                    username: response.data.data.username,
                    avatar: response.data.data.avatar,
                    biography: response.data.data.biography
                } as IUser)
                store.setUser({...store.user, 
                    username: response.data.data.username,
                    avatar: response.data.data.avatar,
                    biography: response.data.data.biography
                })
            }
        } catch(e) {
            console.error(e)
        } finally {
            setPEMA(false)
            setPEML(false)
        }
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => verifyDataAuthenticity(), 700);
        return () => clearTimeout(timeOutId);
    }, [profileEditConfig])

    useEffect(() => {
        fetchUser(id === store.user.id ? true : false)
    }, [id])

    if(err) return <UndefinedRoutePage/>

    if(!user) return <div className={cl.Loading_container}>
        <LoaderMini variant="loading-large"/>
        <span>Loading user data...</span>
    </div>
    
    return (
        <>
            <ContentModal 
                active={profileEditModalActive} 
                exec_alt={
                    <button 
                        disabled={profileEditErrs.length ? true : false} 
                        className={`${cl.SaveBtn} ${profileEditErrs.length && cl.Disabled}`} 
                        onClick={() => !profileEditErrs.length && updateUserData()}
                    >
                        save
                    </button>
                } 
                title={"Edit profile"} 
                exec={() => setPEMA(false)}
            >
                <div className={cl.Blurer}></div>
                <div className={cl.ProfileEdit_container}>
                    <div className={cl.ProfileEdit_avatar}>
                        <input type="file" id={"avatar"} style={{display: "none"}} onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && previewSelectedAvatar(e.target.files[0])}/>
                        <label htmlFor={"avatar"} className={cl.Avatar_changer}>
                            <div className={cl.Blurer}>
                                <span className={cl.Changer_ic}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
                                    </svg>
                                </span>
                            </div>
                            <img className={cl.Avatar_img} src={profileEditConfig.avatar ? profileEditConfig.avatar : store.user.avatar}/>
                        </label>
                    </div>
                    <div className={cl.Data_edit}>
                        <div className={cl.DataEdit_header}>
                            Username
                        </div>
                        <div className={cl.DataEdit_body}>
                            <input
                                className={`${profileEditErrs.includes('username') ? cl.Err : cl.Default}`}
                                placeholder={'Enter username'}
                                defaultValue={store.user.username}
                                onChange={(e) => setPEC({...profileEditConfig, username: e.target.value})}
                            />
                            {profileEditErrs.includes('username') && <span className={cl.Err_txt}>This username already taken!</span>}
                        </div>
                    </div>
                    <div className={cl.Data_edit}>
                        <div className={cl.DataEdit_header}>
                            Bio
                        </div>
                        <div className={cl.DataEdit_body}>
                            <input
                                className={cl.Username_edit}
                                placeholder={'Enter biography'}
                                defaultValue={store.user.biography}
                                onChange={(e) => setPEC({...profileEditConfig, biography: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </ContentModal>
            <section className={`section_cls ${cl.Profile_section}`}>
                <div className={cl.Profile_header}>
                    <div className={cl.Avatar_container}>
                        <div className={cl.Line}></div>
                        <div className={cl.Avatar} draggable={false}>
                            <img src={user.avatar}/>
                        </div>
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
                                    <h3>{user.friends ? user.friends.length : 0}</h3>
                                    <span>friends</span>
                                </div>
                                <div className={cl.Stat_separator}></div>
                                <div className={`${cl.Stat_status} ${cl.Stat}`}>
                                    <h3> Kino Geek </h3>
                                    <span>identity</span>
                                </div>
                                <div className={cl.Stat_separator}></div>
                                <div className={`${cl.Stat_status} ${cl.Stat}`}>
                                    <h3>{user.status ? "Online" : 'Offline'}</h3>
                                    <span>status</span>
                                </div>
                            </div>
                        </div>
                        {
                            user.biography 
                                &&
                                <div className={cl.Profile_bio}>
                                    {user.biography}
                                </div>
                        }
                        <div className={cl.Profile_actions}>
                            <AllowAuth>
                                <button className={`${cl.Subscribe_btn} ${""}`} onClick={() => friendshipAction()}>
                                    {
                                        followActionLoading 
                                            ?
                                            <LoaderMini variant={'medium-small'}/>
                                            :
                                            <>
                                                <span>{user.subscribed ? "describe" : "subscribe"}</span>
                                                {
                                                    user.subscribed 
                                                        ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                                        </svg>
                                                }
                                            </>
                                    }
                                </button>
                            </AllowAuth>
                            <button className={cl.Subscribe_btn}>
                                <span>share</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                </svg>
                            </button>
                            <button className={cl.Subscribe_btn}>
                                <span>chat</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                            </button>
                            <AllowOwner compareid={user.id}>
                                <button className={cl.Subscribe_btn} onClick={() => setPEMA(true)}>
                                    <span>edit</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"/>
                                    </svg>
                                </button>
                            </AllowOwner>
                        </div>
                        <div className={cl.Content_body}>
                            <div className={cl.Opts_container}>
                                <button className={`${cl.Opt} ${cl.Default} ${tab == 0 && cl.Active}`} onClick={() => setTab(0)}>
                                    <span>
                                        {translate("profile.tabs.wl")}
                                    </span>
                                    <div className={cl.Border}></div>
                                </button>
                                <div className={cl.Border_spacer}></div>
                                <button className={`${cl.Opt} ${cl.Default} ${tab == 3 && cl.Active}`} onClick={() => setTab(3)}>
                                    <span>
                                        PlayLists
                                    </span>
                                    <div className={cl.Border}></div>
                                </button>
                                <div className={cl.Border_spacer}></div>
                                <button className={`${cl.Opt} ${cl.Default} ${tab == 1 && cl.Active}`} onClick={() => setTab(1)}>
                                    <span>
                                        {translate("profile.tabs.act")}
                                    </span>
                                    <div className={cl.Border}></div>
                                </button>
                                <div className={cl.Border_spacer}></div>
                                <button className={`${cl.Opt} ${cl.Default} ${tab == 2 && cl.Active}`} onClick={() => setTab(2)}>
                                    <span>
                                        {translate("profile.tabs.friends")}
                                    </span>
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
                                        <FilmList observerElem={undefined} ready={user ? true : false} notfound={false} films={user.watchLater.map((wlf) => {
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
        </>
    )
}

export default observer(ProfilePage)