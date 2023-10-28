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

Think of Call Stack as a glass. GEC sits bottom of it. Every time a function invokes, another EC sits top of the GEC or previous EC.


