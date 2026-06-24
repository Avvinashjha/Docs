import { useEffect, useState } from "react";
import Card from "../../components/core/Card";
import "./style.css"
const UserList = () => {
    const [count, setCount] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        console.log("Hello Mounted");
        return ()=>{
            console.log("hello");
        }
         
    }, [count]);

    useEffect(()=>{
        setLoading(true);
        fetch("https://raw.githubusercontent.com/Avvinashjha/Docs/refs/heads/main/Nodejs/projects/InfiniteData/server/MOCK_DATA.json").then((res)=>{
            res.json().then((data) => setUsers(data)
            );
            setLoading(false)
            
        })
    }, [])
    return <div className="user__container">
        {count}<button onClick={()=>setCount(0)}>+</button>
        {loading ? <h1>Loading .... </h1> :
        users.map((user) => {
            return <Card key={user.id} name={user.first_name + " " + user.last_name} email={user.email} tags={[user.gender, user.number, user.ip_address ]} />
        })
    }
        
    </div>;
}

export default UserList;