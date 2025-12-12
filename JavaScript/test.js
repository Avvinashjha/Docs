// Promise

const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("In set timeout");
        resolve("Done!")
    }, 1000);
});

p.then((data)=> console.log(data));
