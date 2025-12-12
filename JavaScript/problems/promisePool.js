/**
 * What is Promise pool?
 * A mechanism to run only N Promise concurrently out of a larger list.
 * 
 * Why Do we need it?
 * 
 * - Prevent API rate limit exhaustion
 * - Avoid memory overload
 * - Avoid overwhelming servers
 * - Browser/network limits
 */

/**
 * How do we implement promise pool
 * - So your method will take a list of promises
 * - limit of concurrent task that can run
 * 
 * so the basic idea is you will create a promise on the top level
 * and inside that promise you will create task runner method
 * task runner method will 
 * 1. check if all tasks are executed and no active task then it will resolve the upper promise
 * 2. If all tasks are not executed the it will loop through the task and
 * check if running task is below limit then it will add another task in running
 * by calling the promise task() and task is a promise so when task completes it's execution 
 * inside that tasks finally it will decrease the active task by one 
 * and call the run next method recursively so that it will run the next task.
 * 
 * Why do we need to call runNext()?
 * After each task completion we need to check if it was the last task if so then we need to 
 * resolve the promise upper level promise so that our promise pool
 * can be fulfilled.
 * 
 * Also the while loop is there to schedule 3 task after that condition meet the loop will break
 * active < limit (3 < 3 which is false so loop will break) and to run the next batch we need to call
 * runNext() and run next will be called again after each task competes and each time while loop while  execute
 * once and the break
 * 
 * So if while loop breaks the how run next will be called?
 * 
 * So what happens is while loop will come in call stack and execute and then it will schedule
 * 3 task each tasks finally has runNExt() so each task will be remove from call stack and when ot either 
 * resolve  /reject after that the callback will be sent to micro task queue and then event loop will put
 * it in callstack and inside that callback in callstack runTask() will be invoked again.
 */

/**
 * 
 * @param {*} tasks list of promises
 * @param {*} limit no of concurrent promise run
 * @returns 
 */

function promisePool(tasks, limit){
    let active = 0;
    let index = 0;

    return new Promise(resolve=>{
        function runNext(){
            if(index === tasks.length && active === 0){
                return resolve();
            }

            while(active < limit && index < tasks.length){
                const task = tasks[index++];
                active++;
                task().finally(()=>{
                    active--;
                    runNext();
                });
            }
        }
        runNext();
    })
}