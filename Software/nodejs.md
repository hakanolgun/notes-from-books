# Getting Started

## Introduction to Node.js

A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.

When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.

In Node.js the new ECMAScript standards can be used without problems, as you don't have to wait for all your users to update their browsers - you are in charge of deciding which ECMAScript version to use by changing the Node.js version, and you can also enable specific experimental features by running Node.js with flags.

## Differences between Node.js and browsers

Another difference is that Node.js supports both the CommonJS and ES module systems (since Node.js v12), while in the browser, we are starting to see the ES Modules standard being implemented.

In practice, this means that you can use both require() and import in Node.js, while you are limited to import in the browser.

## The V8 JavaScript Engine

JavaScript is generally considered an interpreted language, but modern JavaScript engines no longer just interpret JavaScript, they compile it.

This has been happening since 2009, when the SpiderMonkey JavaScript compiler was added to Firefox 3.5, and everyone followed this idea.

JavaScript is internally compiled by V8 with just-in-time (JIT) compilation to speed up the execution.

This might seem counter-intuitive, but since the introduction of Google Maps in 2004, JavaScript has evolved from a language that was generally executing a few dozens of lines of code to complete applications with thousands to hundreds of thousands of lines running in the browser.

Our applications can now run for hours inside a browser, rather than being just a few form validation rules or simple scripts.

In this new world, compiling JavaScript makes perfect sense because while it might take a little bit more to have the JavaScript ready, once done it's going to be much more performant than purely interpreted code.

## Node.js, the difference between development and production

Node.js assumes it's always running in a development environment. You can signal Node.js that you are running in production by setting the NODE_ENV=production environment variable.

This is usually done by executing the command

export NODE_ENV=production

Bash
Copy to clipboard

in the shell, but it's better to put it in your shell configuration file (e.g. .bash_profile with the Bash shell) because otherwise the setting does not persist in case of a system restart.

You can also apply the environment variable by prepending it to your application initialization command:

NODE_ENV=production node app.js

Bash
Copy to clipboard

This environment variable is a convention that is widely used in external libraries as well.

Setting the environment to production generally ensures that

    logging is kept to a minimum, essential level
    more caching levels take place to optimize performance

## Node.js with TypeScript

Running TypeScript Code in Node.js

Node.js cannot run TypeScript natively. You cannot call node example.ts from the command line directly. But there are three solutions to this problem:
Compiling TypeScript to JavaScript

If you want to run TypeScript code in Node.js, you need to compile it to JavaScript first. You can do this using the TypeScript compiler tsc as shown earlier.

Here's a small example:

npx tsc example.ts
node example.js

Bash
Copy to clipboard
Running TypeScript Code with ts-node

You can use ts-node to run TypeScript code directly in Node.js without the need to compile it first. But it's not typechecking your code. So we recommend to type check your code first with tsc and then run it with ts-node before shipping it.

To use ts-node, you need to install it first:

npm i -D ts-node

Bash
Copy to clipboard

Then you can run your TypeScript code like this:

npx ts-node example.ts

Bash
Copy to clipboard
Running TypeScript Code with tsx

You can use tsx to run TypeScript code directly in Node.js without the need to compile it first. But it's not typechecking your code. So we recommend to type check your code first with tsc and then run it with tsx before shipping it.

To use tsx, you need to install it first:

npm i -D tsx

Bash
Copy to clipboard

Then you can run your TypeScript code like this:

npx tsx example.ts

Bash
Copy to clipboard

If you want to use tsx via node, you can register tsx via --import:

node --import=tsx example.ts

## Node.js with WebAssembly

WebAssembly is a high-performance assembly-like language that can be compiled from various languages, including C/C++, Rust, and AssemblyScript. Currently, it is supported by Chrome, Firefox, Safari, Edge, and Node.js!

The WebAssembly specification details two file formats, a binary format called a WebAssembly Module with a .wasm extension and corresponding text representation called WebAssembly Text format with a .wat extension.
Key Concepts

    Module - A compiled WebAssembly binary, ie a .wasm file.
    Memory - A resizable ArrayBuffer.
    Table - A resizable typed array of references not stored in Memory.
    Instance - An instantiation of a Module with its Memory, Table, and variables.

In order to use WebAssembly, you need a .wasm binary file and a set of APIs to communicate with WebAssembly. Node.js provides the necessary APIs via the global WebAssembly object.

```js
console.log(WebAssembly);
/*
Object [WebAssembly] {
compile: [Function: compile],
validate: [Function: validate],
instantiate: [Function: instantiate]
}
*/
```

Generating WebAssembly Modules

There are multiple methods available to generate WebAssembly binary files including:

    Writing WebAssembly (.wat) by hand and converting to binary format using tools such as wabt
    Using emscripten with a C/C++ application
    Using wasm-pack with a Rust application
    Using AssemblyScript if you prefer a TypeScript-like experience

    Some of these tools generate not only the binary file, but the JavaScript "glue" code and corresponding HTML files to run in the browser.

How to use it

Once you have a WebAssembly module, you can use the Node.js WebAssembly object to instantiate it.

// Assume add.wasm file exists that contains a single function adding 2 provided arguments
const fs = require('node:fs');

const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
// Exported function live under instance.exports
const { add } = wasmModule.instance.exports;
const sum = add(5, 6);
console.log(sum); // Outputs: 11
Interacting with the OS

WebAssembly modules cannot directly access OS functionality on its own. A third-party tool Wasmtime can be used to access this functionality. Wasmtime utilizes the WASI API to access the OS functionality.
Resources

    General WebAssembly Information
    MDN Docs
    Write WebAssembly by hand

## Debugging Node.js

Enable Inspector

When started with the --inspect switch, a Node.js process listens for a debugging client. By default, it will listen at host and port 127.0.0.1:9229. Each process is also assigned a unique UUID.

Inspector clients must know and specify host address, port, and UUID to connect. A full URL will look something like ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e.

Node.js will also start listening for debugging messages if it receives a SIGUSR1 signal. (SIGUSR1 is not available on Windows.) In Node.js 7 and earlier, this activates the legacy Debugger API. In Node.js 8 and later, it will activate the Inspector API.
Security Implications

Since the debugger has full access to the Node.js execution environment, a malicious actor able to connect to this port may be able to execute arbitrary code on behalf of the Node.js process. It is important to understand the security implications of exposing the debugger port on public and private networks.
Exposing the debug port publicly is unsafe

If the debugger is bound to a public IP address, or to 0.0.0.0, any clients that can reach your IP address will be able to connect to the debugger without any restriction and will be able to run arbitrary code.

By default node --inspect binds to 127.0.0.1. You explicitly need to provide a public IP address or 0.0.0.0, etc., if you intend to allow external connections to the debugger. Doing so may expose you to a potentially significant security threat. We suggest you ensure appropriate firewalls and access controls in place to prevent a security exposure.

See the section on 'Enabling remote debugging scenarios' on some advice on how to safely allow remote debugger clients to connect.
Local applications have full access to the inspector

Even if you bind the inspector port to 127.0.0.1 (the default), any applications running locally on your machine will have unrestricted access. This is by design to allow local debuggers to be able to attach conveniently.
Browsers, WebSockets and same-origin policy

Websites open in a web-browser can make WebSocket and HTTP requests under the browser security model. An initial HTTP connection is necessary to obtain a unique debugger session id. The same-origin-policy prevents websites from being able to make this HTTP connection. For additional security against DNS rebinding attacks, Node.js verifies that the 'Host' headers for the connection either specify an IP address or localhost precisely.

These security policies disallow connecting to a remote debug server by specifying the hostname. You can work-around this restriction by specifying either the IP address or by using ssh tunnels as described below.

## Profiling Node.js Applications

Node.js has a built-in profiler which can help you to analyze your app's performance.

```sh
NODE_ENV=production node --prof app.js
```

