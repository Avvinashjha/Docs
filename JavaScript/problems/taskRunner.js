/**
 * What is a task runner?
 * You need to implement a task runner that receives
 * - a list/queue of async tasks (each returns a promise)
 * - A concurrency limit -> max number of task allowed to run in parallel
 * - Resolve when all tasks finish
 */

/**
 * How to solve a task runner problem?
 *
 * Approach 1:
 *
 * We Maintain:
 * - A queue of tasks
 * - A counter of how many tasks are currently running
 * - When a task finishes
 *  - decrement the counter
 *  - pull the next task from queue
 *  - start it
 *
 * This creates a event loop style concurrency manager.
 */

function runTaskWithConcurrency(tasks, limit) {
  return new Promise((resolve) => {
    let running = 0;
    let index = 0;
    const result = { success: [], failed: [] };
    function runNext() {
      if (index === tasks.length && running === 0) {
        return resolve(result);
      }

      while (running < limit && index < tasks.length) {
        const task = tasks[index++]; // take the current task and increment the counter
        running++;
        task()
          .then((data) => {
            result.success.push(data);
          })
          .catch((err) => {
            result.failed.push(err);
          })
          .finally(() => {
            running--;
            runNext();
          });
      }
    }
    runNext();
  });
}

const t1 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 1 is executing");
      resolve("Task 1 done");
    }, 1000);
  });

const t2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 2 is being executed");

      reject("Task 2 failed");
    }, 500);
  });
const t3 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 3 is executing");
      resolve("Task 3 done");
    }, 1000);
  });

const t4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 4 is being executed");

      reject("Task 4 failed");
    }, 500);
  });
const t5 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 5 is executing");
      resolve("Task 5 done");
    }, 1000);
  });

const t6 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 6 is being executed");

      reject("Task 6 failed");
    }, 500);
  });
const t7 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 7 is executing");
      resolve("Task 7 done");
    }, 1000);
  });

const t8 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 8 is being executed");

      reject("Task 8 failed");
    }, 500);
  });
runTaskWithConcurrency([t1, t2, t3, t4, t5, t6, t7, t8], 4).then((data) => {
  console.log("All task completed", data);
});
