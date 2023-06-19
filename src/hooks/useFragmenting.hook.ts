import { useState } from "react";
import { IMessage } from "../interfaces/IMessage";

export default function useFragmenting(fragmentLength: number) {
    const [fragments, setFragments] = useState<IMessage[][]>([]);
    const fragmentMessages = (messages: IMessage[], start = 0): IMessage[][] => {
        if (messages.length) {
            const numberOfFragments: number = Math.ceil((messages.length - start) / fragmentLength);
            const fragments: IMessage[][] = Array.from({ length: numberOfFragments }, () => {
                return [];
            });
            for (let i = start; i < messages.length; i++) {
                const fragmentIndex = Math.floor(i / fragmentLength);
                fragments[fragmentIndex].push({ ...messages[i], last: i === messages.length - 1 });
            }
            return fragments;
        }
        return [];
    };
    const setNewFragments = (newFragments: IMessage[][] | ((previousFragments: IMessage[][]) => IMessage[][])) => {
        if (typeof newFragments === "function") {
            setFragments(previousFragments => newFragments(previousFragments));
        }
        else {
            setFragments(newFragments);
        }
    };
    const removeMessage = (messageId: string) => {
        setFragments(previousFragments => {
            const newFragments: IMessage[][] = [];
            let currentFragmentIndex = 0;
            for(const fragment of previousFragments) {
                for(const message of fragment) {
                    if(message._id === messageId) {
                        continue;
                    }
                    else if(message.refer && typeof message.refer !== "string") {
                        if(message.refer._id === messageId) {
                            message.refer = null;
                        }
                    }
                    if(newFragments[currentFragmentIndex]?.length >= fragmentLength) {
                        currentFragmentIndex++;
                    }
                    if(!newFragments[currentFragmentIndex]) newFragments[currentFragmentIndex] = [];
                    newFragments[currentFragmentIndex].push(message);
                }
            }
            return newFragments;
        });
    };
    const updateFragments = (method: "push" | "unshift" | "replace", newMessages: IMessage[]) => {
        if (method === "push") {
            if (newMessages.length) {
                setFragments(previousFragments => {
                    const lastFragment = previousFragments[previousFragments.length - 1];
                    let index = 0;
                    if (lastFragment) {
                        while (newMessages[index] && lastFragment.length < fragmentLength) {
                            lastFragment.push(newMessages[index]);
                            index++;
                        }
                    }
                    const nextFragments = fragmentMessages(newMessages, index);
                    return [...previousFragments, ...nextFragments];
                });
            }
        }
        else if (method === "unshift") {
            if (newMessages.length) {
                setFragments(previousFragments => {
                    if (newMessages.length % fragmentLength === 0) {
                        const newFragments = fragmentMessages(newMessages);
                        return [...newFragments, ...previousFragments];
                    }
                    else {
                        const previousMessages: IMessage[] = previousFragments.reduce((acc: IMessage[], fragment) => {
                            return [...acc, ...fragment];
                        }, []);
                        const fragments = fragmentMessages([...newMessages, ...previousMessages]);
                        return fragments;
                    }
                });
            }
        }
        else if (method === "replace") {
            setFragments(() => {
                if (newMessages.length) return [newMessages];
                else return [];
            });
        }
    };
    return { fragments, updateFragments, setNewFragments, removeMessage };
}