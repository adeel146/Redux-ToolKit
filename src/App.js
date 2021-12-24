import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { todo } from './Components/Reducer';
import { AsyncThunk } from './Components/Reducer';



function App() {



  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(AsyncThunk())
  }, [dispatch])



  const [input, setinput] = useState("")
const count = useSelector(state => state.ToDo) 
// console.log(count)
console.log(input)

 return (


<div>
      <div>
        
        <input onChange={e=>{setinput(e.target.value)
          }}>
            
          </input>
        <button onClick={()=>{dispatch(todo(input))}}>
          Add
        </button>
        {count.map(c=>(
          
          <p>
            {c.title}  
              <button id={c.id}>delete</button></p>
          ))}
      </div>
    </div>
  );
}

export default App;
