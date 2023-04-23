import { FC, useContext, useEffect, useRef, useState} from "react";
import { IMessage } from "../../../../../models/IMessage";
import cl from '../../index.module.sass'
import { Context } from "../../../../..";
import { IUserMin } from "../../../../../models/IUser";

interface IMessageProps {
    message: IMessage
    observer: IUserMin
    onRender?: any 
}

const Message:FC<IMessageProps> = (props: IMessageProps) => {

    const {store} = useContext(Context)

    useEffect(() => {
        if(props.onRender) {
            props.onRender()
        }
    }, [])

    
    return (
        <div className={`${cl.Message_container} ${props.message.owner === store.user.id ? cl.Current : cl.Default}`}>
            <img draggable={false} onDragStart={() => false} src={props.message.owner === store.user.id ? store.user.avatar : props.observer.avatar} className={cl.Message_avatar}/>
            <span className={cl.Message_payload}>
                {props.message.data}
            </span>
            <div className={cl.Message_params_container}>
                <div className={`${cl.Params_seen} ${ props.message.seen ? cl.Active : cl.Default}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Message