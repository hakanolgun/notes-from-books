JavaScript is an

- interpreted (or JIT compiled)
- prototype-based (like smalltalk and self but more popular. with lua)
- multi-paradigm (supports OOP, imperative, declarative(functional) styles)
- single threaded
  language with first-class functions.

As soon as a browser implements a feature MDN tries to document it.

# COMPLETE BEGINNERS

## Introducing JavaScript Objects

### Object Prototypes

Every object in JavaScript has a built-in property, which is called its prototype. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.

Note: The property of an object that points to its prototype is not called prototype. Its name is not standard, but in practice all browsers use **proto**. The standard way to access an object's prototype is the Object.getPrototypeOf() method.

When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property. If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case undefined is returned.

The prototype of Object.prototype is null, so it's at the end of the prototype chain:

### Object-Oriented Programming

if a method is defined on a constructor's prototype property, then all objects created using that constructor get that method via their prototype, and we don't need to define it in the constructor.

First, in class-based OOP, classes and objects are two separate constructs, and objects are always created as instances of classes. Also, there is a distinction between the feature used to define a class (the class syntax itself) and the feature used to instantiate an object (a constructor). In JavaScript, we can and often do create objects without any separate class definition, either using a function or an object literal. This can make working with objects much more lightweight than it is in classical OOP.

