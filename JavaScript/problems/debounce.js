/**
 * What is debounce?
 * 
 * Debounce is a technique where you wait for some fixed amount of time
 * to perform an action after an event stops
 * 
 * so what i mean to say is debounce is a function which will be triggered each time event
 * triggers but it will complete it's execution only when event trigger will
 * stop for a fixed time other wise it will again rest the time to 0
 */

function debounce(callback, delay){
    let timer = null;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callback.apply(this, args);
        },delay);
    };
}

function onResize(){
    console.log("Resized");
}

window.addEventListener("resize", debounce(onResize, 1000))