More details and examples are [here](https://nodejs.org/en/learn/getting-started/profiling)

## Security Best Practices

Examples and tips for common security issues [here](https://nodejs.org/en/learn/getting-started/security-best-practices)

# Asynchronous Work

## Asynchronous flow control

At its core, JavaScript is designed to be non-blocking on the "main" thread, this is where views are rendered. You can imagine the importance of this in the browser. When the main thread becomes blocked it results in the infamous "freezing" that end users dread, and no other events can be dispatched resulting in the loss of data acquisition, for example.

This creates some unique constraints that only a functional style of programming can cure. This is where callbacks come in to the picture.

However, callbacks can become challenging to handle in more complicated procedures. This often results in "callback hell" where multiple nested functions with callbacks make the code more challenging to read, debug, organize, etc.

async1(function (input, result1) {
async2(function (result2) {
async3(function (result3) {
async4(function (result4) {
async5(function (output) {
// do something with output
});
});
});
});
});

JavaScript
Copy to clipboard

Of course, in real life there would most likely be additional lines of code to handle result1, result2, etc., thus, the length and complexity of this issue usually results in code that looks much more messy than the example above.

This is where functions come in to great use. More complex operations are made up of many functions:

    initiator style / input
    middleware
    terminator

The "initiator style / input" is the first function in the sequence. This function will accept the original input, if any, for the operation. The operation is an executable series of functions, and the original input will primarily be:

    variables in a global environment
    direct invocation with or without arguments
    values obtained by file system or network requests

Network requests can be incoming requests initiated by a foreign network, by another application on the same network, or by the app itself on the same or foreign network.

A middleware function will return another function, and a terminator function will invoke the callback. The following illustrates the flow to network or file system requests. Here the latency is 0 because all these values are available in memory.

function final(someInput, callback) {
callback(`${someInput} and terminated by executing callback `);
}

function middleware(someInput, callback) {
return final(`${someInput} touched by middleware `, callback);
}

function initiate() {
const someInput = 'hello this is a function ';
middleware(someInput, function (result) {
console.log(result);
// requires callback to `return` result
});
}

initiate();

JavaScript
Copy to clipboard
State management

Functions may or may not be state dependent. State dependency arises when the input or other variable of a function relies on an outside function.

In this way there are two primary strategies for state management:

    passing in variables directly to a function, and
    acquiring a variable value from a cache, session, file, database, network, or other outside source.

Note, I did not mention global variable. Managing state with global variables is often a sloppy anti-pattern that makes it difficult or impossible to guarantee state. Global variables in complex programs should be avoided when possible.
Control flow

If an object is available in memory, iteration is possible, and there will not be a change to control flow:

function getSong() {
let \_song = '';
let i = 100;
for (i; i > 0; i -= 1) {
\_song += `${i} beers on the wall, you take one down and pass it around, ${
      i - 1
    } bottles of beer on the wall\n`;
if (i === 1) {
\_song += "Hey let's get some more beer";
}
}

return \_song;
}

function singSong(\_song) {
if (!\_song) throw new Error("song is '' empty, FEED ME A SONG!");
console.log(\_song);
}

const song = getSong();
// this will work
singSong(song);

JavaScript
Copy to clipboard

However, if the data exists outside of memory the iteration will no longer work:

function getSong() {
let \_song = '';
let i = 100;
for (i; i > 0; i -= 1) {
/_ eslint-disable no-loop-func _/
setTimeout(function () {
\_song += `${i} beers on the wall, you take one down and pass it around, ${
        i - 1
      } bottles of beer on the wall\n`;
if (i === 1) {
\_song += "Hey let's get some more beer";
}
}, 0);
/_ eslint-enable no-loop-func _/
}

return \_song;
}

function singSong(\_song) {
if (!\_song) throw new Error("song is '' empty, FEED ME A SONG!");
console.log(\_song);
}

const song = getSong('beer');
// this will not work
singSong(song);
// Uncaught Error: song is '' empty, FEED ME A SONG!

JavaScript
Copy to clipboard

Why did this happen? setTimeout instructs the CPU to store the instructions elsewhere on the bus, and instructs that the data is scheduled for pickup at a later time. Thousands of CPU cycles pass before the function hits again at the 0 millisecond mark, the CPU fetches the instructions from the bus and executes them. The only problem is that song ('') was returned thousands of cycles prior.

The same situation arises in dealing with file systems and network requests. The main thread simply cannot be blocked for an indeterminate period of time-- therefore, we use callbacks to schedule the execution of code in time in a controlled manner.

You will be able to perform almost all of your operations with the following 3 patterns:

    In series: functions will be executed in a strict sequential order, this one is most similar to for loops.

// operations defined elsewhere and ready to execute
const operations = [
{ func: function1, args: args1 },
{ func: function2, args: args2 },
{ func: function3, args: args3 },
];

function executeFunctionWithArgs(operation, callback) {
// executes function
const { args, func } = operation;
func(args, callback);
}

function serialProcedure(operation) {
if (!operation) process.exit(0); // finished
executeFunctionWithArgs(operation, function (result) {
// continue AFTER callback
serialProcedure(operations.shift());
});
}

serialProcedure(operations.shift());

JavaScript
Copy to clipboard

    Full parallel: when ordering is not an issue, such as emailing a list of 1,000,000 email recipients.

let count = 0;
let success = 0;
const failed = [];
const recipients = [
{ name: 'Bart', email: 'bart@tld' },
{ name: 'Marge', email: 'marge@tld' },
{ name: 'Homer', email: 'homer@tld' },
{ name: 'Lisa', email: 'lisa@tld' },
{ name: 'Maggie', email: 'maggie@tld' },
];

function dispatch(recipient, callback) {
// `sendEmail` is a hypothetical SMTP client
sendMail(
{
subject: 'Dinner tonight',
message: 'We have lots of cabbage on the plate. You coming?',
smtp: recipient.email,
},
callback
);
}

function final(result) {
console.log(`Result: ${result.count} attempts \
      & ${result.success} succeeded emails`);
if (result.failed.length)
console.log(`Failed to send to: \
        \n${result.failed.join('\n')}\n`);
}

recipients.forEach(function (recipient) {
dispatch(recipient, function (err) {
if (!err) {
success += 1;
} else {
failed.push(recipient.name);
}
count += 1;

    if (count === recipients.length) {
      final({
        count,
        success,
        failed,
      });
    }

});
});

JavaScript
Copy to clipboard

    Limited parallel: parallel with limit, such as successfully emailing 1,000,000 recipients from a list of 10E7 users.

let successCount = 0;

function final() {
console.log(`dispatched ${successCount} emails`);
console.log('finished');
}

function dispatch(recipient, callback) {
// `sendEmail` is a hypothetical SMTP client
sendMail(
{
subject: 'Dinner tonight',
message: 'We have lots of cabbage on the plate. You coming?',
smtp: recipient.email,
},
callback
);
}

function sendOneMillionEmailsOnly() {
getListOfTenMillionGreatEmails(function (err, bigList) {
if (err) throw err;

    function serial(recipient) {
      if (!recipient || successCount >= 1000000) return final();
      dispatch(recipient, function (_err) {
        if (!_err) successCount += 1;
        serial(bigList.pop());
      });
    }

    serial(bigList.pop());

});
}

sendOneMillionEmailsOnly();

JavaScript
Copy to clipboard

Each has its own use cases, benefits, and issues you can experiment and read about in more detail. Most importantly, remember to modularize your operations and use callbacks! If you feel any doubt, treat everything as if it were middleware!

## Overview of Blocking vs Non-Blocking

Blocking

Blocking is when the execution of additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes. This happens because the event loop is unable to continue running JavaScript while a blocking operation is occurring.

In Node.js, JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as blocking. Synchronous methods in the Node.js standard library that use libuv are the most commonly used blocking operations. Native modules may also have blocking methods.

So, the first part of the paragraph is saying that in Node.js, if JavaScript code runs slowly because it's doing a lot of CPU-intensive work (like heavy calculations), it's not typically called "blocking". Blocking is usually used to describe situations where the program waits for I/O operations to complete.

All of the I/O methods in the Node.js standard library provide asynchronous versions, which are non-blocking, and accept callback functions. Some methods also have blocking counterparts, which have names that end with Sync.

Comparing Code

Blocking methods execute synchronously and non-blocking methods execute asynchronously.

Using the File System module as an example, this is a synchronous file read:

```js
const fs = require("node:fs");

const data = fs.readFileSync("/file.md"); // blocks here until file is read
```

JavaScript
Copy to clipboard

And here is an equivalent asynchronous example:

```js
const fs = require("node:fs");

fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
});
```

Concurrency and Throughput

As an example, let's consider a case where each request to a web server takes 50ms to complete and 45ms of that 50ms is database I/O that can be done asynchronously. Choosing non-blocking asynchronous operations frees up that 45ms per request to handle other requests. This is a significant difference in capacity just by choosing to use non-blocking methods instead of blocking methods.

The event loop is different than models in many other languages where additional threads may be created to handle concurrent work.

### Dangers of Mixing Blocking and Non-Blocking Code

There are some patterns that should be avoided when dealing with I/O. Let's look at an example:

```js
const fs = require("node:fs");

fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync("/file.md");
```

## Asynchronous Programming and Callbacks

Computers are asynchronous by design.

Asynchronous means that things can happen independently of the main program flow.

In the current consumer computers, every program runs for a specific time slot and then it stops its execution to let another program continue their execution. This thing runs in a cycle so fast that it's impossible to notice. We think our computers run many programs simultaneously, but this is an illusion (except on multiprocessor machines).

Programs internally use interrupts, a signal that's emitted to the processor to gain the attention of the system.

Let's not go into the internals of this now, but just keep in mind that it's normal for programs to be asynchronous and halt their execution until they need attention, allowing the computer to execute other things in the meantime. When a program is waiting for a response from the network, it cannot halt the processor until the request finishes.

Normally, programming languages are synchronous and some provide a way to manage asynchronicity in the language or through libraries. C, Java, C#, PHP, Go, Ruby, Swift, and Python are all synchronous by default. Some of them handle async operations by using threads, spawning a new process.

JavaScript is synchronous by default and is single threaded. This means that code cannot create new threads and run in parallel.

Lines of code are executed in series, one after another, for example:

const a = 1;
const b = 2;
const c = a \* b;
console.log(c);
doSomething();

JavaScript
Copy to clipboard

But JavaScript was born inside the browser, its main job, in the beginning, was to respond to user actions, like onClick, onMouseOver, onChange, onSubmit and so on. How could it do this with a synchronous programming model?

The answer was in its environment. The browser provides a way to do it by providing a set of APIs that can handle this kind of functionality.

More recently, Node.js introduced a non-blocking I/O environment to extend this concept to file access, network calls and so on.

Handling errors in callbacks

How do you handle errors with callbacks? One very common strategy is to use what Node.js adopted: the first parameter in any callback function is the error object: error-first callbacks

If there is no error, the object is null. If there is an error, it contains some description of the error and other information.

const fs = require('node:fs');

fs.readFile('/file.json', (err, data) => {
if (err) {
// handle error
console.log(err);
return;
}

// no errors, process data
console.log(data);
});

## Discover Timers

### setTimeout

If you specify the timeout delay to 0, the callback function will be executed as soon as possible, but after the current function execution:

```js
setTimeout(() => {
  console.log("after ");
}, 0);

console.log(" before ");

// before
// after
```

This is especially useful to avoid blocking the CPU on intensive tasks and let other functions be executed while performing a heavy calculation, by queuing functions in the scheduler.

Some browsers (IE and Edge) implement a setImmediate() method that does this same exact functionality, but it's not standard and unavailable on other browsers. But it's a standard function in Node.js.

setImmediate() == setTimeout(()=>{},0);

### setInterval

It's common to call clearInterval inside the setInterval callback function, to let it auto-determine if it should run again or stop. For example this code runs something unless App.somethingIWait has the value arrived:

const interval = setInterval(() => {
if (App.somethingIWait === 'arrived') {
clearInterval(interval);
}
// otherwise do things
}, 100);

### Recursive setTimeout

setInterval starts a function every n milliseconds, without any consideration about when a function finished its execution.

If one execution of the setInterval callbacks takes longer than expected and it overlaps next callback, you can get rid of this situation by using setTimeout:

```js
onst myFunction = () => {
  // do something

  setTimeout(myFunction, 1000);
};

setTimeout(myFunction, 1000);
```

## Event Loop

@TODO - Read site again

The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. We'll explain this in further detail later in this topic.

When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

VERY IMPORTANT INFO ABOUT HOW NODEJS WORKS [HERE](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

## Event Emitter

If you worked with JavaScript in the browser, you know how much of the interaction of the user is handled through events: mouse clicks, keyboard button presses, reacting to mouse movements, and so on.

On the backend side, Node.js offers us the option to build a similar system using the events module.

This module, in particular, offers the EventEmitter class, which we'll use to handle our events.

You initialize that using

import EventEmitter from 'node:events';

const eventEmitter = new EventEmitter();

JavaScript
Copy to clipboard

This object exposes, among many others, the on and emit methods.

    emit is used to trigger an event
    on is used to add a callback function that's going to be executed when the event is triggered

For example, let's create a start event, and as a matter of providing a sample, we react to that by just logging to the console:

eventEmitter.on('start', () => {
console.log('started');
});

JavaScript
Copy to clipboard

When we run

eventEmitter.emit('start');

JavaScript
Copy to clipboard

the event handler function is triggered, and we get the console log.

You can pass arguments to the event handler by passing them as additional arguments to emit():

eventEmitter.on('start', number => {
console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);

JavaScript
Copy to clipboard

Multiple arguments:

eventEmitter.on('start', (start, end) => {
console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);

JavaScript
Copy to clipboard

The EventEmitter object also exposes several other methods to interact with events, like

    once(): add a one-time listener
    removeListener() / off(): remove an event listener from an event
    removeAllListeners(): remove all listeners for an event

## Understanding process.nextTick()

As you try to understand the Node.js event loop, one important part of it is process.nextTick(). Every time the event loop takes a full trip, we call it a tick.

When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts:

process.nextTick(() => {
// do something
});

JavaScript
Copy to clipboard

The event loop is busy processing the current function code. When this operation ends, the JS engine runs all the functions passed to nextTick calls during that operation.

It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.

Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.

Use nextTick() when you want to make sure that in the next event loop iteration that code is already executed.
An Example of the order of events:

console.log('Hello => number 1');

setImmediate(() => {
console.log('Running before the timeout => number 3');
});

setTimeout(() => {
console.log('The timeout running last => number 4');
}, 0);

process.nextTick(() => {
console.log('Running at next tick => number 2');
});

JavaScript
Copy to clipboard
Example output:

Hello => number 1
Running at next tick => number 2
Running before the timeout => number 3
The timeout running last => number 4

Bash
Copy to clipboard

The exact output may differ from run to run.

## Understanding setImmediate()

When you want to execute some piece of code asynchronously, but as soon as possible, one option is to use the setImmediate() function provided by Node.js:

setImmediate(() => {
// run something
});

JavaScript
Copy to clipboard

Any function passed as the setImmediate() argument is a callback that's executed in the next iteration of the event loop.

How is setImmediate() different from setTimeout(() => {}, 0) (passing a 0ms timeout), and from process.nextTick() and Promise.then()?

A function passed to process.nextTick() is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before setTimeout and setImmediate.

A setTimeout() callback with a 0ms delay is very similar to setImmediate(). The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.

A process.nextTick callback is added to process.nextTick queue. A Promise.then() callback is added to promises microtask queue. A setTimeout, setImmediate callback is added to macrotask queue.

Event loop executes tasks in process.nextTick queue first, and then executes promises microtask queue, and then executes macrotask queue.

Here is an example to show the order between setImmediate(), process.nextTick() and Promise.then():

const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
console.log('start');
setImmediate(baz);
new Promise((resolve, reject) => {
resolve('bar');
}).then(resolve => {
console.log(resolve);
process.nextTick(zoo);
});
process.nextTick(foo);
};

start();

// start foo bar zoo baz

JavaScript
Copy to clipboard

This code will first call start(), then call foo() in process.nextTick queue. After that, it will handle promises microtask queue, which prints bar and adds zoo() in process.nextTick queue at the same time. Then it will call zoo() which has just been added. In the end, the baz() in macrotask queue is called.

The principle aforementioned holds true in CommonJS cases, but keep in mind in ES Modules, e.g. mjs files, the execution order will be different:

// start bar foo zoo baz

JavaScript
Copy to clipboard

This is because the ES Module being loaded is wrapped as an asynchronous operation, and thus the entire script is actually already in the promises microtask queue. So when the promise is immediately resolved, its callback is appended to the microtask queue. Node.js will attempt to clear the queue until moving to any other queue, and hence you will see it outputs bar first.

## Don't Block the Event Loop (or the Worker Pool)

Summary

Node.js runs JavaScript code in the Event Loop (initialization and callbacks), and offers a Worker Pool to handle expensive tasks like file I/O. Node.js scales well, sometimes better than more heavyweight approaches like Apache. The secret to the scalability of Node.js is that it uses a small number of threads to handle many clients. If Node.js can make do with fewer threads, then it can spend more of your system's time and memory working on clients rather than on paying space and time overheads for threads (memory, context-switching). But because Node.js has only a few threads, you must structure your application to use them wisely.

Here's a good rule of thumb for keeping your Node.js server speedy: Node.js is fast when the work associated with each client at any given time is "small".

This applies to callbacks on the Event Loop and tasks on the Worker Pool.

Why should I avoid blocking the Event Loop and the Worker Pool?

Node.js uses a small number of threads to handle many clients. In Node.js there are two types of threads: one Event Loop (aka the main loop, main thread, event thread, etc.), and a pool of k Workers in a Worker Pool (aka the threadpool).

If a thread is taking a long time to execute a callback (Event Loop) or a task (Worker), we call it "blocked". While a thread is blocked working on behalf of one client, it cannot handle requests from any other clients. This provides two motivations for blocking neither the Event Loop nor the Worker Pool:

    Performance: If you regularly perform heavyweight activity on either type of thread, the throughput (requests/second) of your server will suffer.
    Security: If it is possible that for certain input one of your threads might block, a malicious client could submit this "evil input", make your threads block, and keep them from working on other clients. This would be a Denial of Service attack.

A quick review of Node

Node.js uses the Event-Driven Architecture: it has an Event Loop for orchestration and a Worker Pool for expensive tasks.
What code runs on the Event Loop?

When they begin, Node.js applications first complete an initialization phase, require'ing modules and registering callbacks for events. Node.js applications then enter the Event Loop, responding to incoming client requests by executing the appropriate callback. This callback executes synchronously, and may register asynchronous requests to continue processing after it completes. The callbacks for these asynchronous requests will also be executed on the Event Loop.

The Event Loop will also fulfill the non-blocking asynchronous requests made by its callbacks, e.g., network I/O.

In summary, the Event Loop executes the JavaScript callbacks registered for events, and is also responsible for fulfilling non-blocking asynchronous requests like network I/O.

What code runs on the Worker Pool?

The Worker Pool of Node.js is implemented in libuv (docs), which exposes a general task submission API.

Node.js uses the Worker Pool to handle "expensive" tasks. This includes I/O for which an operating system does not provide a non-blocking version, as well as particularly CPU-intensive tasks.

These are the Node.js module APIs that make use of this Worker Pool:

    I/O-intensive
        DNS: dns.lookup(), dns.lookupService().
        File System: All file system APIs except fs.FSWatcher() and those that are explicitly synchronous use libuv's threadpool.
    CPU-intensive
        Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().
        Zlib: All zlib APIs except those that are explicitly synchronous use libuv's threadpool.

In many Node.js applications, these APIs are the only sources of tasks for the Worker Pool. Applications and modules that use a C++ add-on can submit other tasks to the Worker Pool.

For the sake of completeness, we note that when you call one of these APIs from a callback on the Event Loop, the Event Loop pays some minor setup costs as it enters the Node.js C++ bindings for that API and submits a task to the Worker Pool. These costs are negligible compared to the overall cost of the task, which is why the Event Loop is offloading it. When submitting one of these tasks to the Worker Pool, Node.js provides a pointer to the corresponding C++ function in the Node.js C++ bindings.

How does Node.js decide what code to run next?

Abstractly, the Event Loop and the Worker Pool maintain queues for pending events and pending tasks, respectively.

In truth, the Event Loop does not actually maintain a queue. Instead, it has a collection of file descriptors that it asks the operating system to monitor, using a mechanism like epoll (Linux), kqueue (OSX), event ports (Solaris), or IOCP (Windows). These file descriptors correspond to network sockets, any files it is watching, and so on. When the operating system says that one of these file descriptors is ready, the Event Loop translates it to the appropriate event and invokes the callback(s) associated with that event. You can learn more about this process here.

In contrast, the Worker Pool uses a real queue whose entries are tasks to be processed. A Worker pops a task from this queue and works on it, and when finished the Worker raises an "At least one task is finished" event for the Event Loop.
What does this mean for application design?

In a one-thread-per-client system like Apache, each pending client is assigned its own thread. If a thread handling one client blocks, the operating system will interrupt it and give another client a turn. The operating system thus ensures that clients that require a small amount of work are not penalized by clients that require more work.

Because Node.js handles many clients with few threads, if a thread blocks handling one client's request, then pending client requests may not get a turn until the thread finishes its callback or task. The fair treatment of clients is thus the responsibility of your application. This means that you shouldn't do too much work for any client in any single callback or task.

This is part of why Node.js can scale well, but it also means that you are responsible for ensuring fair scheduling. The next sections talk about how to ensure fair scheduling for the Event Loop and for the Worker Pool.
Don't block the Event Loop

The Event Loop notices each new client connection and orchestrates the generation of a response. All incoming requests and outgoing responses pass through the Event Loop. This means that if the Event Loop spends too long at any point, all current and new clients will not get a turn.

You should make sure you never block the Event Loop. In other words, each of your JavaScript callbacks should complete quickly. This of course also applies to your await's, your Promise.then's, and so on.

A good way to ensure this is to reason about the "computational complexity" of your callbacks. If your callback takes a constant number of steps no matter what its arguments are, then you'll always give every pending client a fair turn. If your callback takes a different number of steps depending on its arguments, then you should think about how long the arguments might be.

Example 1: A constant-time callback.

app.get('/constant-time', (req, res) => {
res.sendStatus(200);
});

JavaScript
Copy to clipboard

Example 2: An O(n) callback. This callback will run quickly for small n and more slowly for large n.

app.get('/countToN', (req, res) => {
let n = req.query.n;

// n iterations before giving someone else a turn
for (let i = 0; i < n; i++) {
console.log(`Iter ${i}`);
}

res.sendStatus(200);
});

JavaScript
Copy to clipboard

Example 3: An O(n^2) callback. This callback will still run quickly for small n, but for large n it will run much more slowly than the previous O(n) example.

app.get('/countToN2', (req, res) => {
let n = req.query.n;

// n^2 iterations before giving someone else a turn
for (let i = 0; i < n; i++) {
for (let j = 0; j < n; j++) {
console.log(`Iter ${i}.${j}`);
}
}

res.sendStatus(200);
});

JavaScript
Copy to clipboard
How careful should you be?

Node.js uses the Google V8 engine for JavaScript, which is quite fast for many common operations. Exceptions to this rule are regexps and JSON operations, discussed below.

However, for complex tasks you should consider bounding the input and rejecting inputs that are too long. That way, even if your callback has large complexity, by bounding the input you ensure the callback cannot take more than the worst-case time on the longest acceptable input. You can then evaluate the worst-case cost of this callback and determine whether its running time is acceptable in your context.

Blocking the Event Loop: REDOS

One common way to block the Event Loop disastrously is by using a "vulnerable" regular expression.
Avoiding vulnerable regular expressions

A regular expression (regexp) matches an input string against a pattern. We usually think of a regexp match as requiring a single pass through the input string --- O(n) time where n is the length of the input string. In many cases, a single pass is indeed all it takes. Unfortunately, in some cases the regexp match might require an exponential number of trips through the input string --- O(2^n) time. An exponential number of trips means that if the engine requires x trips to determine a match, it will need 2\*x trips if we add only one more character to the input string. Since the number of trips is linearly related to the time required, the effect of this evaluation will be to block the Event Loop.

A vulnerable regular expression is one on which your regular expression engine might take exponential time, exposing you to REDOS on "evil input". Whether or not your regular expression pattern is vulnerable (i.e. the regexp engine might take exponential time on it) is actually a difficult question to answer, and varies depending on whether you're using Perl, Python, Ruby, Java, JavaScript, etc., but here are some rules of thumb that apply across all of these languages:

    Avoid nested quantifiers like (a+)*. V8's regexp engine can handle some of these quickly, but others are vulnerable.
    Avoid OR's with overlapping clauses, like (a|a)*. Again, these are sometimes-fast.
    Avoid using backreferences, like (a.*) \1. No regexp engine can guarantee evaluating these in linear time.
    If you're doing a simple string match, use indexOf or the local equivalent. It will be cheaper and will never take more than O(n).

If you aren't sure whether your regular expression is vulnerable, remember that Node.js generally doesn't have trouble reporting a match even for a vulnerable regexp and a long input string. The exponential behavior is triggered when there is a mismatch but Node.js can't be certain until it tries many paths through the input string.

Anti-REDOS Resources

There are some tools to check your regexps for safety, like

    safe-regex
    rxxr2.

However, neither of these will catch all vulnerable regexps.

Another approach is to use a different regexp engine. You could use the node-re2 module, which uses Google's blazing-fast RE2 regexp engine. But be warned, RE2 is not 100% compatible with V8's regexps, so check for regressions if you swap in the node-re2 module to handle your regexps. And particularly complicated regexps are not supported by node-re2.

If you're trying to match something "obvious", like a URL or a file path, find an example in a regexp library or use an npm module, e.g. ip-regex.

Blocking the Event Loop: Node.js core modules

Several Node.js core modules have synchronous expensive APIs, including:

    Encryption
    Compression
    File system
    Child process

These APIs are expensive, because they involve significant computation (encryption, compression), require I/O (file I/O), or potentially both (child process). These APIs are intended for scripting convenience, but are not intended for use in the server context. If you execute them on the Event Loop, they will take far longer to complete than a typical JavaScript instruction, blocking the Event Loop.

In a server, you should not use the following synchronous APIs from these modules:

    Encryption:
        crypto.randomBytes (synchronous version)
        crypto.randomFillSync
        crypto.pbkdf2Sync
        You should also be careful about providing large input to the encryption and decryption routines.
    Compression:
        zlib.inflateSync
        zlib.deflateSync
    File system:
        Do not use the synchronous file system APIs. For example, if the file you access is in a distributed file system like NFS, access times can vary widely.
    Child process:
        child_process.spawnSync
        child_process.execSync
        child_process.execFileSync

This list is reasonably complete as of Node.js v9.

Blocking the Event Loop: JSON DOS

JSON.parse and JSON.stringify are other potentially expensive operations. While these are O(n) in the length of the input, for large n they can take surprisingly long.

If your server manipulates JSON objects, particularly those from a client, you should be cautious about the size of the objects or strings you work with on the Event Loop.

Example: JSON blocking. We create an object obj of size 2^21 and JSON.stringify it, run indexOf on the string, and then JSON.parse it. The JSON.stringify'd string is 50MB. It takes 0.7 seconds to stringify the object, 0.03 seconds to indexOf on the 50MB string, and 1.3 seconds to parse the string.
There are npm modules that offer asynchronous JSON APIs. See for example:

    JSONStream, which has stream APIs.
    Big-Friendly JSON, which has stream APIs as well as asynchronous versions of the standard JSON APIs using the partitioning-on-the-Event-Loop paradigm outlined below.

Complex calculations without blocking the Event Loop

Suppose you want to do complex calculations in JavaScript without blocking the Event Loop. You have two options: partitioning or offloading.
Complex calculations without blocking the Event Loop

Suppose you want to do complex calculations in JavaScript without blocking the Event Loop. You have two options: partitioning or offloading.
Partitioning

You could partition your calculations so that each runs on the Event Loop but regularly yields (gives turns to) other pending events. In JavaScript it's easy to save the state of an ongoing task in a closure, as shown in example 2 below.

For a simple example, suppose you want to compute the average of the numbers 1 to n.

Example 1: Un-partitioned average, costs O(n)

for (let i = 0; i < n; i++) sum += i;
let avg = sum / n;
console.log('avg: ' + avg);

JavaScript
Copy to clipboard

Example 2: Partitioned average, each of the n asynchronous steps costs O(1).

function asyncAvg(n, avgCB) {
// Save ongoing sum in JS closure.
let sum = 0;
function help(i, cb) {
sum += i;
if (i == n) {
cb(sum);
return;
}

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i + 1, cb));

}

// Start the helper, with CB to call avgCB.
help(1, function (sum) {
let avg = sum / n;
avgCB(avg);
});
}

asyncAvg(n, function (avg) {
console.log('avg of 1-n: ' + avg);
});

JavaScript
Copy to clipboard

You can apply this principle to array iterations and so forth.
Offloading

If you need to do something more complex, partitioning is not a good option. This is because partitioning uses only the Event Loop, and you won't benefit from multiple cores almost certainly available on your machine. Remember, the Event Loop should orchestrate client requests, not fulfill them itself. For a complicated task, move the work off of the Event Loop onto a Worker Pool.
How to offload

You have two options for a destination Worker Pool to which to offload work.

    You can use the built-in Node.js Worker Pool by developing a C++ addon. On older versions of Node, build your C++ addon using NAN, and on newer versions use N-API. node-webworker-threads offers a JavaScript-only way to access the Node.js Worker Pool.
    You can create and manage your own Worker Pool dedicated to computation rather than the Node.js I/O-themed Worker Pool. The most straightforward ways to do this is using Child Process or Cluster.

You should not simply create a Child Process for every client. You can receive client requests more quickly than you can create and manage children, and your server might become a fork bomb.
Downside of offloading

The downside of the offloading approach is that it incurs overhead in the form of communication costs. Only the Event Loop is allowed to see the "namespace" (JavaScript state) of your application. From a Worker, you cannot manipulate a JavaScript object in the Event Loop's namespace. Instead, you have to serialize and deserialize any objects you wish to share. Then the Worker can operate on its own copy of these object(s) and return the modified object (or a "patch") to the Event Loop.

For serialization concerns, see the section on JSON DOS.
Some suggestions for offloading

You may wish to distinguish between CPU-intensive and I/O-intensive tasks because they have markedly different characteristics.

A CPU-intensive task only makes progress when its Worker is scheduled, and the Worker must be scheduled onto one of your machine's logical cores. If you have 4 logical cores and 5 Workers, one of these Workers cannot make progress. As a result, you are paying overhead (memory and scheduling costs) for this Worker and getting no return for it.

I/O-intensive tasks involve querying an external service provider (DNS, file system, etc.) and waiting for its response. While a Worker with an I/O-intensive task is waiting for its response, it has nothing else to do and can be de-scheduled by the operating system, giving another Worker a chance to submit their request. Thus, I/O-intensive tasks will be making progress even while the associated thread is not running. External service providers like databases and file systems have been highly optimized to handle many pending requests concurrently. For example, a file system will examine a large set of pending write and read requests to merge conflicting updates and to retrieve files in an optimal order (e.g. see these slides).

If you rely on only one Worker Pool, e.g. the Node.js Worker Pool, then the differing characteristics of CPU-bound and I/O-bound work may harm your application's performance.

For this reason, you might wish to maintain a separate Computation Worker Pool.
Offloading: conclusions

For simple tasks, like iterating over the elements of an arbitrarily long array, partitioning might be a good option. If your computation is more complex, offloading is a better approach: the communication costs, i.e. the overhead of passing serialized objects between the Event Loop and the Worker Pool, are offset by the benefit of using multiple cores.

However, if your server relies heavily on complex calculations, you should think about whether Node.js is really a good fit. Node.js excels for I/O-bound work, but for expensive computation it might not be the best option.

If you take the offloading approach, see the section on not blocking the Worker Pool.
Don't block the Worker Pool

Node.js has a Worker Pool composed of k Workers. If you are using the Offloading paradigm discussed above, you might have a separate Computational Worker Pool, to which the same principles apply. In either case, let us assume that k is much smaller than the number of clients you might be handling concurrently. This is in keeping with the "one thread for many clients" philosophy of Node.js, the secret to its scalability.

As discussed above, each Worker completes its current Task before proceeding to the next one on the Worker Pool queue.

Now, there will be variation in the cost of the Tasks required to handle your clients' requests. Some Tasks can be completed quickly (e.g. reading short or cached files, or producing a small number of random bytes), and others will take longer (e.g reading larger or uncached files, or generating more random bytes). Your goal should be to minimize the variation in Task times, and you should use Task partitioning to accomplish this.
Minimizing the variation in Task times

If a Worker's current Task is much more expensive than other Tasks, then it will be unavailable to work on other pending Tasks. In other words, each relatively long Task effectively decreases the size of the Worker Pool by one until it is completed. This is undesirable because, up to a point, the more Workers in the Worker Pool, the greater the Worker Pool throughput (tasks/second) and thus the greater the server throughput (client requests/second). One client with a relatively expensive Task will decrease the throughput of the Worker Pool, in turn decreasing the throughput of the server.

To avoid this, you should try to minimize variation in the length of Tasks you submit to the Worker Pool. While it is appropriate to treat the external systems accessed by your I/O requests (DB, FS, etc.) as black boxes, you should be aware of the relative cost of these I/O requests, and should avoid submitting requests you can expect to be particularly long.

Two examples should illustrate the possible variation in task times.
Variation example: Long-running file system reads

Suppose your server must read files in order to handle some client requests. After consulting the Node.js File system APIs, you opted to use fs.readFile() for simplicity. However, fs.readFile() is (currently) not partitioned: it submits a single fs.read() Task spanning the entire file. If you read shorter files for some users and longer files for others, fs.readFile() may introduce significant variation in Task lengths, to the detriment of Worker Pool throughput.

For a worst-case scenario, suppose an attacker can convince your server to read an arbitrary file (this is a directory traversal vulnerability). If your server is running Linux, the attacker can name an extremely slow file: /dev/random. For all practical purposes, /dev/random is infinitely slow, and every Worker asked to read from /dev/random will never finish that Task. An attacker then submits k requests, one for each Worker, and no other client requests that use the Worker Pool will make progress.
Variation example: Long-running crypto operations

Suppose your server generates cryptographically secure random bytes using crypto.randomBytes(). crypto.randomBytes() is not partitioned: it creates a single randomBytes() Task to generate as many bytes as you requested. If you create fewer bytes for some users and more bytes for others, crypto.randomBytes() is another source of variation in Task lengths.
Task partitioning

Tasks with variable time costs can harm the throughput of the Worker Pool. To minimize variation in Task times, as far as possible you should partition each Task into comparable-cost sub-Tasks. When each sub-Task completes it should submit the next sub-Task, and when the final sub-Task completes it should notify the submitter.

To continue the fs.readFile() example, you should instead use fs.read() (manual partitioning) or ReadStream (automatically partitioned).

The same principle applies to CPU-bound tasks; the asyncAvg example might be inappropriate for the Event Loop, but it is well suited to the Worker Pool.

When you partition a Task into sub-Tasks, shorter Tasks expand into a small number of sub-Tasks, and longer Tasks expand into a larger number of sub-Tasks. Between each sub-Task of a longer Task, the Worker to which it was assigned can work on a sub-Task from another, shorter, Task, thus improving the overall Task throughput of the Worker Pool.

Note that the number of sub-Tasks completed is not a useful metric for the throughput of the Worker Pool. Instead, concern yourself with the number of Tasks completed.
Avoiding Task partitioning

Recall that the purpose of Task partitioning is to minimize the variation in Task times. If you can distinguish between shorter Tasks and longer Tasks (e.g. summing an array vs. sorting an array), you could create one Worker Pool for each class of Task. Routing shorter Tasks and longer Tasks to separate Worker Pools is another way to minimize Task time variation.

In favor of this approach, partitioning Tasks incurs overhead (the costs of creating a Worker Pool Task representation and of manipulating the Worker Pool queue), and avoiding partitioning saves you the costs of additional trips to the Worker Pool. It also keeps you from making mistakes in partitioning your Tasks.

The downside of this approach is that Workers in all of these Worker Pools will incur space and time overheads and will compete with each other for CPU time. Remember that each CPU-bound Task makes progress only while it is scheduled. As a result, you should only consider this approach after careful analysis.
Worker Pool: conclusions

Whether you use only the Node.js Worker Pool or maintain separate Worker Pool(s), you should optimize the Task throughput of your Pool(s).

To do this, minimize the variation in Task times by using Task partitioning.
The risks of npm modules

While the Node.js core modules offer building blocks for a wide variety of applications, sometimes something more is needed. Node.js developers benefit tremendously from the npm ecosystem, with hundreds of thousands of modules offering functionality to accelerate your development process.

Remember, however, that the majority of these modules are written by third-party developers and are generally released with only best-effort guarantees. A developer using an npm module should be concerned about two things, though the latter is frequently forgotten.

    Does it honor its APIs?
    Might its APIs block the Event Loop or a Worker? Many modules make no effort to indicate the cost of their APIs, to the detriment of the community.

For simple APIs you can estimate the cost of the APIs; the cost of string manipulation isn't hard to fathom. But in many cases it's unclear how much an API might cost.

If you are calling an API that might do something expensive, double-check the cost. Ask the developers to document it, or examine the source code yourself (and submit a PR documenting the cost).

Remember, even if the API is asynchronous, you don't know how much time it might spend on a Worker or on the Event Loop in each of its partitions. For example, suppose in the asyncAvg example given above, each call to the helper function summed half of the numbers rather than one of them. Then this function would still be asynchronous, but the cost of each partition would be O(n), not O(1), making it much less safe to use for arbitrary values of n.
Conclusion

Node.js has two types of threads: one Event Loop and k Workers. The Event Loop is responsible for JavaScript callbacks and non-blocking I/O, and a Worker executes tasks corresponding to C++ code that completes an asynchronous request, including blocking I/O and CPU-intensive work. Both types of threads work on no more than one activity at a time. If any callback or task takes a long time, the thread running it becomes blocked. If your application makes blocking callbacks or tasks, this can lead to degraded throughput (clients/second) at best, and complete denial of service at worst.

To write a high-throughput, more DoS-proof web server, you must ensure that on benign and on malicious input, neither your Event Loop nor your Workers will block.

# Manipulating Files

## File Stats

const fs = require('node:fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
if (err) {
console.error(err);
}
stats.isFile(); // true
stats.isDirectory(); // false
stats.isSymbolicLink(); // false
stats.size; // 1024000 //= 1MB
});

## File Paths

import path from 'node:path';

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

you can get the file name without the extension by specifying a second argument to basename:

path.basename(notes, path.extname(notes)); // notes

const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
Every file in the system has a path. On Linux and macOS, a path might look like: /users/joe/file.txt while Windows computers are different, and have a structure such as: C:\users\joe\file.txt

You need to pay attention when using paths in your applications, as this difference must be taken into account.

You include this module in your files using const path = require('node:path'); and you can start using its methods.
Getting information out of a path

Given a path, you can extract information out of it using those methods:

    dirname: gets the parent folder of a file
    basename: gets the filename part
    extname: gets the file extension

Example

import path from 'node:path';

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

JavaScript
Copy to clipboard

You can get the file name without the extension by specifying a second argument to basename:

path.basename(notes, path.extname(notes)); // notes

JavaScript
Copy to clipboard
Working with paths

You can join two or more parts of a path by using path.join():

const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'

JavaScript
Copy to clipboard

You can get the absolute path calculation of a relative path using path.resolve():

path.resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder

JavaScript
Copy to clipboard

In this case Node.js will simply append /joe.txt to the current working directory. If you specify a second parameter folder, resolve will use the first as a base for the second:

path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder

JavaScript
Copy to clipboard

If the first parameter starts with a slash, that means it's an absolute path:

path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'

JavaScript
Copy to clipboard

path.normalize() is another useful function, that will try and calculate the actual path, when it contains relative specifiers like . or .., or double slashes:

path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'

JavaScript
Copy to clipboard

Neither resolve nor normalize will check if the path exists. They just calculate a path based on the information they got.

## File descriptors

Working with file descriptors in Node.js

Before you're able to interact with a file that sits in your filesystem, you must get a file descriptor.

A file descriptor is a reference to an open file, a number (fd) returned by opening the file using the open() method offered by the fs module. This number (fd) uniquely identifies an open file in operating system:

const fs = require('node:fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
// fd is our file descriptor
});

