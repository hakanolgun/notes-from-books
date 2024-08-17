# NAMASTE JS SEASON 1

## Execution Context, Memory Phase - Hoisting

Everything in JS happens inside an Execution Context.

Global Execution Context is like a box has two parts in it.

Memory part is holds all variables and declarations as key value pairs. Also known as Variable Environment.

Code part is where code is executed. Also known as Thread of Execution.

JavaScript is a synchronous single-threaded language.

When you run a JS program an Execution Context is created.

Global Execution Context is created in two phases. First is Memory Creation Phase. In memory creation phase all variables are declared as undefined. And all functions declared as is. Also known as Hoisting phase.

Second phase is Code Execution Phase.

When you run a JS program a Global Execution Context is created. In Memory Creation Phase all global variables and functions created. Variables with var declared as undefined, variable with let and const declared also as undefined but in Temporal Dead Zone.

After Hoisting phase, Code execution phase starts. Code executed line by line and if it reads a variable it updates its value with actual value. If it sees a function invocation another execution context is created with hoisting and execution parts.

Call Stack maintains the order of execution of Execution Contexts.

Think of Call Stack as a glass. GEC sits bottom of it. Every time a function invokes, another Execution Context sits top of the GEC or previous Execution Context.

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

In memory creation phase EC has local variables and reference to lexical environment of its parent EC.

## let and const. Temporal Dead Zone

Inside of execution context, in memory creation phase let also hoisted. It gots undefined value like var. But the difference is that context keeps it in a seperate place. That place is TDZ.

You cannot access it before its initialization with a value. When you try that with var you get undefined but when you try that with let you'll get an error.

Var variables attached on global object in global scope. But it is not the case for let.

## Block Scope & Shadowing

Block is a place which between curly braces.

Shadowing is when more than one variables with the same name exist, the inner scoped variables shadows and hides the outer scoped variable. So you cannot access the outer scoped variable once inner scope variable declared.

## Closures

Function along with its lexical environment(scope) forms a closure.

When a function is returned from another function it still maintains its lexical scope.

So when you return a function you are also returning its scope with it.

```js
function outer() {
  const age = 27;
  function inner() {
    console.log(age);
  }
  return inner;
}

const z = outer();
console.log(z); // function inner(){...}

x(); // prints 27
```

It prints 27 so can access variable age even the outer function removed from the call stack.
Function inner still can see variables within its lexical scope.

## First Class Functions

Function Declaration - Function Statement:

```js
function sayHello() {
  console.log("Hello");
}
```

Function Expression:

```js
const sayHello = function () {
  // anonymous function can be used here
  console.log("Hello");
};
```

First Class Citizens === First Class Functions
First Class Functions: Ability to pass a function as an argument and return a function from another function.

## Callback Functions & Event Listeners

Why we clear eventListeners? Because they take memory. Why they take memory? Because they are closures. They keep their scope.

## Event Loop

JS engine creates a call stack.

Browser > JS Engine > Call Stack > Global Execution Context > Hoisting and Execution Phases

Event Loop, checks wether Call Stack is empty or not if empty it checks microtask queue and then callback queue. If find sth it push it to call stack.

Microtask queue: Promises and mutation observers (Higher Priority)
Callback queue: Any other callbacks (timeouts, event listeners ...)

If there are a lot of task in the microtask queue, callbacks inside the callback queue have to wait for all microtask to be executed. If tasks inside callback queue waits to long it called **starvation**.

## JS Engine

JS Engine: Parsing > Compilation > Execution > ByteCode

Parsing: Takes code and converts it to AST
Compilation: Interpreter and Compiler together (JIT Compilation)
Execution : Memory Heap and Call Stack (and also GC)

## Trust Issues With setTimeout

If call stack is not empty, callback from a setTimeout cannot be executed even the time in timeout already passed. It has to wait to callstack become empty.

So don't block the main thread.

## Higher Order Functions & Functional Programming

Higher Order Function: A function takes a callback parameter.

Nice trick to write better DRY code on the video.

# CORE JS CONCEPTS

**call, apply, bind methods:** call can be used for function borrowing. we can call a method from an object and pass another object as a parameter to call method so this refers to the object which we pass. Apply method is also same. Only difference is that you can pass arguments as an array to apply method.
Bind method also same but it does not call the method it binds the method to the object and returns the method so you can call it later.

```js
// CALL
let obj1 = {
  firstName: "Ali",
  lastName: "Yildiz",
  print: function () {
    console.info(this.firstName + " " + this.lastName);
  },
};

name.print(); // Logs Ali Yıldız

let obj2 = {
  firstName: "Ahmet",
  lastName: "Aslan",
};

obj1.print.call(obj2); // Logs Ahmet Aslan

// ANOTHER WAY OF CALL
let print = function () {
  console.info(this.firstName + " " + this.lastName);
};

print.call(obj1);
print.call(obj2);

// APPLY
print.apply(obj1, ["Parameter1", "Parameter2"]);

// BIND
let printMyName = print.bind(obj1, "parameter", "anotherparameter"); // returns a function, not call
printMyName();
```

**Currying:** Pass one argument to parent function, pass another argument to child function so you divide arguments to multiple levels.

**async and defer keywords:** Async script will be load parallel to html parsing and once it loads html parsing stops and script executes. Defer keyword makes script will be executed only when html parsing completed.

**Events bubling up & capturing down:** If event bubbling is true When you click inner div, if first call inner divs callback, then parent div's callback. If Capturing is true when you click inner div, firstly outer divs callback will be call.

**Event delegation:** When you have a parent div and a lot of child elements, instead of attaching event listeners to all child element, you attach only one eventListener to parent and detect which child is being clicked by e.target property. So you save a lot of memory because eventListeners are memory heavy.

**Debouncing and Throttling:** When multiple function calls happens very often you need to limit them. Debouncing is make a call when the duration between two calls exceed certain duration. Throttling means use interval and only call the function every xxx miliseconds.

```js
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const betterFunction = debounce(getData, 300);

function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
const betterFunction = throttle(getData, 1000);
```

# NAMASTE JS SEASON 2

## Promises

The problems with callbacks are they are hard to read and maintain. Addditionaly
you have inversion of control problem because you have to trust to service will call your
callback function.

Promise is an object which represent eventually completion or failure of an async operation.
