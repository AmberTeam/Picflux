import { createSlice } from "@reduxjs/toolkit";
// import { IChat } from "../../interfaces/IDirect";

interface IInbox {
    chats: any[]
}

const initialState: IInbox = {
    chats: []
};

const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
    }
});

export default inboxSlice.reducer;