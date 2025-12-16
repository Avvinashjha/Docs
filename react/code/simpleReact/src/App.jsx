import Counter from "./components/Counter";
import Link from "./components/Route/Link";
import TodoApp from "./components/Todo";
import "./style.css";
const App =  () =>  {

    return <div>
        {/* <Link to="/counter">Counter</Link>
        <Link to={"/counter1"}>Counter1</Link> */}
        <TodoApp/>
    </div>
}

export default App;