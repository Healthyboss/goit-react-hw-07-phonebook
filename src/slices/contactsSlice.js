import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
    name:'contacts',
    initialState:[],
    reducers:{
        addContact:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(name, number){
                return{
                payload:{
                    id: nanoid(),
                    name:name,
                    number:number,
                },
            };
        },
    },
    removeContact(state,action){
        return state.filter(contact => contact.id !== action.payload)
    },

    setContacts(state,action){
        return action.payload;
    }
},
});

export const {addContact, setContacts, removeContact} = contactsSlice.actions;
export default contactsSlice.reducer;