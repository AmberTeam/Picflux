import { observer } from 'mobx-react-lite'
import React, {FC, useContext, useEffect, useState, useRef } from 'react'
import { IFilm } from "../../../../models/IFilm"
import cl from "./film.module.sass"
import {useNavigate} from "react-router-dom"

const HomePage: FC<IFilm> = (props: IFilm) => {
 
    const navigate = useNavigate()

    return (
        <div className={cl.Film_container}> 
            <div 
                className={cl.Picture}
            >
                <img src={props.poster} className={cl.Img} referrerPolicy={"no-referrer"}/>
                <div className={cl.Blurer} onClick={() => navigate(`/film/${props.id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" viewBox="0 0 16 16">
                        <linearGradient id="gradient">
                            <stop className="main-stop" offset="0%" />
                            <stop className="alt-stop" offset="100%" />
                        </linearGradient>
                        <path fill="url(#gradient)" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                </div>
            </div>
            <div className={cl.Content}>
                <p className={cl.Name}> {props.name} </p>
                <div className={cl.Description}> 
                    {props.year}. {props.genres.map((genre, index) => {
                            if(index + 1 === props.genres.length) {
                                return <span key={genre}> {genre} </span>
                            } else {
                                return <span key={genre}> {genre}, </span>
                            }
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage
