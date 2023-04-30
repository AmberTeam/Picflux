import { FC, useContext, useEffect, useRef, useState } from "react"
import { IMessage } from "../../../../../models/IMessage"
import Message from "../Message"
import { IUserMin } from "../../../../../models/IUser"
import cl from '../../index.module.sass'
import Fragment from "../Fragment"
import { Context } from "../../../../.."
import { observer } from "mobx-react-lite"

interface IMessageList {
    messages: IMessage[]
    observer:IUserMin
    scrollFactor?:boolean
    onRendered:() => void
    onReply: (arg:IMessage) => void
    onDelete: (arg:IMessage) => void
    onEdit: (arg:IMessage) => void
    chatid: string
}

export interface IFragment {
    id: number 
    messages: IMessage[]
    seen: boolean
}

const MessageList:FC<IMessageList> = (props: IMessageList) => {

    const {store, wsc} = useContext(Context)
    const [fragments, setFragments] = useState<IFragment[]>([])
    const fragmentsRef = useRef() as React.MutableRefObject<HTMLDivElement>

    const updateSeenStatuses = (messages:IMessage[]) => {
        const _messages = props.messages.map((msg:IMessage) => {
            for(var i=0;i < messages.length;i++) {
                if(msg._id === messages[i]._id) msg.seen = 1
            }
            return msg
        })
        fragmentMsgs(_messages)
    } 
    
    const fragmentMsgs = (messages:IMessage[]) => {
        if(messages) {
            let fragments:IFragment[] = []
            var d:number = 25
            var de:number = 0
            var fc:number = 0
            var fl:number = Math.ceil(messages.length / d)
            for(var i=0;i < fl;i++) {
                fragments.push({
                    id: i,
                    messages: [],
                    seen: true
                })
            }
            for(var i=0;i < messages.length;i++) {
                if(de !== d && fc < fl) {
                    de++
                    if(i === messages.length - 1) fragments[fc].messages.push({...messages[i], last: true})
                    else fragments[fc].messages.push({...messages[i]})
                } else {
                    if(i === messages.length - 1) fragments[fc].messages.push({...messages[i], last: true})
                    else fragments[fc].messages.push({...messages[i]})
                    fc++
                    de = 0
                }
            }  
            setFragments(fragments)
        }
    }

    function seenHandler(e:any) {
        try {
            const data_p:any = JSON.parse(e.data)
            const messages_p:IMessage[] = JSON.parse(data_p.payload).messages
            if(!messages_p || !messages_p.length) return 
            updateSeenStatuses(messages_p)
        } catch(e) {
            return
        }
    }

    useEffect(() => {
        if(store.isSocketAuth) {
            wsc.addCustomListener('message', seenHandler, false)
        }

        return () => {
            wsc.removeCustomListener('message', seenHandler, false)
        }
    }, [store.isSocketAuth, props.messages])

    useEffect(() => {
        fragmentMsgs(props.messages)
    }, [props.messages, fragmentsRef])
    
    return (
        <>
            {
                fragments.map((fragment:IFragment, i) => {
                    var inc:boolean = false
                    inc = fragment.messages.find(m => m.seen === 0 && m.owner !== store.user.id) ? true : false
                    
                    if(fragment.messages.length) return (
                        <Fragment onEdit={props.onEdit} onDelete={props.onDelete} onReply={props.onReply} seenState={inc} chatid={props.chatid} fragment={fragment} observer={props.observer} onRendered={props.onRendered} key={fragment.id}/>
                    )
                })
            }
        </>
    )
}

export default observer(MessageList)