JavaScript
Copy to clipboard

Notice the r we used as the second parameter to the fs.open() call.

That flag means we open the file for reading.

Other flags you'll commonly use are:
Flag Description File gets created if it doesn't exist
r+ This flag opens the file for reading and writing ❌
w+ This flag opens the file for reading and writing and it also positions the stream at the beginning of the file ✅
a This flag opens the file for writing and it also positions the stream at the end of the file ✅
a+ This flag opens the file for reading and writing and it also positions the stream at the end of the file ✅

You can also open the file by using the fs.openSync method, which returns the file descriptor, instead of providing it in a callback:

const fs = require('node:fs');

try {
const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
console.error(err);
}

JavaScript
Copy to clipboard

Once you get the file descriptor, in whatever way you choose, you can perform all the operations that require it, like calling fs.close() and many other operations that interact with the filesystem.

You can also open the file by using the promise-based fsPromises.open method offered by the fs/promises module.

The fs/promises module is available starting only from Node.js v14. Before v14, after v10, you can use require('fs').promises instead. Before v10, after v8, you can use util.promisify to convert fs methods into promise-based methods.

const fs = require('node:fs/promises');
// Or const fs = require('fs').promises before v14.
async function example() {
let filehandle;
try {
filehandle = await fs.open('/Users/joe/test.txt', 'r');
console.log(filehandle.fd);
console.log(await filehandle.readFile({ encoding: 'utf8' }));
} finally {
if (filehandle) await filehandle.close();
}
}
example();

