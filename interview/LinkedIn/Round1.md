https://medium.com/@lakshayshukla156/linkedin-software-engineer-ui-interview-experience-3dc01c034afb

// const Foo = function(a) {
//   function bar() {
//     return a;
//   }
//   this.baz = function() {
//     return a;
//   };
// };

// Foo.prototype = {
//   biz() {
//     return 
// a;
//   },
// };

// const f = new Foo(7);

// f.bar(); // 7
// f.baz(); // ?
// f.biz(); // ?

// this.baz = 



/*
Implement the function memoize that takes another function(of one parameter) as it’s argument and returns a memoized version of the function passed in. Useful for caching, avoiding duplicate computation, etc.

Write this on the collabedit/whiteboard to express the idea a bit more clearly:
Suppose we have a function fib(n) that computes the nth fibonacci number, on repeated calls, it repeats the computation to give us the same result:
````
fib(1000) => result is computed
fib(1000) => result is computed again
````
When we do,
memoize(fib) ==> a function which is a version of fibonacci which does not do unnecessary re-computation. So we could do this:
````
let memoizedFib = memoize(fib)
memoizedFib(1000) ==> result is computed
memoizedFib(1000) ==> no re-computation, the previous result has been cached and this call simply returns the value.
*/

// sum(1,2,3,4)
// 1234
// 2,3,4,1


// function memoize(callback){
//   const map = new Map();
//   return function (...values){
//     let key = values.join();
//     if(map.has(key)){
//       return map.get(key);
//     }
//     let newOutput = callback.call(this, ...values);
//     map.set(key, newOutput);
//     return newOutput;
//   }
// }


// https://i.imgur.com/wmnmXsX.png

<div class="container">
  <div class="container__header"></div>
  <div class="people_container" id="people_container">
    {<div class="people__info">
      <div class="people__avatar">TN</div>
      <div class="people__info">
        <div class="people__name">
          <span class="name">Test Name</span>,
          <span class="title">Software Engineer</span>
        </div>
        <button class="connect__btn">+ Connect</button>
      </div>
      <button class="cross__btn">x</button>
    </div>}
  </div>
</div>

.container{
  border: 1px solid #fefefe;
  border-radius: 8px;
}

.container__header{
  background: grey;
  color: black;
  font-size: 16px;
  font-weight: 600;
}
.people_container{
  display: flex;
  flex-direction: column;
}
.people__info{
  display: flex;
  gap: 10px;
}
.people__avatar{
  width: 40px;
  height: 40px;
  border: 1px solid #fefefe;
  display: flex;
  justify-content: center;
  align-item: center;
}

.people__info{
  flex: 1;
}

.people__name .name{
  color: black;
  font-weight: 600;
  text-transform: "capitalize";
}

.connect__btn{
  color: blue;
  font-weight: 500;
  cursor: pointer;
}

.cross__btn{
  cursor: pointer;
  color: grey;
}
.cross__btn:hover{
  color: black;
}