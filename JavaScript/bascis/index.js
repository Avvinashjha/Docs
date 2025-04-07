// var 
function varScopeExpmple(){
    function test(){
        var x = 10;
        console.log("Inside test function of varScopeExpmple x = ", x);
        // lets create a block 
        if(x > 5){
            var y = 20;
            console.log("Inside if block in test of varScopeExpmple X = ", x , " Y = ", y);
        }
        // now we are out of the if block
        console.log("Inside Test function of varScopeExpmple x = ", x, " Y = ", y);
        
    }
    // call test
    test()
    // Now we are outside test
    // console.log("Inside varScopeExpmple x = ", x, "and Y = " , y );   
}

// varScopeExpmple()
// Output
// Inside test function of varScopeExpmple x =  10 index.js:5:17
// Inside if block in test of varScopeExpmple X =  10  Y =  20 index.js:9:21
// Inside Test function of varScopeExpmple x =  10  Y =  20 index.js:12:17
// Uncaught ReferenceError: x is not defined

function letScopeExample(){
    // delare a let variable on function block
    let functionBlockLet = 1;

    // use declaredAfterUse before declaration
    //Uncaught ReferenceError: can't access lexical declaration 'decalredAfterUse' before initialization
    // console.log("Trying to access declareAfter use", decalredAfterUse);
    

    // create a block inside function
    if(functionBlockLet > 0){
        let insideFunctionBlockAnotherBlockLet = 2;

        // log functionBlockLet and insideFunctionBlockAnotherBlockLet
        console.log("Function Block Let = ", functionBlockLet, "and insideFunctionBlockAnotherBlockLet = ", insideFunctionBlockAnotherBlockLet);
    }

    // now try to access insideFunctionBlockAnotherBlockLet
    //Uncaught ReferenceError: insideFunctionBlockAnotherBlockLet is not defined
    // console.log("Trying insideFunctionBlockAnotherBlockLet outside the block", insideFunctionBlockAnotherBlockLet);

    let decalredAfterUse = 10;
    
}

letScopeExample()