Second, although a prototype chain looks like an inheritance hierarchy and behaves like it in some ways, it's different in others. When a subclass is instantiated, a single object is created which combines properties defined in the subclass with properties defined further up the hierarchy. With prototyping, each level of the hierarchy is represented by a separate object, and they are linked together via the **proto** property. The prototype chain's behavior is less like inheritance and more like delegation. Delegation is a programming pattern where an object, when asked to perform a task, can perform the task itself or ask another object (its delegate) to perform the task on its behalf. In many ways, delegation is a more flexible way of combining objects than inheritance (for one thing, it's possible to change or completely replace the delegate at run time).

That said, constructors and prototypes can be used to implement class-based OOP patterns in JavaScript. But using them directly to implement features like inheritance is tricky, so JavaScript provides extra features, layered on top of the prototype model, that map more directly to the concepts of class-based OOP.

### Classes

```js
class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}`);
  }
}
```

Note: If a subclass has any of its own initialization to do, it must first call the superclass constructor using super(), passing up any parameters that the superclass constructor is expecting.

Private data properties must be declared in the class declaration, and their names start with #.You can have private methods as well as private data properties. Just like private data properties, their names start with #, and they can only be called by the object's own methods.

### Working with JSON

JSON is a text-based data format following JavaScript object syntax, which was popularized by Douglas Crockford. Even though it closely resembles JavaScript object literal syntax, it can be used independently from JavaScript, and many programming environments feature the ability to read (parse) and generate JSON.

JSON exists as a string — useful when you want to transmit data across a network. It needs to be converted to a native JavaScript object when you want to access the data. This is not a big issue — JavaScript provides a global JSON object that has methods available for converting between the two.

Note: Converting a string to a native object is called deserialization, while converting a native object to a string so it can be transmitted across the network is called serialization.

But sometimes we aren't so lucky — sometimes we receive a raw JSON string, and we need to convert it to an object ourselves. And when we want to send a JavaScript object across the network, we need to convert it to JSON (a string) before sending it. Luckily, these two problems are so common in web development that a built-in JSON object is available in browsers, which contains the following two methods:

- parse(): Accepts a JSON string as a parameter, and returns the corresponding JavaScript object.
- stringify(): Accepts an object as a parameter, and returns the equivalent JSON string.

# JAVASCRIPT GUIDE

## Introduction

The ECMAScript standard is documented in the ECMA-262 specification.The ECMA-262 standard is also approved by the ISO (International Organization for Standardization) as ISO-16262. You can also find the specification on the Ecma International website. The ECMAScript specification does not describe the Document Object Model (DOM), which is standardized by the World Wide Web Consortium (W3C) and/or WHATWG (Web Hypertext Application Technology Working Group).

## Grammar and types

JavaScript is case-sensitive and uses the Unicode character set. For example, the word Früh (which means "early" in German) could be used as a variable name. But the variable früh is not the same as Früh.

The source text of JavaScript script gets scanned from left to right, and is converted into a sequence of input elements which are tokens, control characters, line terminators, comments, or whitespace. (Spaces, tabs, and newline characters are considered whitespace.)

### Declarations

#### Variables

You can use most Unicode letters such as å and ü in identifiers. (For more details, see the lexical grammar reference.) You can also use Unicode escape sequences to represent characters in identifiers.

#### Variable scope

A variable may belong to one of the following scopes:

    Global scope: The default scope for all code running in script mode.
    Module scope: The scope for code running in module mode.
    Function scope: The scope created with a function.

In addition, variables declared with let or const can belong to an additional scope:

    Block scope: The scope created with a pair of curly braces (a block).

When you declare a variable outside of any function, it is called a global variable, because it is available to any other code in the current document. When you declare a variable within a function, it is called a local variable, because it is available only within that function. However, variables created with var are not block-scoped, but only local to the function (or global scope) that the block resides within.

#### Variable hoisting

var-declared variables are hoisted, meaning you can refer to the variable anywhere in its scope, even if its declaration isn't reached yet. You can see var declarations as being "lifted" to the top of its function or global scope. However, if you access a variable before it's declared, the value is always undefined, because only its declaration and default initialization (with undefined) is hoisted, but not its value assignment.

Whether let and const are hoisted is a matter of definition debate. Referencing the variable in the block before the variable declaration always results in a ReferenceError, because the variable is in a "temporal dead zone" from the start of the block until the declaration is processed.

Unlike var declarations, which only hoist the declaration but not its value, function declarations are hoisted entirely — you can safely call the function anywhere in its scope.

#### Global variables

Global variables are in fact properties of the global object.

In web pages, the global object is window, so you can read and set global variables using the window.variable syntax. In all environments, the **globalThis** variable (which itself is a global variable) may be used to read and set global variables. This is to provide a consistent interface among various JavaScript runtimes.

Consequently, you can access global variables declared in one window or frame from another window or frame by specifying the window or frame name. For example, if a variable called phoneNumber is declared in a document, you can refer to this variable from an iframe as parent.phoneNumber.

### Data Structures and Types

#### Data Types

1. Boolean
2. null (It is also primitive but if you typeof it you get Object)
3. undefined
4. Number
5. BigInt
6. String
7. Symbol
8. Object

### Literals

#### Array Literals

In the following example, the length of the array is four, and myList[1] and myList[3] are missing. Only the last comma is ignored.

```js
const myList = ["home", , "school", ,];
```

Note: Trailing commas help keep git diffs clean when you have a multi-line array, because appending an item to the end only adds one line, but does not modify the previous line. But they open places for backdoors!!!

#### Numeric Literals

Note that the language specification requires numeric literals to be unsigned. Nevertheless, code fragments like -123.4 are fine, being interpreted as a unary - operator applied to the numeric literal 123.4.

#### Object Literals

Empty string is a valid object property key name but you can only access to it via bracket notation.

#### String Literals

You can call any of the String object's methods on a string literal value. JavaScript automatically converts the string literal to a temporary String object, calls the method, then discards the temporary String object.

**Tagged Templates** are syntactic sugar of function calls.

```js
print`I need to do:
${todos}
My current progress is: ${progress}
`;
```

## Control flow and error handling

Just about any object can be thrown in JS but it is more effective to use built-in exceptions for that. For example: throw new TypeError('Something');

```js
catch (exception) {
  statements
}
```

The catch block specifies an identifier (exception in the preceding syntax) that holds the value specified by the throw statement. You can use this identifier to get information about the exception that was thrown.

JavaScript creates this identifier when the catch block is entered. The identifier lasts only for the duration of the catch block. Once the catch block finishes executing, the identifier no longer exists.

**If the finally block returns a value, this value becomes the return value of the entire try…catch…finally production, regardless of any return statements in the try and catch blocks**

If you are throwing your own exceptions you can use the Error constructor to get name and message props of the exception.

```js
function doSomethingErrorProne() {
  throw new Error("The message");
}

