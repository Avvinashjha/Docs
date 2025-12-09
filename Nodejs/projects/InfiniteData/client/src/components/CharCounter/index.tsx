import { useContext, useEffect, useState } from "react";
import "./style.css"
import useLocalStorage from "../../hooks/useLocalStorage";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeContext } from "../../contexts/ThemeContext";
const CharacterCounter = () => {
    const [text, setText] = useLocalStorage("text", "");
    const [value, setValue] = useState<string>(text);
    const [isError, setIsError] = useState<boolean>(false);
    const limit = 30; 
    const theme = useContext(ThemeContext);




    const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setValue(e.target.value);
        setText(e.target.value);
    }

    useEffect(()=>{
        if(value.length > limit){
            setIsError(true);
        }else{
            setIsError(false);
        }
    }, [value])

    return (
        <div className={theme?.theme === "dark"? "container dark_container": "container"}>
            <ThemeSwitcher/>
            <textarea
            value={value}
            onChange={handleValueChange}
            rows={5}
            />
            <div className={"value_container "}>
                <div className={(isError ? "value error_value" : "value")}>{value}</div>
                <div className="count_indicator">{value.length} / {limit}</div>
            </div>
        </div>
    )
}

export default CharacterCounter;