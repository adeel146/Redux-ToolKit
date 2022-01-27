import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

let id = 1


export const AsyncThunk=createAsyncThunk('AsyncApi',
async()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/todos/1')
    if (response.ok){
        const data = await response.json();
        return data
    }
}
)
export const ToDoReducer =createSlice({
    name:'todo',
    initialState:[],
    reducers:{
        todo:(state,action)=>{
            const newtodo= {
                userid:1,
                id:++id,
                title:action.payload,
                status:false
            }
            state.push(newtodo)
        },
        deletask:(state,action)=>{
            state.splice(action.payload,1)
        }
    },
    extraReducers:{
        [AsyncThunk.fulfilled]:(state,action)=>{
             state.push( action.payload) 
        }
    }
})

export const {todo,deletask}=ToDoReducer.actions
export default ToDoReducer.reducer