try {
  doSomethingErrorProne();
} catch (e) {
  console.error(e.name); // 'Error'
  console.error(e.message); // 'The message', or a JavaScript error message
}
```

## Loops and iteration

## Functions

### Defining Functions

Parameters are essentially passed to functions by value — so if the code within the body of a function assigns a completely new value to a parameter that was passed to the function, the change is not reflected globally or in the code which called that function.

When you pass an object as a parameter, if the function changes the object's properties, that change is visible outside the function, as shown in the following example. Same also with arrays.

The scope of a function declaration is the function in which it is declared (or the entire program, if it is declared at the top level).

### Arguments object

Using the arguments object, you can call a function with more arguments than it is formally declared to accept. This is often useful if you don't know in advance how many arguments will be passed to the function. You can use arguments.length to determine the number of arguments actually passed to the function, and then access each argument using the arguments object.

The arguments variable is "array-like", but not an array. It is array-like in that it has a numbered index and a length property. However, it does not possess all of the array-manipulation methods.

### Function parameters

In JavaScript, parameters of functions default to undefined. However, in some situations it might be useful to set a different default value. This is exactly what default parameters do.

### Arrow functions

An arrow function expression (also called a fat arrow to distinguish from a hypothetical -> syntax in future JavaScript) has a shorter syntax compared to function expressions and does not have its own this, arguments, super, or new.target. Arrow functions are always anonymous.

Two factors influenced the introduction of arrow functions: shorter functions and non-binding of this.

## Expressions and operators

Unary plus (+) attempts to convert the operand to a number if it's not already.
Example: +true returns 1.

A bitwise operator treats their operands as a set of 32 bits (zeros and ones).
Bitwise operators perform their operations on such binary representations, but they return standard JavaScript numerical values.

### Unary operators

If the delete operator succeeds, it removes the property from the object. Trying to access it afterwards will yield undefined. The delete operator returns true if the operation is possible; it returns false if the operation is not possible.

## Numbers and Dates

### Numbers

In JavaScript, numbers are implemented in double-precision 64-bit binary format IEEE 754 (i.e., a number between ±2^−1022 and ±2^+1023, or about ±10^−308 to ±10^+308, with a numeric precision of 53 bits). Integer values up to ±2^53 − 1 can be represented exactly.

In addition to being able to represent floating-point numbers, the number type has three symbolic values: +Infinity, -Infinity, and NaN (not-a-number).

You can use four types of number literals: decimal, binary, octal, and hexadecimal.

Decimal literals can start with a zero (0) followed by another decimal digit, but if all digits after the leading 0 are smaller than 8, the number is interpreted as an octal number. This is considered a legacy syntax, and number literals prefixed with 0, whether interpreted as octal or decimal, cause a syntax error in strict mode — so, use the 0o prefix instead.

```js
0888; // 888 parsed as decimal
0777; // parsed as octal, 511 in decimal
```

Strict mode forbids this octal syntax.

### BigInt

```js
const b1 = 123n;
const b2 = BigInt(123);
```

Conceptually, a BigInt is just an arbitrarily long sequence of bits which encodes an integer. You can safely do any arithmetic operations without losing precision or over-/underflowing.

Compared to numbers, BigInt values yield higher precision when representing large integers; however, they cannot represent floating-point numbers. For example, division would round to zero:

```js
const bigintDiv = 5n / 2n; // 2n, because there's no 2.5 in BigInt
```

## Text formatting

JavaScript's String type is used to represent textual data. It is a set of "elements" of 16-bit unsigned integer values (UTF-16 code units).

**Hexadecimal escape sequences:** The number after \x is interpreted as hexadecimal number. `"\xA9" is trademark icon.`

**Unicode escape sequences:** At least four hexadecimal digits following \u. `"\u00A9" is trademark icon`

You should use string literals unless you specifically need to use a String object, because String objects can have counterintuitive behavior.

### Internationalization

The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting. The constructors for Intl.Collator, Intl.NumberFormat, and Intl.DateTimeFormat objects are properties of the Intl object.

## Regular expressions

Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String.

## Indexed collections

Arrays and TypedArrays.

```js
// All the same
const arr1 = new Array(arrayLength);
const arr2 = Array(arrayLength);
const arr3 = [];
arr3.length = arrayLength;
// arrayLength should be a Number otherwise created array has one element which is what passed as arrayLength.
```

Note: If you supply a non-integer value to the array operator in the code above, a property will be created in the object representing the array, instead of an array element.

```js
const arr = [];
arr[3.4] = "Oranges";
console.log(arr.length); // 0
console.log(Object.hasOwn(arr, 3.4)); // true
```

At the implementation level, JavaScript's arrays actually store their elements as standard object properties, using the array index as the property name.

```js
const cats = ["Dusty", "Misty", "Twiggy"];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // [ 'Dusty', 'Misty' ] - Twiggy has been removed

