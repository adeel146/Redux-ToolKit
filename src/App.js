import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AsyncThunkGet, AsyncThunkPost, deletask } from "./Components/Reducer";
import { Input, Button, Card, CardContent } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.ToDo.status);
  const count = useSelector((state) => state.ToDo.data);

  useEffect(() => {
    dispatch(AsyncThunkGet());
  }, []);

  console.log("status", status);
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
            dispatch(
              AsyncThunkPost({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: input,
                  userId: 1,
                }),
              })
            )
          }
        >
          Add
        </Button>
      </form>
      <Card>
        {status === "pending" ? (
          <ClipLoader />
        ) : (
          count && status==="success" &&
          count.map((row, index) => (
            <CardContent key={index}>
              {row.title}
              <Button onClick={() => dispatch(deletask(index))}>delete</Button>
            </CardContent>
          ))
        )}
      </Card>
    </div>
  );
}

export default App;
