/**
 * Implement a Scheduler that runs task at a given timestamp
 */

/**
 * Simple task scheduler for a single task
 * Run a function at a future timestamp
 */

/**
 * So how will this work, 
 * You will call schedule task with timestamp and task
 * if timestamp is in past then task will run immediately
 * else if will move this off the call stack and when the delay passed 
 * then it will be pushed to macro task queue and then event loop
 * will put the callback into callstack and task will be 
 * executed.
 */
/**
 * 
 * @param {*} timestamp future timestamp
 * @param {*} task callback function which is task that will execute at that time
 * @returns 
 */

function scheduleTask(timestamp, task){
    const now = Date.now();
    const delay = timestamp - now;

    // run task immediately if timestamp is now or past time
    if(delay <= 0){
        console.log("Timestamp is in the past. Running the task");
        task();
        return;
    }

    setTimeout(task, delay);
}

/**
 * Multi task scheduler (Mange many task)
 */

class Scheduler{
    constructor(){
        this.tasks = [];
    }

    schedule(timestamp, task){
        const now = Date.now();
        const delay = timestamp - now;

        if(delay <= 0){
            task();
            return;
        }

        const timeoutId = setTimeout(()=>{
            task();
            this.tasks = this.tasks.filter(t => t.id !== timeoutId);
        }, delay);

        this.tasks.push({id: timeoutId, timestamp, task});
    }
    cancelAll(){
        this.tasks.forEach(t => clearTimeout(t.id));
        this.tasks = [];
    }
}

const scheduler = new Scheduler();

scheduler.schedule(Date.now() + 2000, ()=>{
    console.log("Task a after 2 sec");
})

scheduler.schedule(Date.now() + 4000, ()=>{
    console.log("Task B after 4 sec");
})


scheduler.schedule(Date.now() + 4000, ()=>{
    console.log("Task C after 4 sec");
})

/**
 * Polling-Based Scheduler
 * 
 * Useful when  you need high precision or scheduled task that persists across restarts.
 * This uses priority queue
 */

class PollingScheduler{
    constructor(interval=100){
        this.queue = [];
        this.interval = interval;
        this.timer = null;
        this.start();
    }

    schedule(timestamp, task){
        this.queue.push({timestamp, task});
        this.queue.sort((a,b)=> a.timestamp - b.timestamp); // earliest first
    }

    start(){
        if(this.timer) return;
        this.timer = setInterval(()=>{
            const now = Date.now();

            while(this.queue.length && this.queue[0].timestamp <= now){
                const job = this.queue.shift();
                job.task();
            }
        }, this.interval);
    }

    stop(){
        clearInterval(this.timer);
        this.timer = null;
    }
}

const pscheduler = new PollingScheduler();

pscheduler.schedule(Date.now() + 3000, () => console.log("3 sec task"));
pscheduler.schedule(Date.now() + 1000, () => console.log("1 sec task"));
pscheduler.schedule(Date.now() + 5000, () => console.log("5 sec task"));
