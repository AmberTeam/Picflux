import { FC, useContext, useEffect, useRef, useState} from "react";
import { IMessage } from "../../../../../models/IMessage";
import cl from '../../index.module.sass'
import { Context } from "../../../../..";
import { IUserMin } from "../../../../../models/IUser";
import TimeVisualizator from "../../../../TimeVisualizator";
import InboxService from "../../../../../services/InboxService";

interface IMessageProps {
    message: IMessage
    observer: IUserMin
    onRender?: any 
    onReply: (arg:IMessage) => void
    onDelete: (arg:IMessage) => void
    onEdit: (arg:IMessage) => void
}

const Message:FC<IMessageProps> = (props: IMessageProps) => {

    const {store} = useContext(Context)
    const [controllerActive, setControllerActive] = useState<boolean>(false)

    useEffect(() => {
        if(props.onRender) {
            props.onRender()
        }
    }, [])

    
    return (
        <div className={`${cl.Message_container} ${props.message.owner === store.user.id ? cl.Current : cl.Default}`} id={props.message._id}>
            <img draggable={false} onDragStart={() => false} src={props.message.owner === store.user.id ? store.user.avatar : props.observer.avatar} className={cl.Message_avatar}/>
            <span className={cl.Message_payload}>
                {
                    props.message.type === 'reply' && props.message.refer
                    &&
                    <div className={cl.Reply_container}>
                        <div className={cl.Reply_spacer}> </div>
                        <div className={cl.Reply_content}>
                            {
                                props.message.refer._id && props.message.refer._id !== "deleted"
                                    ?
                                    <>
                                        <div className={cl.Reply_username}>
                                            {props.message.refer.owner === store.user.id ? store.user.username : props.observer.username}
                                        </div>
                                        <div className={cl.Reply_payload}>
                                            {props.message.refer.payload}
                                        </div>                      
                                    </>
                                    :
                                    <div className={cl.Reply_payload}>
                                        Deleted message
                                    </div>   
                            }
                        </div>
                    </div>
                }
                <div className={cl.Message_content}>
                    <span>{props.message.payload}</span>
                    <div className={cl.Message_info}>
                        <div className={`${cl.Info_seen}`}>
                            {
                                props.message.seen 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg>
                            }
                        </div>
                    </div>
                </div>
            </span>
            <div className={cl.Message_actions}>
                <div className={`${cl.Message_action} ${controllerActive ? cl.Active : ""}`} onClick={() => !controllerActive && setControllerActive(true)}>
                    <svg className={cl.Ic} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    <div className={cl.Action_controller}>
                        <button title="Send a reply to a message" className={cl.Action} onClick={() => {
                            props.onReply(props.message)
                            setControllerActive(false)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                            </svg>
                        </button>
                        {
                            props.message.owner === store.user.id &&
                            <>
                                <button title="Delete message" className={cl.Action} onClick={() => props.onDelete(props.message)}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                <button title="Edit message" className={cl.Action} onClick={() => props.onEdit(props.message)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotateZ(-90deg)'}} viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </button>
                            </>
                        }
                        <button title="Close tab" className={cl.Action} onClick={() => setControllerActive(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message