cats.length = 0;
console.log(cats); // []; the cats array is empty

cats.length = 3;
console.log(cats); // [ <3 empty items> ]
```

f you know that none of the elements in your array evaluate to false in a boolean context—if your array consists only of DOM nodes, for example—you can use a more efficient idiom:

```js
const divs = document.getElementsByTagName("div");
for (let i = 0, div; (div = divs[i]); i++) {
  // Process div in some way
}
```

This avoids the overhead of checking the length of the array, and ensures that the div variable is reassigned to the current item each time around the loop for added convenience.

Note that the elements of an array that are omitted when the array is defined are not listed when iterating by forEach, but are listed when undefined has been manually assigned to the element.

### Array transformations

**Grouping the elements of an array**

The Object.groupBy() method can be used to group the elements of an array, using a test function that returns a string indicating the group of the current element.

Here we have a simple inventory array that contains "food" objects that have a name and a type.

```js
const inventory = [
  { name: "asparagus", type: "vegetables" },
  { name: "bananas", type: "fruit" },
  { name: "goat", type: "meat" },
  { name: "cherries", type: "fruit" },
  { name: "fish", type: "meat" },
];
```

To use Object.groupBy(), you supply a callback function that is called with the current element, and optionally the current index and array, and returns a string indicating the group of the element.

The code below uses an arrow function to return the type of each array element (this uses object destructuring syntax for function arguments to unpack the type element from the passed object). The result is an object that has properties named after the unique strings returned by the callback. Each property is assigned an array containing the elements in the group.

```js
const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result);
// Logs
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables' }],
//   fruit: [
//     { name: 'bananas', type: 'fruit' },
//     { name: 'cherries', type: 'fruit' }
//   ],
//   meat: [
//     { name: 'goat', type: 'meat' },
//     { name: 'fish', type: 'meat' }
//   ]
// }
```

Note that the returned object references the same elements as the original array (not deep copies). Changing the internal structure of these elements will be reflected in both the original array and the returned object.

If you can't use a string as the key, for example, if the information to group is associated with an object that might change, then you can instead use Map.groupBy(). This is very similar to Object.groupBy() except that it groups the elements of the array into a Map that can use an arbitrary value (object or primitive) as a key.

### Working with array-like objects

Some JavaScript objects, such as the NodeList returned by document.getElementsByTagName() or the arguments object made available within the body of a function, look and behave like arrays on the surface but do not share all of their methods. The arguments object provides a length attribute but does not implement array methods like forEach().

Array methods cannot be called directly on array-like objects.

```js
function printArguments() {
  arguments.forEach((item) => {
    console.log(item);
  }); // TypeError: arguments.forEach is not a function
}
```

But you can call them indirectly using Function.prototype.call().

```js
function printArguments() {
  Array.prototype.forEach.call(arguments, (item) => {
    console.log(item);
  });
}
```

Array prototype methods can be used on strings as well, since they provide sequential access to their characters in a similar way to arrays:

```js
Array.prototype.forEach.call("a string", (chr) => {
  console.log(chr);
});
```

## Keyed collections

### Maps

```js
const sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");
sayings.size; // 3
sayings.get("dog"); // woof
sayings.get("fox"); // undefined
sayings.has("bird"); // false
sayings.delete("dog");
sayings.has("dog"); // false

