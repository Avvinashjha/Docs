function createCounter(){
    let count = 0;
    function increment(){
        count++;
    }
    function decrement(){
        count--;
    }
    function reset(){
        count = 0;
    }
    function getValue(){
        return count;
    }
    return {
        increment, decrement, reset, getValue
    }
}

const c1 = createCounter();
c1.increment();
c1.increment();
console.log(c1.getValue());
c1.decrement();
console.log(c1.getValue());
c1.reset();
console.log(c1.getValue());