JavaScript
Copy to clipboard

Here is an example of util.promisify:

const fs = require('node:fs');
const util = require('node:util');

async function example() {
const open = util.promisify(fs.open);
const fd = await open('/Users/joe/test.txt', 'r');
}
example();

JavaScript
Copy to clipboard

To see more details about the fs/promises module, please check fs/promises API.

## Reading Files

The simplest way to read a file in Node.js is to use the fs.readFile() method, passing it the file path, encoding and a callback function that will be called with the file data (and the error):

const fs = require('node:fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
if (err) {
console.error(err);
return;
}
console.log(data);
});

JavaScript
Copy to clipboard

Alternatively, you can use the synchronous version fs.readFileSync():

const fs = require('node:fs');

try {
const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
console.log(data);
} catch (err) {
console.error(err);
}

JavaScript
Copy to clipboard

You can also use the promise-based fsPromises.readFile() method offered by the fs/promises module:

const fs = require('node:fs/promises');

async function example() {
try {
const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
console.log(data);
} catch (err) {
console.log(err);
}
}
example();

JavaScript
Copy to clipboard

All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data.

This means that big files are going to have a major impact on your memory consumption and speed of execution of the program.

In this case, a better option is to read the file content using streams.

## Writing Files

Writing a file

The easiest way to write to files in Node.js is to use the fs.writeFile() API.

