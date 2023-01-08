import {useEffect, useState, useRef} from 'react'
import { IFilm } from '../../../models/IFilm'
import {useParams} from 'react-router-dom'
import cl from "./film.module.sass"
import UserService from "../../../services/UserService"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import AllowAuth from '../../AllowAuth'
import { useTranslation } from '../../../hooks/translator.hook'
import { observer } from 'mobx-react-lite'
import FCRService from '../../../services/FCRService'

const FilmPage = () => {
    
    const {translate} = useTranslation()
    const [active, setActive] = useState<number>(1)
    const [film, setFilm] = useState<IFilm | null>(null)
    const [rPlayer, setRPlayer] = useState<string>()
    const [adPlayer, setAdPlayer] = useState<string>()
    
    const {id} = useParams()

    const reparseFilmConfig = (config: IFilm) => {
        return {
            ...config, 
            genres: JSON.parse(config?.genres as any),
            countries: JSON.parse(config?.countries as any)
        } as IFilm
    }

    const rewriteFilmDomByEmbeedUrl = async(embeedurl: string) => { 
        console.log(embeedurl)
        const rewriteddom = await FCRService.rewriteByHostname(embeedurl)
        setRPlayer(rewriteddom)
    }

    const getFilmData = async () => {
        const response = await UserService.getById(id)
        const filmConfig = reparseFilmConfig(response.data)
        setFilm(filmConfig)
        const deartefacted = FCRService.deartefactUrl(filmConfig.players[0] as any)
        setAdPlayer(deartefacted)
        const rewriteddom = await FCRService.rewriteByHostname(filmConfig.players[0] as any)
        setRPlayer(rewriteddom as any)
        
    }

    useEffect(() => {
        getFilmData()
        window.addEventListener("message", (event: any) => { 
            if(event && event.data && event.data.includes('voidboost')) {
                rewriteFilmDomByEmbeedUrl(event.data)
            }
        }, false);
    }, [id])

    if(!film) return <div className={cl.Loader_container}>Loading film configuration</div>

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
                                    {translate("profile.actions.watch_later")}
                                </button>
                            </AllowAuth>
                            <a href="#frame" className={cl.Watch}>
                               {translate("profile.actions.watch")}
                            </a>
                        </div>
                        <div className={cl.Pager}>
                            <div className={cl.Pager_headers}>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment1} ${active == 1 ? cl.Pager_active : ""}`}>
                                    <div className={cl.Name} onClick={() => setActive(1)}>
                                        <h3>{translate("profile.info.header.overwiev")}</h3>
                                    </div>
                                </div>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment2} ${active == 2 ? cl.Pager_active : ""}`}>
                                    <div className={cl.Name} onClick={() => setActive(2)}>
                                        <h3>{translate("profile.info.header.reviews")}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.Pager_content}>
                                {
                                    active == 1 &&
                                    <div className={cl.Overwiev}>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("profile.info.main.release")}: </span>
                                            <span className={cl.Inf_res}> {film.year} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {film.countries.length > 1 ? translate("profile.info.main.country_.countries") : translate("profile.info.main.country_.country")}:  </span>
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
                                            <span className={cl.Inf_row}> {film.genres.length > 1 ? translate("profile.info.main.genre_.genres") : translate("profile.info.main.genre_.genre")}: </span>
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
                                            <span className={cl.Inf_row}> {translate("profile.info.main.duration")}: </span>
                                            <span className={cl.Inf_res}> {film.duration} </span> 
                                        </div>
                                    </div>
                                }
                                {
                                    active == 2 && 
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
                    {film.description}
                </div>
                <div className={cl.Frame_container} id="frame">
                    <iframe className={cl.Frame} srcDoc={rPlayer}/>
                </div>
            </div>
        </div>
    )
}

export default observer(FilmPage)