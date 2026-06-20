// Create a promise

// const p1 = new Promise((resolve, reject) => {
//     resolve("Resolved")
// })

// p1.then(data=>console.log(data));

Promise.resolve(1)
    .then((a)=> a + 1)
    .then((b)=> b + 1)
    .then(console.log);