const fs = require('node:fs');

const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
if (err) {
console.error(err);
} else {
// file written successfully
}
});

JavaScript
Copy to clipboard
Writing a file synchronously

Alternatively, you can use the synchronous version fs.writeFileSync():

const fs = require('node:fs');

const content = 'Some content!';

try {
fs.writeFileSync('/Users/joe/test.txt', content);
// file written successfully
} catch (err) {
console.error(err);
}

JavaScript
Copy to clipboard

You can also use the promise-based fsPromises.writeFile() method offered by the fs/promises module:

const fs = require('node:fs/promises');

async function example() {
try {
const content = 'Some content!';
await fs.writeFile('/Users/joe/test.txt', content);
} catch (err) {
console.log(err);
}
}

example();

JavaScript
Copy to clipboard

By default, this API will replace the contents of the file if it does already exist.

You can modify the default by specifying a flag:

fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});

JavaScript
Copy to clipboard
The flags you'll likely use are
Flag Description File gets created if it doesn't exist
r+ This flag opens the file for reading and writing ❌
w+ This flag opens the file for reading and writing and it also positions the stream at the beginning of the file ✅
a This flag opens the file for writing and it also positions the stream at the end of the file ✅
a+ This flag opens the file for reading and writing and it also positions the stream at the end of the file ✅

    You can find more information about the flags in the fs documentation.

