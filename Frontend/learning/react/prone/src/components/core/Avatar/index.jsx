import "./style.css";
const Avatar = ({name}) => {
    const showShortName = (name) => {
        console.log(name);
        
        if(!name) return "U";
        const nameData = name.split(" ");
        let firstNameFirstChar = nameData[0].charAt(0);
        let lastNameFirstChar = "";

        if(nameData.length >= 2){
            lastNameFirstChar = nameData[nameData.length - 1].charAt(0);
        }
        
        return `${firstNameFirstChar} ${lastNameFirstChar}`;
    }
    return <div className="avatar__container">
        {showShortName(name)}
    </div>
};

export default Avatar;