for (const [key, value] of sayings) {
  console.log(`${key} goes ${value}`);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();
sayings.size; // 0
```

**Object and Map compared**

Traditionally, objects have been used to map strings to values. Objects allow you to set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. Map objects, however, have a few more advantages that make them better maps.

- The keys of an Object are strings or symbols, whereas they can be of any value for a Map.
- You can get the size of a Map easily, while you have to manually keep track of size for an Object.
- The iteration of maps is in insertion order of the elements.
- An Object has a prototype, so there are default keys in the map. (This can be bypassed using map = Object.create(null).)

These three tips can help you to decide whether to use a Map or an Object:

- Use maps over objects when keys are unknown until run time, and when all keys are the same type and all values are the same type.
- Use maps if there is a need to store primitive values as keys because object treats each key as a string whether it's a number value, boolean value or any other primitive value.
- Use objects when there is logic that operates on individual elements.

**WeakMap**
WeakMap is like Map but it is not enumerable and if it's keys are not referenced anywhere it will be garbage collected. There is no method to obtain a list of the keys in a WeakMap.

```js
const privates = new WeakMap();

function Public() {
  const me = {
    // Private data goes here
  };
  privates.set(this, me);
}

Public.prototype.method = function () {
  const me = privates.get(this);
  // Do stuff with private data in `me`
  // …
};

module.exports = Public;
```

### Sets

Set objects are collections of unique values. You can iterate its elements in insertion order. A value in a Set may only occur once; it is unique in the Set's collection.

```js
const mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2

for (const item of mySet) {
  console.log(item);
}
// 1
// "some text"
```

Array and Set compared

Traditionally, a set of elements has been stored in arrays in JavaScript in a lot of situations. The Set object, however, has some advantages:

- Deleting Array elements by value (arr.splice(arr.indexOf(val), 1)) is very slow.
- Set objects let you delete elements by their value. With an array, you would have to splice based on an element's index.
- The value NaN cannot be found with indexOf in an array.
- Set objects store unique values. You don't have to manually keep track of duplicates.

**WeakSet object**

WeakSet objects are collections of garbage-collectable values, including objects and non-registered symbols. A value in the WeakSet may only occur once. It is unique in the WeakSet's collection.

The main differences to the Set object are:

- In contrast to Sets, WeakSets are collections of objects or symbols only, and not of arbitrary values of any type.
- The WeakSet is weak: References to objects in the collection are held weakly. If there is no other reference to an object stored in the WeakSet, they can be garbage collected. That also means that there is no list of current objects stored in the collection.
- WeakSets are not enumerable.

The use cases of WeakSet objects are limited. They will not leak memory, so it can be safe to use DOM elements as a key and mark them for tracking purposes, for example.

## Working with objects

Array indices are, in fact, properties with string keys that contain integers.

## Using classes

Unlike function declarations, class declarations are not hoisted (or, in some interpretations, hoisted but with the temporal dead zone restriction), which means you cannot use a class before it is declared.

The this value will be automatically returned as the result of new. You are advised to not return any value from the constructor — because if you return a non-primitive value, it will become the value of the new expression, and the value of this is dropped. (You can read more about what new does in its description.)

A private field is an identifier prefixed with # (the hash symbol). The hash is an integral part of the field's name, which means a private property can never have name clash with a public property. In order to refer to a private field anywhere in the class, you must declare it in the class body (you can't create a private property on the fly). Apart from this, a private field is pretty much equivalent to a normal property.

Accessing private fields outside the class is an early syntax error. The language can guard against this because #privateField is a special syntax, so it can do some static analysis and find all usage of private fields before even evaluating the code.

Static keyword

With the Date example, we have also encountered the Date.now() method, which returns the current date. This method does not belong to any date instance — it belongs to the class itself. However, it's put on the Date class instead of being exposed as a global DateNow() function, because it's mostly useful when dealing with date instances.

```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  static hello() {
    // static method
    return "Hello!!";
  }
}

mycar = new Car("Ford");

//Call 'hello()' on the class Car:
document.getElementById("demo").innerHTML = Car.hello();

//and NOT on the 'mycar' object:
//document.getElementById("demo").innerHTML = mycar.hello();
//this would raise an error.
```

There is also a special construct called a static initialization block, which is a block of code that runs when the class is first loaded.

```js
class MyClass {
  static {
    MyClass.myStaticProperty = "foo";
  }
}
console.log(MyClass.myStaticProperty); // 'foo'
```

Static initialization blocks are almost equivalent to immediately executing some code after a class has been declared. The only difference is that they have access to static private properties.

When you use extends, the static methods inherit from each other as well, so you can also override or enhance them.

## Using promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

### Chaining

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

doSomethingElse and doThirdThing can return any value — if they return promises, that promise is first waited until it settles, and the next callback receives the fulfillment value, not the promise itself. .It is important to always return promises from then callbacks, even if the promise always resolves to undefined. If the previous handler started a promise but did not return it, there's no way to track its settlement anymore, and the promise is said to be "floating".

```js
doSomething()
  .then((url) => {
    // Missing `return` keyword in front of fetch(url).
    fetch(url);
  })
  .then((result) => {
    // result is undefined, because nothing is returned from the previous
    // handler. There's no way to know the return value of the fetch()
    // call anymore, or whether it succeeded at all.
  });