Appending content to a file

Appending to files is handy when you don't want to overwrite a file with new content, but rather add to it.
Examples

A handy method to append content to the end of a file is fs.appendFile() (and its fs.appendFileSync() counterpart):

const fs = require('node:fs');

const content = 'Some content!';

fs.appendFile('file.log', content, err => {
if (err) {
console.error(err);
} else {
// done!
}
});

JavaScript
Copy to clipboard
Example with Promises

Here is a fsPromises.appendFile() example:

const fs = require('node:fs/promises');

async function example() {
try {
const content = 'Some content!';
await fs.appendFile('/Users/joe/test.txt', content);
} catch (err) {
console.log(err);
}
}

example();

## Folders

The Node.js fs core module provides many handy methods you can use to work with folders.
Check if a folder exists

Use fs.access() (and its promise-based fsPromises.access() counterpart) to check if the folder exists and Node.js can access it with its permissions.
Create a new folder

Use fs.mkdir() or fs.mkdirSync() or fsPromises.mkdir() to create a new folder.

const fs = require('node:fs');

const folderName = '/Users/joe/test';

try {
if (!fs.existsSync(folderName)) {
fs.mkdirSync(folderName);
}
} catch (err) {
console.error(err);
}

JavaScript
Copy to clipboard
Read the content of a directory

