import React, { useRef } from "react"

const FormFocus: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocusClick = () => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="search.."/>
            <button onClick={handleFocusClick}>Click to focus</button>
        </div>
    )
}

export default FormFocus;