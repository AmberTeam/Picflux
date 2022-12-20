import { observer } from 'mobx-react-lite'
import React, {FC, useContext, useEffect, useState, useRef } from 'react'
import cl from "./profile.module.sass"
import {Context} from "../../../"
import { useTranslation } from '../../../hooks/translator.hook'
import axios from "axios"
const ProfilePage: FC = () => {

    const {translate} = useTranslation()

    const {store} = useContext(Context)
    
    return (
        <section className={`section_cls ${cl.Profile_section}`}>
            <div className={cl.Profile_header}>
                <div className={cl.Avatar_container}>
                    <div className={cl.Line}></div>
                    <img className={cl.Avatar} draggable={false} src={store.user.avatar}/>
                    <div className={cl.Line}></div>
                </div>
            </div>
            <div className={cl.Profile_content}>
                <div className={cl.Content}>
                    <div className={cl.Profile_username}>
                        <h1>{store.user.username}</h1>
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
                </div>
            </div>
        </section>
    )
}

export default observer(ProfilePage)
