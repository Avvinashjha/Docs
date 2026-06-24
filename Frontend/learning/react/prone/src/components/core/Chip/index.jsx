import "./style.css";
const Chip = ({text, type})=>{
    const getClassFromType = (type) => {
        switch(type){
            case "info":
                return "chip__info";
            case "warning":
                return "chip__warning";
            case "error":
                return "chip__error";
            default:
                return "chip__info";
        }
    }
    return <div  className={"chip " + getClassFromType(type)}>{text}</div>
}

export default Chip