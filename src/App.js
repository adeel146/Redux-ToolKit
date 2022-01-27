import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todo, deletask } from "./Components/Reducer";
import { AsyncThunk } from "./Components/Reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AsyncThunk());
  }, []);

  const [input, setinput] = useState("");
  const count = useSelector((state) => state.ToDo);
  console.log(count);

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            setinput(e.target.value);
          }}
        ></input>
        <button onClick={() => dispatch(todo(input))}>Add</button>
        {count &&
          count.map((row, index) => (
            <p key={row.id}>
              {row.title}
              <button onClick={() => dispatch(deletask(index))}>delete</button>
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;
