import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const AsyncThunk=createAsyncThunk('AsyncApi',
async()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/posts')
    if (response.ok){
        const data = await response.json();
        console.log("fetch",data);
        return data
    }
}
)
export const ToDoReducer =createSlice({
    name:'todo',
    initialState:[],
    reducers:{
        todo:(state,action)=>{
            state[0].push(action.payload)
        },
        deletask:(state,action)=>{
            state.splice(action.payload,1)
        }
    },
    extraReducers:{
        [AsyncThunk.fulfilled]:(state,action)=>{
             state.push(action.payload)
        }
    }
})

export const {todo,deletask}=ToDoReducer.actions
export default ToDoReducer.reducer