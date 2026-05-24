# React Fundamentals

## 1. Build Custom UseState

```js
let state;
let isInit = false;

function useState(initValue){
    if(!isInit){
        state = initValue;
        isInit = true;
    }

    function setState(newValue){
        state = newValue;
        render();
    }
    return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(0);

  return `
    Count: ${count}
    <button onclick="increment()">Increment</button>
  `;
}

function increment() {
  const [, setCount] = useState(0);
  setCount(state + 1);
}
function render(){
    document.getElementById("root").innerHtml = Counter();
}

```

## 2. Build Custom UseEffect

## 3. Explain Reconciliation

## 4. Explain Fiber Architecture

## 5. Controlled vs Uncontrolled Components

## 6. Listing state UP

## 7. Context vs Redux

## 8. React rendering Lifecycle

## 9. Key prop importance

## 10. Functional Vs Class Components