Use fs.readdir() or fs.readdirSync() or fsPromises.readdir() to read the contents of a directory.

This piece of code reads the content of a folder, both files and subfolders, and returns their relative path:

const fs = require('node:fs');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);

JavaScript
Copy to clipboard

You can get the full path:

fs.readdirSync(folderPath).map(fileName => {
return path.join(folderPath, fileName);
});

JavaScript
Copy to clipboard

You can also filter the results to only return the files, and exclude the folders:

const fs = require('node:fs');

const isFile = fileName => {
return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
.map(fileName => {
return path.join(folderPath, fileName);
})
.filter(isFile);

JavaScript
Copy to clipboard
Rename a folder

Use fs.rename() or fs.renameSync() or fsPromises.rename() to rename folder. The first parameter is the current path, the second the new path:

const fs = require('node:fs');

fs.rename('/Users/joe', '/Users/roger', err => {
if (err) {
console.error(err);
}
// done
});

JavaScript
Copy to clipboard

fs.renameSync() is the synchronous version:

const fs = require('node:fs');

try {
fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
console.error(err);
}

JavaScript
Copy to clipboard

fsPromises.rename() is the promise-based version:

const fs = require('node:fs/promises');

async function example() {
try {
await fs.rename('/Users/joe', '/Users/roger');
} catch (err) {
console.log(err);
}
}
example();

JavaScript
Copy to clipboard
Remove a folder

Use fs.rmdir() or fs.rmdirSync() or fsPromises.rmdir() to remove a folder.

const fs = require('node:fs');

fs.rmdir(dir, err => {
if (err) {
throw err;
}

console.log(`${dir} is deleted!`);
});

JavaScript
Copy to clipboard

To remove a folder that has contents use fs.rm() with the option { recursive: true } to recursively remove the contents.

{ recursive: true, force: true } makes it so that exceptions will be ignored if the folder does not exist.

const fs = require('node:fs');

fs.rm(dir, { recursive: true, force: true }, err => {
if (err) {
throw err;
}

console.log(`${dir} is deleted!`);

## Work With Different File Systems

Node.js exposes many features of the filesystem. But not all filesystems are alike. The following are suggested best practices to keep your code simple and safe when working with different filesystems.
Filesystem Behavior

Before you can work with a filesystem, you need to know how it behaves. Different filesystems behave differently and have more or less features than others: case sensitivity, case insensitivity, case preservation, Unicode form preservation, timestamp resolution, extended attributes, inodes, Unix permissions, alternate data streams etc.

Be wary of inferring filesystem behavior from process.platform. For example, do not assume that because your program is running on Darwin that you are therefore working on a case-insensitive filesystem (HFS+), as the user may be using a case-sensitive filesystem (HFSX). Similarly, do not assume that because your program is running on Linux that you are therefore working on a filesystem which supports Unix permissions and inodes, as you may be on a particular external drive, USB or network drive which does not.

The operating system may not make it easy to infer filesystem behavior, but all is not lost. Instead of keeping a list of every known filesystem and behavior (which is always going to be incomplete), you can probe the filesystem to see how it actually behaves. The presence or absence of certain features which are easy to probe, are often enough to infer the behavior of other features which are more difficult to probe.

Remember that some users may have different filesystems mounted at various paths in the working tree.
Avoid a Lowest Common Denominator Approach

You might be tempted to make your program act like a lowest common denominator filesystem, by normalizing all filenames to uppercase, normalizing all filenames to NFC Unicode form, and normalizing all file timestamps to say 1-second resolution. This would be the lowest common denominator approach.

Do not do this. You would only be able to interact safely with a filesystem which has the exact same lowest common denominator characteristics in every respect. You would be unable to work with more advanced filesystems in the way that users expect, and you would run into filename or timestamp collisions. You would most certainly lose and corrupt user data through a series of complicated dependent events, and you would create bugs that would be difficult if not impossible to solve.

What happens when you later need to support a filesystem that only has 2-second or 24-hour timestamp resolution? What happens when the Unicode standard advances to include a slightly different normalization algorithm (as has happened in the past)?

A lowest common denominator approach would tend to try to create a portable program by using only "portable" system calls. This leads to programs that are leaky and not in fact portable.
Adopt a Superset Approach

Make the best use of each platform you support by adopting a superset approach. For example, a portable backup program should sync btimes (the created time of a file or folder) correctly between Windows systems, and should not destroy or alter btimes, even though btimes are not supported on Linux systems. The same portable backup program should sync Unix permissions correctly between Linux systems, and should not destroy or alter Unix permissions, even though Unix permissions are not supported on Windows systems.

Handle different filesystems by making your program act like a more advanced filesystem. Support a superset of all possible features: case-sensitivity, case-preservation, Unicode form sensitivity, Unicode form preservation, Unix permissions, high-resolution nanosecond timestamps, extended attributes etc.

Once you have case-preservation in your program, you can always implement case-insensitivity if you need to interact with a case-insensitive filesystem. But if you forego case-preservation in your program, you cannot interact safely with a case-preserving filesystem. The same is true for Unicode form preservation and timestamp resolution preservation.

If a filesystem provides you with a filename in a mix of lowercase and uppercase, then keep the filename in the exact case given. If a filesystem provides you with a filename in mixed Unicode form or NFC or NFD (or NFKC or NFKD), then keep the filename in the exact byte sequence given. If a filesystem provides you with a millisecond timestamp, then keep the timestamp in millisecond resolution.

When you work with a lesser filesystem, you can always downsample appropriately, with comparison functions as required by the behavior of the filesystem on which your program is running. If you know that the filesystem does not support Unix permissions, then you should not expect to read the same Unix permissions you write. If you know that the filesystem does not preserve case, then you should be prepared to see ABC in a directory listing when your program creates abc. But if you know that the filesystem does preserve case, then you should consider ABC to be a different filename to abc, when detecting file renames or if the filesystem is case-sensitive.
Case Preservation

You may create a directory called test/abc and be surprised to see sometimes that fs.readdir('test') returns ['ABC']. This is not a bug in Node. Node returns the filename as the filesystem stores it, and not all filesystems support case-preservation. Some filesystems convert all filenames to uppercase (or lowercase).
Unicode Form Preservation

Case preservation and Unicode form preservation are similar concepts. To understand why Unicode form should be preserved , make sure that you first understand why case should be preserved. Unicode form preservation is just as simple when understood correctly.

Unicode can encode the same characters using several different byte sequences. Several strings may look the same, but have different byte sequences. When working with UTF-8 strings, be careful that your expectations are in line with how Unicode works. Just as you would not expect all UTF-8 characters to encode to a single byte, you should not expect several UTF-8 strings that look the same to the human eye to have the same byte representation. This may be an expectation that you can have of ASCII, but not of UTF-8.

You may create a directory called test/café (NFC Unicode form with byte sequence <63 61 66 c3 a9> and string.length === 5) and be surprised to see sometimes that fs.readdir('test') returns ['café'] (NFD Unicode form with byte sequence <63 61 66 65 cc 81> and string.length === 6). This is not a bug in Node. Node.js returns the filename as the filesystem stores it, and not all filesystems support Unicode form preservation.

HFS+, for example, will normalize all filenames to a form almost always the same as NFD form. Do not expect HFS+ to behave the same as NTFS or EXT4 and vice-versa. Do not try to change data permanently through normalization as a leaky abstraction to paper over Unicode differences between filesystems. This would create problems without solving any. Rather, preserve Unicode form and use normalization as a comparison function only.
Unicode Form Insensitivity

Unicode form insensitivity and Unicode form preservation are two different filesystem behaviors often mistaken for each other. Just as case-insensitivity has sometimes been incorrectly implemented by permanently normalizing filenames to uppercase when storing and transmitting filenames, so Unicode form insensitivity has sometimes been incorrectly implemented by permanently normalizing filenames to a certain Unicode form (NFD in the case of HFS+) when storing and transmitting filenames. It is possible and much better to implement Unicode form insensitivity without sacrificing Unicode form preservation, by using Unicode normalization for comparison only.
Comparing Different Unicode Forms

Node.js provides string.normalize('NFC' / 'NFD') which you can use to normalize a UTF-8 string to either NFC or NFD. You should never store the output from this function but only use it as part of a comparison function to test whether two UTF-8 strings would look the same to the user.

You can use string1.normalize('NFC') === string2.normalize('NFC') or string1.normalize('NFD') === string2.normalize('NFD') as your comparison function. Which form you use does not matter.

Normalization is fast but you may want to use a cache as input to your comparison function to avoid normalizing the same string many times over. If the string is not present in the cache then normalize it and cache it. Be careful not to store or persist the cache, use it only as a cache.

Note that using normalize() requires that your version of Node.js include ICU (otherwise normalize() will just return the original string). If you download the latest version of Node.js from the website then it will include ICU.
Timestamp Resolution

You may set the mtime (the modified time) of a file to 1444291759414 (millisecond resolution) and be surprised to see sometimes that fs.stat returns the new mtime as 1444291759000 (1-second resolution) or 1444291758000 (2-second resolution). This is not a bug in Node. Node.js returns the timestamp as the filesystem stores it, and not all filesystems support nanosecond, millisecond or 1-second timestamp resolution. Some filesystems even have very coarse resolution for the atime timestamp in particular, e.g. 24 hours for some FAT filesystems.
Do Not Corrupt Filenames and Timestamps Through Normalization

Filenames and timestamps are user data. Just as you would never automatically rewrite user file data to uppercase the data or normalize CRLF to LF line-endings, so you should never change, interfere or corrupt filenames or timestamps through case / Unicode form / timestamp normalization. Normalization should only ever be used for comparison, never for altering data.

Normalization is effectively a lossy hash code. You can use it to test for certain kinds of equivalence (e.g. do several strings look the same even though they have different byte sequences) but you can never use it as a substitute for the actual data. Your program should pass on filename and timestamp data as is.

Your program can create new data in NFC (or in any combination of Unicode form it prefers) or with a lowercase or uppercase filename, or with a 2-second resolution timestamp, but your program should not corrupt existing user data by imposing case / Unicode form / timestamp normalization. Rather, adopt a superset approach and preserve case, Unicode form and timestamp resolution in your program. That way, you will be able to interact safely with filesystems which do the same.
Use Normalization Comparison Functions Appropriately

Make sure that you use case / Unicode form / timestamp comparison functions appropriately. Do not use a case-insensitive filename comparison function if you are working on a case-sensitive filesystem. Do not use a Unicode form insensitive comparison function if you are working on a Unicode form sensitive filesystem (e.g. NTFS and most Linux filesystems which preserve both NFC and NFD or mixed Unicode forms). Do not compare timestamps at 2-second resolution if you are working on a nanosecond timestamp resolution filesystem.
Be Prepared for Slight Differences in Comparison Functions

Be careful that your comparison functions match those of the filesystem (or probe the filesystem if possible to see how it would actually compare). Case-insensitivity for example is more complex than a simple toLowerCase() comparison. In fact, toUpperCase() is usually better than toLowerCase() (since it handles certain foreign language characters differently). But better still would be to probe the filesystem since every filesystem has its own case comparison table baked in.

As an example, Apple's HFS+ normalizes filenames to NFD form but this NFD form is actually an older version of the current NFD form and may sometimes be slightly different from the latest Unicode standard's NFD form. Do not expect HFS+ NFD to be exactly the same as Unicode NFD all the time.

# Command Line

# Modules

# Diagnostics

# Test Runner
