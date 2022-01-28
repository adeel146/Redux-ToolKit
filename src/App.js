import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todo, deletask } from "./Components/Reducer";
import { AsyncThunk } from "./Components/Reducer";
import { Input,Button, Card, CardContent } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const [input, setinput] = useState("");
  const count = useSelector((state) => state.ToDo);

  useEffect(() => {
    dispatch(AsyncThunk());
  }, []);

  const post = async () => {
    let id = 1;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: false,
        userId: 1,
        id: ++id,
        title: input,
      }),
    };
    const response = await fetch("https://reqres.in/api/posts", requestOptions);
    const data = await response.json();
    dispatch(todo(data));
    console.log("data", data);
  };
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={(e) => {
            setinput(e.target.value);
          }}
        ></Input>
        <Button type="submit" disabled={!input} onClick={post}>
          Add
        </Button>
      </form>
      <Card>
          {count &&
            count.map((row, index) => (
              <CardContent key={row.id}>
                {row.title}
                <Button onClick={() => dispatch(deletask(index))}>
                  delete
                </Button>
              </CardContent>
            ))}
      </Card>
    </div>
  );
}

export default App;
