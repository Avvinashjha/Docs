/**
 * Idea is to create a counter
 * initial value = 0
 * button to increment
 * button to decrement
 * button to reset
 */

/**
 * Steps:
 * 1. select the root element
 * 2. create an element to show count
 * 2. create 3 button element
 * 3. add event listener to the button elements
 *      1. inside the eventListener we will add the logic to increment, decrement and reset
 *      2. update the count element
 */

class Counter{
    constructor(){
        this.root = document.getElementById("root");
        this.count = 0;
    }

    createButton(label, onClick, style){
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.style.background = style?.background || "#564321";
        btn.innerText = label;
        btn.addEventListener("click", onClick);
        return btn;
    }

    createCountView(count){
        const temp = document.createElement("div");
        temp.id = "count"
        temp.textContent = "0";
        return temp;
    }

    updateCountView(count){
        document.getElementById("count").textContent = count;
    }

    createCounter(){
        const container = document.createElement("div");
        container.className = "container";
        const counterView = this.createCountView();
        const incrementBtn = this.createButton("Increment", ()=>{
            this.count++;
            this.updateCountView(this.count);
        }, { background: "green"} );
        const decrementBtn = this.createButton("Decrement", ()=>{
            this.count--;
            this.updateCountView(this.count);
        }, { background: "red"} );
        const resetBtn = this.createButton("Reset", ()=>{
            this.count = 0;
            this.updateCountView(this.count);
        } );
        container.appendChild(counterView);
        container.appendChild(decrementBtn);
        container.appendChild(resetBtn);
        container.appendChild(incrementBtn);
        this.root.appendChild(container);
    }
}

(
    function init(){
        document.addEventListener("DOMContentLoaded",()=>{
            const counter = new Counter();
            counter.createCounter();
        })
    }
)();



// const input = document.createElement("input");
// input.addEventListener("change",callback);