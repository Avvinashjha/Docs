import Avatar from "../Avatar";
import Chip from "../Chip";
import "./style.css";
const Card = ({name="", email="", tags = []}) => {
    return <div className="card__container">
        <div className="card__top">
            <div className="card__top-left">
                <Avatar name={name}></Avatar>
            </div>
             <div className="card__top-mid">
                <h3>{name}</h3>
                <span>{email}</span>
            </div>

        </div>
        <div className="card__body">
            {tags.map((tag)=>{
                return <Chip text={tag} type={""} />
            })}
        </div>
    </div>
}

export default Card;

/**
 {
id: 1,
first_name: "Eveleen",
last_name: "Matus",
email: "ematus0@flavors.me",
gender: "Female",
ip_address: "16.69.150.207",
number: 27
}
 */