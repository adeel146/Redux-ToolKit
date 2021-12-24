

import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './Reducer'





export const store = configureStore({

    reducer:{

        ToDo:ToDoReducer

    },
})