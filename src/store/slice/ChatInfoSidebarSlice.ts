import {createSlice} from "@reduxjs/toolkit";


interface ChatInfoSidebarState {
    isOpen: boolean
}

const initialState: ChatInfoSidebarState = {
    isOpen: true
};

const chatInfoSidebarSlice = createSlice({
        name: "chatInfoSidebar",
        initialState: initialState,
        reducers: {
            reverse:( state) =>{
                state.isOpen = !state.isOpen;
            }
        }
    }
)

export  const  {reverse}=  chatInfoSidebarSlice.actions;
export  default chatInfoSidebarSlice.reducer;