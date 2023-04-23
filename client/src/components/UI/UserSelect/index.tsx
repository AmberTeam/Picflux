import { FC, useEffect, useState } from "react";
import { IUserMin } from "../../../models/IUser";
import UserService from "../../../services/UserService";
import cl from "./index.module.sass"

interface IUserSelectProps {
    handler: (arg:any) => void
}

const UserSelect:FC<IUserSelectProps> = (props:IUserSelectProps) => {

    const [username, setUsername] = useState<string>("")
    const [results, setResults] = useState<IUserMin[]>([])
    const [active, setActive] = useState<boolean>(false)

    const fetchResults = async (): Promise<void> => {
        if(username === '' || username === " ") return setResults([])
        const response:any = await UserService.searchCandidates(username)
        if(response.data.users) setResults(response.data.users) 
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => fetchResults(), 700);
        return () => clearTimeout(timeOutId);
    }, [username])


    return (
        <>
            <div className={`${cl.UserSelect_blurer} ${active ? cl.Active : cl.Default}`} onClick={() => setActive(false)}></div>
            <div className={`${cl.UserSelect_container} ${active ? cl.Active : cl.Default}`}>
                <input 
                    className={cl.UserSelect_input}
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setActive(true)}
                />
                <div className={cl.UserSelect_results}>
                    {results.length ? results.map((result:IUserMin) => {
                        return (
                            <button className={cl.UserSelect_user} key={result.id} onClick={() => {
                                props.handler(result)
                                setActive(false)
                            }}>
                                <div className={cl.User_promo}>
                                    <img draggable={false} src={result.avatar} className={cl.Avatar}/>
                                    <span className={cl.Username}>{result.username}</span>
                                </div>
                            </button>
                        )
                    }) : 
                        <div className={cl.NotFound_container}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                            </svg>
                            <span>Could not find users with the same username</span>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UserSelect