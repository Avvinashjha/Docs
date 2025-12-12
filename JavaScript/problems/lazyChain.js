/**
 * Implement a Lazy Evaluation chain (Like Lodash)
 * - Lazy Evaluation follows builder pattern.
 * 
 * What is Lazy Evaluation?
 * 
 * Lazy Evaluation means 
 * - You don't execute operations immediately.
 * - Instead, you store the operations (map, filter, etc.) in a chain.
 * Only when a final action is requested (like .value()), the operations 
 * execute all at once.
 * 
 * This allows:
 * - Performance optimization
 * - fewer iteration
 * - Flexible chaining
 */

/**
 * In simple terms
 * 
 * Instead of doing
 * 
 * arr.map(fn).filter(fn2).reduce(fn3)
 * 
 * Lazy evaluation stores the operations:
 * 
 * [["map", fn], ["filter",  fn2], ["reduce", fn3]]
 * 
 * and only runs when value is called.
 * 
 */

/**
 * This is the basic implementation idea
 */

class LazyChainBasic {
    constructor(value){
        this.valueRef = value;
        this.operations = [];
    }

    map(fn){
        this.operations.push({type: "map", fn});
        return this;
    }

    filter(fn){
        this.operations.push({ type: "filter", fn});
        return this;
    }

    take(n){
        this.operations.push({type: "take", n});
        return this;
    }

    value(){
        let result = this.valueRef;
        for(const op of this.operations){
            if(op.type === "map"){
                result = result.map(op.fn);
            }
            else if(op.type === "filter"){
                result = result.filter(op.fn);
            }
            else if(op.type === "take"){
                result = result.slice(0, op.n);
            }
        }
        return result;
    }
    
}

const result1 = new LazyChainBasic([1,2,3,4,5])
.map(x => x * 2)
.filter(x => x> 5)
.take(2)
.value();

console.log(result1);



/**
 * 
 */

class LazyChain{
    constructor(iterable){
        this.iterable = iterable;
        this.operations = [];
    }

    map(fn){
        this.operations.push({type: "map", fn});
        return this;
    }

    filter(fn){
        this.operations.push({type: "filer", fn});
        return this;
    }

    take(n){
        this.operations.push({type: "take", n});
        return this;
    }

    *execute(){
        let count = 0;

        for(let item of this.iterable){
            let current = item;
            for(const op of this.operations){
                if(op.type === 'map') current = op.fn(current);
                else if(op.type === 'filter' && !op.fn(current)) continue;
                else if (op.type === "take" && count >= op.n) return; // stop early
            }
            yield current;
            count++;
        }
    }
    value(){
        return [...this.execute()];
    }
}

const result = new LazyChain([1,2,3,4,5])
  .map(x => x * 2)
  .filter(x => x > 5)
  .map(x => x + 1)
  .take(2)
  .value();

console.log(result); // [7, 9]

/**
 * 1,000,000 iterations total
 * Not 3,000,000
 * Not 5,000,000
 */

