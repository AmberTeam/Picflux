import {useEffect, useState, useRef, useContext} from 'react'
import { IFilm } from '../../../models/IFilm'
import {useParams} from 'react-router-dom'
import cl from "./film.module.sass"
import UserService from "../../../services/UserService"
import AllowAuth from '../../AllowAuth'
import { useTranslation } from '../../../hooks/translator.hook'
import { observer } from 'mobx-react-lite'
import FCRService from '../../../services/FCRService'
import { config } from 'process'
import { useResizeHandler } from '../../../hooks/resizehandler.hook'
import { Context } from '../../..'

const FilmPage = () => {
    
    const {store} = useContext(Context)
    const {translate} = useTranslation()
    const [descTab, setDescTab] = useState<number>(1)
    const [film, setFilm] = useState<IFilm | null>(null)
    const [fAvailablePTabs, setFAvailablePTabs] = useState<[any]>([null])
    const [activePSelector, setActivePSelector] = useState<boolean>(true)
    const [originalPlayerFlag, setOriginalPlayerFlag] = useState<boolean>(false)
    const [mobileOriented, setMobileOriented] = useState<boolean>(false)
    const [rPlayer, setRPlayer] = useState<any>()

    useResizeHandler((w: number) => {
        if(w > 1000) setMobileOriented(false)
        if(w < 1000) setMobileOriented(true)
    })
    
    const {id} = useParams()

    const reparseFilmConfig = (config: IFilm) => {
        const deartefacted_plrs = config.players.map((player, i) => {
            const durl = FCRService.deartefactUrl(player as any)
            return {
                url: durl,
                index: i + 1,
                ps_index: i + 1,
                variant: 0
            }
        })
        deartefacted_plrs.map(dplr => {
            deartefacted_plrs.push({
                ...dplr,
                index: deartefacted_plrs.length + 1,
                variant: 1
            })
        })
        return {
            ...config, 
            players: deartefacted_plrs as any,
            genres: JSON.parse(config?.genres as any),
            countries: JSON.parse(config?.countries as any)
        } as IFilm
    }

    const rewriteFilmDomByEmbeedUrl = async(playerConf: any) => {
        if(originalPlayerFlag) setOriginalPlayerFlag(false)
        const rewriteddom = await FCRService.rewriteByHostname(playerConf.url)
        setRPlayer({content: rewriteddom, config: playerConf})
    }

    const initOriginalPlayer = (playerConf: any) => {
        setOriginalPlayerFlag(true)
        setRPlayer({
            content: playerConf.url,
            config: playerConf
        })
    }

    const getFilmData = async () => {
        const response = await UserService.getById(id)
        localStorage.setItem('last_seen', String(response.data.id))
        const filmConfig = reparseFilmConfig(response.data)
        setFAvailablePTabs(filmConfig.players as any)
        setFilm(filmConfig)
        rewriteFilmDomByEmbeedUrl(filmConfig.players[0])
    }

    const changeActivePSelector = () => {
        if(!mobileOriented)
            setActivePSelector(activePSelector ? false : true)
    }

    useEffect(() => {
        store.callLogModal({code: "ad_ts_wrn", status: 1, alt: "test"})
    }, [])

    useEffect(() => {
        getFilmData()
        window.addEventListener("message", (event: any) => { 
            if(!event) return 
            if(!event.data) return
            if(typeof event.data === 'string')
            if(event.data && event.data.includes('voidboost')) {
                rewriteFilmDomByEmbeedUrl(event.data)
            }
        }, false);
    }, [id])

    if(!film || !rPlayer) return <div className={cl.Loader_container}>Loading film configuration</div>

    return (
        <div className={cl.FilmPage_container}>
            <div className={cl.Top_inner}>
                <div className={cl.Poster}>
                    <img src={film.poster}/>
                </div>
                <div className={cl.Content}>
                    <div className={cl.Header}>
                        <h1>{film.name} ({film.year})</h1>
                        <div className={cl.Btns}>
                            <AllowAuth>
                                <button className={cl.Add_wread}>
                                    {translate("film.actions.watch_later")}
                                </button>
                            </AllowAuth>
                            <a href="#frame" className={cl.Watch}>
                               {translate("film.actions.watch")}
                            </a>
                        </div>
                        <div className={cl.Pager}>
                            <div className={cl.Pager_headers}>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment1} ${descTab == 1 ? cl.Pager_descTab : cl.Pager_inactive}`}>
                                    <div className={cl.Name} onClick={() => setDescTab(1)}>
                                        <h3>{translate("film.info.header.overwiev")}</h3>
                                    </div>
                                </div>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment2} ${descTab == 2 ? cl.Pager_descTab : cl.Pager_inactive}`}>
                                    <div className={cl.Name} onClick={() => setDescTab(2)}>
                                        <h3>{translate("film.info.header.reviews")}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.Pager_content}>
                                {
                                    descTab == 1 &&
                                    <div className={cl.Overwiev}>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("film.info.main.release")}: </span>
                                            <span className={cl.Inf_res}> {film.year} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {film.countries.length > 1 ? translate("film.info.main.country_.countries") : translate("film.info.main.country_.country")}:  </span>
                                            <span className={cl.Inf_res}> {film.countries.map((country, index) => {
                                                if(index + 1 == film.countries.length) {
                                                    return (
                                                        <span key={country}> {country} </span>
                                                    )
                                                }
                                                return (
                                                    <span key={country}> {country}, </span>
                                                )
                                            })} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {film.genres.length > 1 ? translate("film.info.main.genre_.genres") : translate("film.info.main.genre_.genre")}: </span>
                                            <span className={cl.Inf_res}> {film.genres.map((genre, index) => {
                                                if(index + 1 == film.genres.length) {
                                                    return (
                                                        <span key={genre}> {genre} </span>
                                                    )
                                                }
                                                return (
                                                    <span key={genre}> {genre}, </span>
                                                )
                                            })} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("film.info.main.duration")}: </span>
                                            <span className={cl.Inf_res}> {film.duration} </span> 
                                        </div>
                                    </div>
                                }
                                {
                                    descTab == 2 && 
                                    <div>
                                        Comming soon!
                                    </div>  
                                }
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className={cl.Bottom_inner}>
                <div className={cl.Description}>
                    {film.description.replace("© ГидОнлайн", "")}
                </div>
                <div className={cl.Frame_container} id="frame">
                    <div className={`${cl.PlayerTabs_container} ${activePSelector && cl.Active}`}>
                        <div className={cl.Tabs_inner}>
                            {
                                fAvailablePTabs.map((pl, i) => {
                                    return (
                                        <button key={pl.index} className={`${cl.Tab} ${i === 0 && cl.First} ${pl.index == rPlayer.config.index && cl.Active}`} onClick={() => {
                                            if(pl.variant === 0) rewriteFilmDomByEmbeedUrl(pl)
                                            else initOriginalPlayer(pl)
                                        }}>
                                            <span className={cl.Tab_content}>
                                                {translate("film.player.tab.player")} {pl.ps_index} {pl.variant === 1 ? <span className={cl.Ad_prefix}> (With ads) </span> : <span className={cl.NoAd_prefix}> (No Ads) </span>}
                                            </span>
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className={cl.Tabs_inner}>
                            <a className={cl.Tab} href="https://t.me/cimber_bot" target="_blank">
                                <span className={cl.Tab_content}>
                                    {translate("film.player.tab.opts.question")}
                                </span>
                            </a>
                            <a className={cl.Tab} href="https://t.me/cimber_bot" target="_blank">
                                <span className={cl.Tab_content}>
                                    {translate("film.player.tab.opts.issue")}
                                </span>
                            </a>
                        </div>
                    </div>
                    {
                        originalPlayerFlag 
                            ?
                            <iframe 
                                className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                src={rPlayer.content} 
                                onMouseEnter={() => changeActivePSelector()} 
                                onMouseLeave={() => changeActivePSelector()}
                                allowFullScreen
                            />
                            :
                            <iframe 
                                className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                srcDoc={rPlayer.content} 
                                onMouseEnter={() => changeActivePSelector()} 
                                onMouseLeave={() => changeActivePSelector()}
                                allowFullScreen
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(FilmPage)