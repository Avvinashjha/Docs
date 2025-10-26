/**
 * Requirements
 * - task (title, status, createdAt, updatedAt)
 * - status = ["TODO", "IN_PROGRESS", "COMPLETED"]
 * - createdAt = creation time of the task
 * 
 * Approach
 * - Interface to add task
 *     - input element
 *     - button / enter to add task
 * - Interface to show task
 *     - list of task
 *     - user can change the status/title of the task
 *          - edit task
 */

function Counter (){
    const [taskData, setTaskData] = React.useState([]);


    return (<div>
        <input  onKeyDown={(e)=>{
           if(e.key === "Enter"){
            const currentTask = {
                title: e.target.value,
                createdAt: new Date().getUTCDate(),
                status: 0,
                updatedAt:null
            }
            setTaskData([...taskData,currentTask]);
            e.target.value = "";
           }
        }}/>
        {
            taskData.map((task, index) => {
                return <div>
                    <span>{task.title}</span>
                    <span>{task.createdAt}</span>
                    <span>{task.status}</span>
                    <span>Edit</span>
                </div>
            })
        }
    </div>);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Counter/>);