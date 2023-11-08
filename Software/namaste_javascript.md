# Call Stack, Execution Context, Memory Phase, Hoisting

Everything in JS happens inside an Execution Context

Global Execution Context is like a box has two parts in it.

Memory part is holds all variables and declarations as key value pairs. Also known as Variable Environment.

Code part is where code is executed. Also known as Thread of Execution.

JavaScript is a synchronous single-threaded language.

When you run a JS program an Execution Context is created.

Global Execution Context is created in two phases. First is Memory Creation Phase. In memory creation phase all variables are declared as undefined. And all functions declared as is. Also known as Hoisting phase.

Second phase is Code Execution Phase.

When you run a JS program a Global Execution Context is created. In Memory Creation Phase all global variables and functions created. Variables with var declared as undefined, variable with let and const declared also as undefined but in Temporal Dead Zone.

After Hoisting phase, Code execution phase starts. Code executed line by line and if it shows a variable it updates its value with actual value. If it sees a function invocation another execution context is created with hoisting and execution parts.

Call Stack maintains the order of execution of Execution Contexts.

Think of Call Stack as a glass. GEC sits bottom of it. Every time a function invokes, another Execution Context sits top of the GEC or previous EC.

You can see Call Stack, Global Execution Context and function context on developer tools in a browser.

## undefined vs not defined

Whenever a JS program runs Global Execution Context is created with global Window object and this keyword. this == window.

Global space is all codes that not inside a function.

All variables in global space attached to window object.

undefined is a special placeholder for variables in memory creation phase. You can use undefined in your program but it is a bad practice.

## Scope Chain & Lexical Environment

Lexical Environment == scope.

Scope is where a variable can be accessed.

Variable inside of a function can be accessable in that function and all children functions.

Variable inside of global scoope can be accessable from anywhere.

Variable inside of a function cannot be accessable from parent and global scopes.

Whenever an Execution Context is created a Lexical Environment also created.

In memory creation phase EC has local variables and reference to lexical env of its parent EC.

## let and const. Temporal Dead Zone

Inside of execution context, in memory creation phase let also hoisted. It gots
undefined value like var. But the difference is that context keeps it in a seperate place. That
place is TDZ.

You cannot access it before its initialization with a value. When you try that with var you get
undefined but when you try that with let you'll get an error.

Var variables attached on global object in global scope. But it is not the case for let.

## Block Scope & Shadowing

Block is a place which between curly braces.

Shadowing is when more than one variables with the same name exist, the inner
scoped variables shadows and hides the outer scoped variable. so you cannot
access the outer scoped variable once inner scope variable declared.

# Closures

Function along with its lexical environment(scope) forms a closure.

When a function is returned from another function it still maintains its lexical scope.

So when you return a function you are also returning its scope with it.

```js
function outer(){
    const age = 27;
    function inner(){
        console.log(age);
    }
    return inner;
}

const z = outer();
console.log(z); // function inner(){...}

x(); // prints 27 
```

It prints 27 so can access variable age even the outer function removed from call stack.
Function inner still can see variables within its lexical scope.

