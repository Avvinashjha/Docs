import { useState } from "react";
import "./style.css";

function Counter () {
    let [count, setCount] = useState(0);
    
    function handleClick (action){
        console.log(action);
        console.log(count);
        
        
        if(action === "plus"){
             setCount(count + 1)
        }
        else if(action === "minus"){
            setCount(count -1);
        }else if(action === "reset"){
            setCount(0);
        }
    }
    return <div className="container">
        <h1>count: {count}</h1>
        <button  onClick={()=>handleClick("plus")}>+</button>
        <button  onClick={() => handleClick("minus")}>-</button>
        <button  onClick={()=>handleClick("reset")}>reset</button>
    </div>
}

export default Counter;