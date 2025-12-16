import React, { useState } from 'react'

/**
 * Input Box
 * Action (add, update, complete, delete)
 * List of todos
 */
/**
 * 
 * @returns 
 */
const TodoApp = () => {
  const [taskText, setTaskText] = useState({
    id:"",
    title: "",
    description: "",
    status: "",
    createdAt: "",
    completedAt: ""
  });
  const [tasks, setTasks] = useState([]);


  return (
    <div className='task_container'>
      <div className='task_input_container'>
        <input className='task_input' type="text" value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && taskText.length > 0) {
              setTasks([...tasks, taskText])
              console.log(tasks);
              setTaskText("");
            }
          }} name='task' placeholder='enter task' />
        <button onClick={() => {
          if (taskText.length > 0) {
            setTasks([...tasks, taskText]);
            setTaskText("");
          }
        }}>Add</button>
      </div>
      <div className='task_list_container'>
        {
          tasks.map((item, index) => {
            return <div key={index} className='task_item'>
              <div className='item_title'>{item}</div>
              <div className='item_action'>
                <button className='btn btn_update'>update</button>
                <button className='btn btn_complete' onClick={() => {

                }}>complete</button>
                <button className='btn btn_delete' onClick={() => {
                  console.log(index);
                  const updatedTask = tasks.filter((_, i) => i !== index);
                  setTasks(updatedTask);
                }}>Delete</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default TodoApp;