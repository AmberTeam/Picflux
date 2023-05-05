import { FC, ReactNode } from "react"
import { IAlert } from ".."
import cl from "./index.module.sass"
import TimeVisualizator from "../../TimeVisualizator"

const InboxAlert:FC<IAlert> = (props: IAlert) => {

    const renderContent:any = ():ReactNode => {
        switch(props.tag) {
            case "sub_inc": 
                return (
                    <div className={cl.Sub_action}>
                        Subscribed you :/
                    </div> 
                ) as ReactNode
            default:
                return <></>
        }
    }

    return (
        <div className={cl.InboxAlert_container}>
            <div className={cl.InboxAlert_intro}>
                <div className={cl.InboxAlert_content}>
                    <img className={cl.InboxAlert_avatar} src={props.owner.avatar}/>
                    <span className={cl.InboxAlert_username}>
                        {props.owner.username}
                    </span>
                </div>
                <div className={cl.InboxAlert_time}>
                    <TimeVisualizator time={props.timestamp}/>
                </div>
            </div>
            <div className={cl.InboxAlert_content}>
                {renderContent()}
            </div>
        </div>
    )
}

export default InboxAlert