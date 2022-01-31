import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AsyncThunkGet = createAsyncThunk("AsyncApiGet", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (response.ok) {
    const data = await response.json();
    return data;
  }
});

export const AsyncThunkPost = createAsyncThunk("AsyncApiPost", async (prop) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    prop
  );
  const data = await response.json();
  console.log("post", data);
  return data;
});

export const ToDoReducer = createSlice({
  name: "todo",
  initialState: { status: "", data: "" },
  reducers: {
    todo: (state, action) => {
      state.push(action.payload);
    },
    deletask: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunkGet.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(AsyncThunkGet.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(AsyncThunkPost.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(AsyncThunkPost.fulfilled, (state, action) => {
      state.status = "success";
      state.data.push(action.payload);
    });
  },
});

export const { todo, deletask } = ToDoReducer.actions;
export default ToDoReducer.reducer;
