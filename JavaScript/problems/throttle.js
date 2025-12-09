/**
 * What is throttling?
 * So in simple terms throttle means skip,
 * so in case of throttle you just stop listening to events 
 * that are being triggered after you receives the first event and then
 * you wait for a delay and then again listen to the event and 
 * after that you again stops for that delay
 * 
 * It's not like throttle will stop listening i will listen but it will not 
 * rest time timer and will skip those events till the setInterval execution is done
 */

function throttle (callback, delay) {
    let interval = null;
    return function(...args){
        if(interval !== null) return;
         interval = setInterval(callback.call(this, args), delay);
    }
}