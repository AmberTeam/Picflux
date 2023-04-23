import { FC, useContext, useEffect, useRef, useState } from "react"
import { IFragment } from "../MessageList"
import cl from '../../index.module.sass'
import { IMessage } from "../../../../../models/IMessage"
import Message from "../Message"
import { IUserMin } from "../../../../../models/IUser"
import {useObserver} from "../../../../../hooks/observer.hook"
import InboxService from "../../../../../services/InboxService"
import { Context } from "../../../../.."

interface IFragmentProps {
    fragment: IFragment  
    observer: IUserMin
    onRendered: any
    chatid: string
    seenState: boolean
}

const Fragment:FC<IFragmentProps> = (props:IFragmentProps) => {

    const {store, wsc} = useContext(Context)
    const [seenFactor, setSeenFactor] = useState<boolean>(false)
    const fragmentRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [loading, setLoading] = useState<boolean>(true)
    const [canLoad, setCanLoad] = useState<boolean>(true)

    const updateSeenStatus = async (): Promise<void> => {
        //InboxService.updateSeen(props.chatid, JSON.stringify(props.fragment.messages), props.fragment.id, props.observer.id)
        const _messages = []
        for(var i=0;i < props.fragment.messages.length;i++)  {
            if(props.fragment.messages[i].owner !== store.user.id) _messages.push(props.fragment.messages[i])
        }
        console.log(_messages)
        wsc.send('seen', {
            chatid: props.chatid,
            messages: _messages
        })
    }
    
    useObserver(fragmentRef, props.seenState, [props.fragment], loading, () => {
        updateSeenStatus()
    })

    useEffect(() => {
        setLoading(false)
    }, [props.fragment])
    
    return (
        <div className={cl.Fragment_container} ref={fragmentRef}>
            {
                props.fragment.messages.map((msg:IMessage, _i) => 
                    <Message observer={props.observer} onRender={msg.last ? props.onRendered : null} message={msg} key={msg._id}/>
                )
            }
        </div>
    )
}

export default Fragment