```

Therefore, as a rule of thumb, whenever your operation encounters a promise, return it and defer its handling to the next then handler.

Note: async/await has the same concurrency semantics as normal promise chains. await within one async function does not stop the entire program, only the parts that depend on its value, so other async jobs can still run while the await is pending.

**Chain after a catch**
It's possible to chain after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain. Read the following example:

```js
doSomething()
  .then(() => {
    throw new Error("Something failed");

    console.log("Do this");
  })
  .catch(() => {
    console.error("Do that");
  })
  .then(() => {
    console.log("Do this, no matter what happened before");
  });

// Do that
// Do this, no matter what happened before
```

### Error Handling

**Promise rejection events**
If a promise rejection event is not handled by any handler, it bubbles to the top of the call stack, and the host needs to surface it. On the web, whenever a promise is rejected, one of two events is sent to the global scope (generally, this is either the window or, if being used in a web worker, it's the Worker or other worker-based interface). The two events are:

unhandledrejection

    Sent when a promise is rejected but there is no rejection handler available.

rejectionhandled

    Sent when a handler is attached to a rejected promise that has already caused an unhandledrejection event.

In both cases, the event (of type PromiseRejectionEvent) has as members a promise property indicating the promise that was rejected, and a reason property that provides the reason given for the promise to be rejected.

These make it possible to offer fallback error handling for promises, as well as to help debug issues with your promise management. These handlers are global per context, so all errors will go to the same event handlers, regardless of source.

In Node.js, handling promise rejection is slightly different. You capture unhandled rejections by adding a handler for the Node.js unhandledRejection event (notice the difference in capitalization of the name), like this:
js

process.on("unhandledRejection", (reason, promise) => {
// Add code here to examine the "promise" and "reason" values
});

For Node.js, to prevent the error from being logged to the console (the default action that would otherwise occur), adding that process.on() listener is all that's necessary; there's no need for an equivalent of the browser runtime's preventDefault() method.

However, if you add that process.on listener but don't also have code within it to handle rejected promises, they will just be dropped on the floor and silently ignored. So ideally, you should add code within that listener to examine each rejected promise and make sure it was not caused by an actual code bug.

### Composition

Promise.all(), Promise.allSettled(), Promise.any(), Promise.race().

These methods all run promises concurrently — a sequence of promises are started simultaneously and do not wait for each other. Sequential composition is possible using some clever JavaScript:

```js
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result3) => {
    /* use result3 */
  });

// also possible to make compose function which is common in FP
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```

However, before you compose promises sequentially, consider if it's really necessary — it's always better to run promises concurrently so that they don't unnecessarily block each other unless one promise's execution depends on another's result.

### Cancellation

Promise itself has no first-class protocol for cancellation, but you may be able to directly cancel the underlying asynchronous operation, typically using AbortController.

### Creating a Promise around an old callback API

A Promise can be created from scratch using its constructor. This should be needed only to wrap old APIs.

In an ideal world, all asynchronous functions would already return promises. Unfortunately, some APIs still expect success and/or failure callbacks to be passed in the old way. The most obvious example is the setTimeout() function:

```js
setTimeout(() => saySomething("10 seconds passed"), 10 \* 1000);
```

Mixing old-style callbacks and promises is problematic. If saySomething() fails or contains a programming error, nothing catches it. This is intrinsic to the design of setTimeout.

Luckily we can wrap setTimeout in a promise. The best practice is to wrap the callback-accepting functions at the lowest possible level, and then never call them directly again:

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10 \* 1000)
.then(() => saySomething("10 seconds"))
.catch(failureCallback);
```

The promise constructor takes an executor function that lets us resolve or reject a promise manually. Since setTimeout() doesn't really fail, we left out reject in this case.

### Timing

Callbacks added with then() will never be invoked before the completion of the current run of the JavaScript event loop.

## JavaScript types arrays

## Iterators and generators

## Meta programming

## JavaScript modules

# INTERMEDIATE

## Client-side JS Frameworks

## Client-side web APIs

## Language overview

## JS Data Structures

## Equality comparisons and sameness

## Enumerability and ownership of properties

## Closures

# ADVANCED

## Inheritance and the prototype chain

## Memory Management

## Concurrency model and Event Loop
