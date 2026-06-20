import {  useReducer, useState } from "react"

type CalcState = {
    num: number
}

type CalcAction = 
 | {type: "ADD",payload: number} 
 | {type: "SUB", payload: number}
 | {type: "PROD", payload: number}
 | {type: "DIV", payload: number}

const calcReducer = (state: CalcState, action: CalcAction):CalcState => {
    switch(action.type){
        case "ADD":
            return {num: state.num + action.payload}
        case "SUB":
            return {num: state.num - action.payload}
        case "DIV":
            return {num: state.num / action.payload}
        case "PROD":
            return {num: state.num * action.payload}
        default:
            return state;
    }
}

const INITIAL_STATE: CalcState = {num: 0}

const SimpleCalc = () => {
    const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);
    const [currentNum, setCurrentNum] = useState(state.num);

    const handleInputChange = (e: { target: { value: string } }) => {
        console.log(e.target.value)
        setCurrentNum(parseFloat(e.target.value))
    }

    const handleAdd = () => {
        dispatch({type:"ADD", payload: currentNum})
    }

    const handleProd = () =>{
        dispatch({type:"PROD", payload: currentNum})
    }

    const handleDiv = () => {
         dispatch({type:"DIV", payload: currentNum})
    } 

    const handleSub = () => {
         dispatch({type:"SUB", payload: currentNum})
    }

    return (
        <div>
            <div>
                <div onClick={handleAdd}>+</div>
            </div>
            <div>
                <div onClick={handleProd}>*</div>
                <div><input type="number" min="0"  value={currentNum} onChange={handleInputChange}></input><span>{state.num}</span></div>
                <div onClick={handleDiv}>/</div>
            </div>
            <div>
                <div onClick={handleSub}>-</div>
            </div>
        </div>
    )
}

export default SimpleCalc;