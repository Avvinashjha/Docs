import { useRef, useState } from "react";

const ReactRef = () => {
    const countRef = useRef(0);
    const [count, setCount] = useState(0);

    return <div>
        <div>
            <h1>Use State Counter</h1>
            <h2>{count}</h2>
            <button onClick={()=> setCount(prev => prev + 1)}>Add</button>
            <button onClick={()=> {
                countRef.current = countRef.current + 1;
                setCount(countRef.current);
            }}>Sub</button>
        </div>
        <div>
            <h1>Use Ref Counter</h1>
            <h2></h2>
            <button onClick={()=> countRef.current + 1}>Add</button>
        </div>
    </div>
}

export default ReactRef;