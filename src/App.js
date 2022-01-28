import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AsyncThunkGet, AsyncThunkPost, deletask } from "./Components/Reducer";
import { Input, Button, Card, CardContent } from "@mui/material";

function App() {
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  
  const count = useSelector((state) => state.ToDo[0]);

  useEffect(() => {
    dispatch(AsyncThunkGet());
  }, []);

  console.log("useselector",count);
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={(e) => {
            setinput(e.target.value);
          }}
        ></Input>
        <Button
          type="submit"
          disabled={!input}
          onClick={() =>
            {dispatch(
              AsyncThunkPost({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: input,
                  userId: 1,
                }),
              })
            )
            setinput('')}
          }
        >
          Add
        </Button>
      </form>
      <Card>
        {count &&
          count.map((row, index) => (
            <CardContent key={row.id}>
              {row.title}
              <Button onClick={() => dispatch(deletask(index))}>delete</Button>
            </CardContent>
          ))}
      </Card>
    </div>
  );
}

export default App;
