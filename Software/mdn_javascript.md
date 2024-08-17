JavaScript is an

- interpreted (or JIT compiled)
- prototype-based (like smalltalk and self but more popular. with lua)
- single threaded
  language with first-class functions.

As soon as a browser implements a feature MDN tries to document it.

JAVASCRPIT

1. TUTORIALS

- Complete beginners
- JavaScript Guide
- Intermediate
- Advanced

2. REFERENCES

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

You can use most Unicode letters such as å and ü in identifiers. You can also use Unicode escape sequences to represent characters in identifiers.

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

Arguments are always passed by value and never passed by reference. This means that if a function reassigns a parameter, the value won't change outside the function. More precisely, object arguments are passed by sharing, which means if the object's properties are mutated, the change will impact the outside of the function.

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

JavaScript typed arrays are array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers.

Each entry in a JavaScript typed array is a raw binary value in one of a number of supported formats, from 8-bit integers to 64-bit floating-point numbers.

Typed array objects share many of the same methods as arrays with similar semantics. However, typed arrays are not to be confused with normal arrays, as calling Array.isArray() on a typed array returns false. Moreover, not all methods available for normal arrays are supported by typed arrays (e.g. push and pop).

To achieve maximum flexibility and efficiency, JavaScript typed arrays split the implementation into buffers and views. A buffer is an object representing a chunk of data; it has no format to speak of, and offers no mechanism for accessing its contents. In order to access the memory contained in a buffer, you need to use a view. A view provides a context — that is, a data type, starting offset, and number of elements.

### Buffers

There are two types of buffers: **ArrayBuffer** and **SharedArrayBuffer**. Both are low-level representations of a memory span. They have "array" in their names, but they don't have much to do with arrays — you cannot read or write to them directly. Instead, buffers are generic objects that just contain raw data. In order to access the memory represented by a buffer, you need to use a view.

Buffers support the following actions:

    Allocate: As soon as a new buffer is created, a new memory span is allocated and initialized to 0.
    Copy: Using the slice() method, you can efficiently copy a portion of the memory without creating views to manually copy each byte.
    Transfer: Using the transfer() and transferToFixedLength() methods, you can transfer ownership of the memory span to a new buffer object. This is useful when transferring data between different execution contexts without copying. After the transfer, the original buffer is no longer usable. A SharedArrayBuffer cannot be transferred (as the buffer is already shared by all execution contexts).
    Resize: Using the resize() method, you can resize the memory span (either claim more memory space, as long as it doesn't pass the pre-set maxByteLength limit, or release some memory space). SharedArrayBuffer can only be grown but not shrunk.

The difference between ArrayBuffer and SharedArrayBuffer is that the former is always owned by a single execution context at a time. If you pass an ArrayBuffer to a different execution context, it is transferred and the original ArrayBuffer becomes unusable. This ensures that only one execution context can access the memory at a time. A SharedArrayBuffer is not transferred when passed to a different execution context, so it can be accessed by multiple execution contexts at the same time. This may introduce race conditions when multiple threads access the same memory span, so operations such as Atomics methods become useful.

### Views

There are currently two main kinds of views: typed array views and **DataView**. Typed arrays provide utility methods that allow you to conveniently transform binary data. DataView is more low-level and allows granular control of how data is accessed. The ways to read and write data using the two views are very different.

Both kinds of views cause ArrayBuffer.isView() to return true. They both have the following properties:

buffer: The underlying buffer that the view references.

byteOffset

    The offset, in bytes, of the view from the start of its buffer.

byteLength

    The length, in bytes, of the view.

Both constructors accept the above three as separate arguments, although typed array constructors accept length as the number of elements rather than the number of bytes.

#### Types array views

Typed array views have self-descriptive names and provide views for all the usual numeric types like Int8, Uint32, Float64 and so forth. There is one special typed array view, Uint8ClampedArray, which clamps the values between 0 and 255. This is useful for Canvas data processing, for example.

| Type              | Value Range               | Size in bytes | Web IDL type        |
| ----------------- | ------------------------- | ------------- | ------------------- |
| Int8Array         | -128 to 127               | 1             | byte                |
| Uint8Array        | 0 to 255                  | 1             | octet               |
| Uint8ClampedArray | 0 to 255                  | 1             | octet               |
| Int16Array        | -32768 to 32767           | 2             | short               |
| Uint16Array       | 0 to 65535                | 2             | unsigned short      |
| Int32Array        | -2147483648 to 2147483647 | 4             | long                |
| Uint32Array       | 0 to 4294967295           | 4             | unsigned long       |
| Float16Array      | -65504 to 65504           | 2             | N/A                 |
| Float32Array      | -3.4e38 to 3.4e38         | 4             | unrestricted float  |
| Float64Array      | -1.8e308 to 1.8e308       | 8             | unrestricted double |
| BigInt64Array     | -2^63 to 2^63 - 1         | 8             | bigint              |
| BigUint64Array    | 0 to 2^64 - 1             | 8             | bigint              |

Typed arrays are, in principle, fixed-length, so array methods that may change the length of an array are not available. This includes pop, push, shift, splice, and unshift.

On the other hand, TypedArray has the extra set and subarray methods that optimize working with multiple typed arrays that view the same buffer. The set() method allows setting multiple typed array indices at once, using data from another array or typed array. If the two typed arrays share the same underlying buffer, the operation may be more efficient as it's a fast memory move. The subarray() method creates a new typed array view that references the same buffer as the original typed array, but with a narrower span.

There's no way to directly change the length of a typed array without changing the underlying buffer. However, when the typed array views a resizable buffer and does not have a fixed byteLength, it is length-tracking, and will automatically resize to fit the underlying buffer as the resizable buffer is resized.

The corresponding bytes in the underlying buffer are retrieved and interpreted as a number. Any property access using a number (or the string representation of a number, since numbers are always converted to strings when accessing properties) will be proxied by the typed array — they never interact with the object itself. This means, for example:

    Out-of-bounds index access always returns undefined, without actually accessing the property on the object.
    Any attempt to write to such an out-of-bounds property has no effect: it does not throw an error but doesn't change the buffer or typed array either.
    Typed array indices appear to be configurable and writable, but any attempt to change their attributes will fail.

```js
const uint8 = new Uint8Array([1, 2, 3]);
console.log(uint8[0]); // 1

// For illustrative purposes only. Not for production code.
uint8[-1] = 0;
uint8[2.5] = 0;
uint8[NaN] = 0;
console.log(Object.keys(uint8)); // ["0", "1", "2"]
console.log(uint8[NaN]); // undefined

// Non-numeric access still works
uint8[true] = 0;
console.log(uint8[true]); // 0

Object.freeze(uint8); // TypeError: Cannot freeze array buffer views with elements
```

#### DataView

The DataView is a low-level interface that provides a getter/setter API to read and write arbitrary data to the buffer. This is useful when dealing with different types of data, for example. Typed array views are in the native byte-order (see Endianness) of your platform. With a DataView, the byte-order can be controlled. By default, it's big-endian—the bytes are ordered from most significant to least significant. This can be reversed, with the bytes ordered from least significant to most significant (little-endian), using getter/setter methods.

DataView does not require alignment; multi-byte read and write can be started at any specified offset. The setter methods work the same way.

The following example uses a DataView to get the binary representation of any number:

```js
function toBinary(
  x,
  { type = "Float64", littleEndian = false, separator = " ", radix = 16 } = {}
) {
  const bytesNeeded = globalThis[`${type}Array`].BYTES_PER_ELEMENT;
  const dv = new DataView(new ArrayBuffer(bytesNeeded));
  dv[`set${type}`](0, x, littleEndian);
  const bytes = Array.from({ length: bytesNeeded }, (_, i) =>
    dv
      .getUint8(i)
      .toString(radix)
      .padStart(8 / Math.log2(radix), "0")
  );
  return bytes.join(separator);
}

console.log(toBinary(1.1)); // 3f f1 99 99 99 99 99 9a
console.log(toBinary(1.1, { littleEndian: true })); // 9a 99 99 99 99 99 f1 3f
console.log(toBinary(20, { type: "Int8", radix: 2 })); // 00010100
```

#### Web APIs using typed arrays

These are some examples of APIs that make use of typed arrays; there are others, and more are being added all the time.

FileReader.prototype.readAsArrayBuffer()

    The FileReader.prototype.readAsArrayBuffer() method starts reading the contents of the specified Blob or File.

fetch()

    The body option to fetch() can be a typed array or ArrayBuffer, enabling you to send these objects as the payload of a POST request.

ImageData.data

    Is a Uint8ClampedArray representing a one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 inclusive.

##### Difference between Blob and File in JavaScript

**Blob**

- **Definition:** A `Blob` (Binary Large Object) represents raw binary data.
- **Creation:** You can create a `Blob` using the `Blob` constructor or the `Blob()` factory function.
- **Usage:** Typically used to handle binary data that may not necessarily have a file-like structure or metadata associated with it.
- **Properties:**
  - **`size`**: Represents the size of the data in bytes.
  - **`type`**: Represents the MIME type of the data (e.g., `"image/jpeg"`).
- **Example:**
  ```javascript
  const blob = new Blob(["Hello, world!"], { type: "text/plain" });
  ```

**File**

- **Definition:** A `File` is a specific type of `Blob` that represents a file-like object with metadata such as name and last modified date.
- **Creation:** Typically created as a result of user interaction, like selecting files in an `<input type="file">` element.
- **Usage:** Used when dealing with files, where you need access to properties like filename, file size, and last modified date.
- **Properties (in addition to Blob properties):**
  - **`name`**: The name of the file.
  - **`lastModified`**: The timestamp (in milliseconds since the Unix epoch) when the file was last modified.
- **Example:**
  ```javascript
  const file = new File(["Hello, world!"], "hello.txt", {
    type: "text/plain",
    lastModified: Date.now(),
  });
  ```

**Key Differences**:

- **Metadata:** `File` includes additional metadata like filename and last modified date, which `Blob` does not inherently have.
- **Source:** `Blob` can represent any kind of binary data, whereas `File` specifically represents files and is usually created from user input or drag-and-drop operations.
- **Use Cases:** Use `Blob` for generic binary data handling, and use `File` when dealing with files and when you need access to file metadata.

**Common Use Cases**:

- **Blob:** Storing binary data, working with media streams, or handling large amounts of binary data where file metadata is not required.
- **File:** Uploading files via AJAX, manipulating files selected by the user, or working with APIs that expect file objects.

Understanding these differences helps in choosing the appropriate object (`Blob` or `File`) depending on whether you need file metadata or simply want to handle raw binary data.

## Iterators and generators

### Iterators

In JavaScript an iterator is an object which defines a sequence and potentially a return value upon its termination.
Specifically, an iterator is any object which implements the Iterator protocol by having a next() method that returns an object with two properties:

value

    The next value in the iteration sequence.

done

    This is true if the last value in the sequence has already been consumed. If value is present alongside done, it is the iterator's return value.

### Generator functions

While custom iterators are a useful tool, their creation requires careful programming due to the need to explicitly maintain their internal state. Generator functions provide a powerful alternative: they allow you to define an iterative algorithm by writing a single function whose execution is not continuous. Generator functions are written using the function\* syntax.

While custom iterators are a useful tool, their creation requires careful programming due to the need to explicitly maintain their internal state. Generator functions provide a powerful alternative: they allow you to define an iterative algorithm by writing a single function whose execution is not continuous. Generator functions are written using the function\* syntax.

When called, generator functions do not initially execute their code. Instead, they return a special type of iterator, called a Generator. When a value is consumed by calling the generator's next method, the Generator function executes until it encounters the yield keyword.

The function can be called as many times as desired, and returns a new Generator each time. Each Generator may only be iterated once.

We can now adapt the example from above. The behavior of this code is identical, but the implementation is much easier to write and read.
js

function\* makeRangeIterator(start = 0, end = Infinity, step = 1) {
let iterationCount = 0;
for (let i = start; i < end; i += step) {
iterationCount++;
yield i;
}
return iterationCount;
}

### Iterables

An object is iterable if it defines its iteration behavior, such as what values are looped over in a for...of construct. Some built-in types, such as Array or Map, have a default iteration behavior, while other types (such as Object) do not.

In order to be iterable, an object must implement the @@iterator method. This means that the object (or one of the objects up its prototype chain) must have a property with a Symbol.iterator key.

It may be possible to iterate over an iterable more than once, or only once. It is up to the programmer to know which is the case.

Iterables which can iterate only once (such as Generators) customarily return this from their @@iterator method, whereas iterables which can be iterated many times must return a new iterator on each invocation of @@iterator.

String, Array, TypedArray, Map and Set are all built-in iterables, because their prototype objects all have a Symbol.iterator method.

## Meta programming

The Proxy and Reflect objects allow you to intercept and define custom behavior for fundamental language operations (e.g. property lookup, assignment, enumeration, function invocation, etc.). With the help of these two objects you are able to program at the meta level of JavaScript.

### Proxies

Proxy objects allow you to intercept certain operations and to implement custom behaviors.

For example, getting a property on an object:
js

const handler = {
get(target, name) {
return name in target ? target[name] : 42;
},
};

const p = new Proxy({}, handler);
p.a = 1;
console.log(p.a, p.b); // 1, 42

The Proxy object defines a target (an empty object here) and a handler object, in which a get trap is implemented. Here, an object that is proxied will not return undefined when getting undefined properties, but will instead return the number 42.

Additional examples are available on the Proxy reference page.

### Handlers and traps

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming#handlers_and_traps

### Revocable Proxy

The Proxy.revocable() method is used to create a revocable Proxy object. This means that the proxy can be revoked via the function revoke and switches the proxy off.

### Reflection

Reflect is a built-in object that provides methods for interceptable JavaScript operations. The methods are the same as those of the proxy handler's.

Reflect is not a function object.

Reflect helps with forwarding default operations from the handler to the target.

With Reflect.has() for example, you get the in operator as a function:
js

Reflect.has(Object, "assign"); // true

## JavaScript modules

However, we decided to keep using .js, at least for the moment. To get modules to work correctly in a browser, you need to make sure that your server is serving them with a Content-Type header that contains a JavaScript MIME type such as text/javascript. If you don't, you'll get a strict MIME type checking error along the lines of "The server responded with a non-JavaScript MIME type" and the browser won't run your JavaScript. Most servers already set the correct type for .js files, but not yet for .mjs files. Servers that already serve .mjs files correctly include GitHub Pages and http-server for Node.js.

Note: In some module systems, you can use a module specifier like modules/square that isn't a relative or absolute path, and that doesn't have a file extension. This kind of specifier can be used in a browser environment if you first define an import map.

```html
<script type="importmap">
  {
    "imports": {
      "shapes": "./shapes/square.js",
      "shapes/square": "./modules/shapes/square.js",
      "https://example.com/shapes/square.js": "./shapes/square.js",
      "https://example.com/shapes/": "/shapes/square/",
      "../shapes/square": "./shapes/square.js"
    }
  }
</script>
```

Note: The imported values are read-only views of the features that were exported. Similar to const variables, you cannot re-assign the variable that was imported, but you can still modify properties of object values. The value can only be re-assigned by the module exporting it. See the import reference for an example.

Import maps allow modules to be imported using bare module names (as in Node.js), and can also simulate importing modules from packages, both with and without file extensions. While not shown above, they also allow particular versions of a library to be imported, based on the path of the script that is importing the module. Generally they let developers write more ergonomic import code, and make it easier to manage the different versions and dependencies of modules used by a site. This can reduce the effort required to use the same JavaScript libraries in both browser and server.

In some JavaScript environments, such as Node.js, you can use bare names for the module specifier. This works because the environment can resolve module names to a standard location in the file system. For example, you might use the following syntax to import the "square" module.

<script type="module">
  // some code
</script>

or

<script type="module" src="main.js"></script>

You can only use import and export statements inside modules, not regular scripts. An error will be thrown if your <script> element doesn't have the type="module" attribute and attempts to import other modules. For example:

```html
<script>
  import _ from "lodash"; // SyntaxError: import declarations may only appear at top level of a module
  // ...
</script>
<script src="a-module-using-import-statements.js"></script>
<!-- SyntaxError: import declarations may only appear at top level of a module -->
```

You should generally define all your modules in separate files. Modules declared inline in HTML can only import other modules, but anything they export will not be accessible by other modules (because they don't have a URL).

Note: Modules and their dependencies can be preloaded by specifying them in **link** elements with rel="modulepreloaded". This can significantly reduce load time when the modules are used.

There is no need to use the defer attribute when loading a module script; modules are deferred automatically.

Last but not least, let's make this clear — module features are imported into the scope of a single script — they aren't available in the global scope. Therefore, you will only be able to access imported features in the script they are imported into, and you won't be able to access them from the JavaScript console, for example. You'll still get syntax errors shown in the DevTools, but you'll not be able to use some of the debugging techniques you might have expected to use.

**Import declarations are hoisted**

# INTERMEDIATE

## Client-side JS Frameworks

React, Vue, Angular, Ember, Svelte tutorials

## Client-side web APIs

Simple examples of DOM, Fetch, Third Party, Graphics, HTMLMediaElement and Client-side Storage APIS

### Client-Side Storage APIs

- **Cookies**: Old-school
- **Web Storage**: New School (localStorage and sessionStorage)
- **IndexedDB**: is a complete database system available in the browser in which you can store complex related data, the types of which aren't limited to simple values like strings or numbers. You can store videos, images, and pretty much anything else in an IndexedDB instance.
- **Cache API**: Commonly used with service workers to save assets.

## Language overview

Summarize of basics

## JS Data Structures

Null type

The Null type is inhabited by exactly one value: null.
Undefined type

The Undefined type is inhabited by exactly one value: undefined.

Conceptually, undefined indicates the absence of a value, while null indicates the absence of an object (which could also make up an excuse for typeof null === "object"). The language usually defaults to undefined when something is devoid of a value:

    A return statement with no value (return;) implicitly returns undefined.
    Accessing a nonexistent object property (obj.iDontExist) returns undefined.
    A variable declaration without initialization (let x;) implicitly initializes the variable to undefined.
    Many methods, such as Array.prototype.find() and Map.prototype.get(), return undefined when no element is found.

null is used much less often in the core language. The most important place is the end of the prototype chain — subsequently, methods that interact with prototypes, such as Object.getPrototypeOf(), Object.create(), etc., accept or return null instead of undefined.

null is a keyword, but undefined is a normal identifier that happens to be a global property. In practice, the difference is minor, since undefined should not be redefined or shadowed.
NaN ("Not a Number") is a special kind of number value that's typically encountered when the result of an arithmetic operation cannot be expressed as a number. It is also the only value in JavaScript that is not equal to itself.

Symbol type

A Symbol is a unique and immutable primitive value and may be used as the key of an Object property (see below). In some programming languages, Symbols are called "atoms". The purpose of symbols is to create unique property keys that are guaranteed not to clash with keys from other code.

Objects

In computer science, an object is a value in memory which is possibly referenced by an identifier. In JavaScript, objects are the only mutable values. Functions are, in fact, also objects with the additional capability of being callable.

There are two types of object properties: The data property and the accessor property.

Data property

Data properties associate a key with a value. It can be described by the following attributes:

value

    The value retrieved by a get access of the property. Can be any JavaScript value.

writable

    A boolean value indicating if the property can be changed with an assignment.

enumerable

    A boolean value indicating if the property can be enumerated by a for...in loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.

configurable

    A boolean value indicating if the property can be deleted, can be changed to an accessor property, and can have its attributes changed.

Accessor property

Associates a key with one of two accessor functions (get and set) to retrieve or store a value.

Note: It's important to recognize it's accessor property — not accessor method. We can give a JavaScript object class-like accessors by using a function as a value — but that doesn't make the object a class.

An accessor property has the following attributes:

get

    A function called with an empty argument list to retrieve the property value whenever a get access to the value is performed. See also getters. May be undefined.

set

    A function called with an argument that contains the assigned value. Executed whenever a specified property is attempted to be changed. See also setters. May be undefined.

enumerable

    A boolean value indicating if the property can be enumerated by a for...in loop. See also Enumerability and ownership of properties for how enumerability interacts with other functions and syntaxes.

configurable

    A boolean value indicating if the property can be deleted, can be changed to a data property, and can have its attributes changed.

The prototype of an object points to another object or to null — it's conceptually a hidden property of the object, commonly represented as [[Prototype]]. Properties of the object's [[Prototype]] can also be accessed on the object itself.

Objects are ad-hoc key-value pairs, so they are often used as maps. However, there can be ergonomics, security, and performance issues. Use a Map for storing arbitrary data instead. The Map reference contains a more detailed discussion of the pros & cons between plain objects and maps for storing key-value associations.

Type coercion

As mentioned above, JavaScript is a weakly typed language. This means that you can often use a value of one type where another type is expected, and the language will convert it to the right type for you. To do so, JavaScript defines a handful of coercion rules.
Primitive coercion

The primitive coercion process is used where a primitive value is expected, but there's no strong preference for what the actual type should be. This is usually when a string, a number, or a BigInt are equally acceptable. For example:

    The Date() constructor, when it receives one argument that's not a Date instance — strings represent date strings, while numbers represent timestamps.
    The + operator — if one operand is a string, string concatenation is performed; otherwise, numeric addition is performed.
    The == operator — if one operand is a primitive while the other is an object, the object is converted to a primitive value with no preferred type.

This operation does not do any conversion if the value is already a primitive. Objects are converted to primitives by calling its [@@toPrimitive]() (with "default" as hint), valueOf(), and toString() methods, in that order. Note that primitive conversion calls valueOf() before toString(), which is similar to the behavior of number coercion but different from string coercion.

The [@@toPrimitive]() method, if present, must return a primitive — returning an object results in a TypeError. For valueOf() and toString(), if one returns an object, the return value is ignored and the other's return value is used instead; if neither is present, or neither returns a primitive, a TypeError is thrown. For example, in the following code:
js

console.log({} + []); // "[object Object]"

Neither {} nor [] have a [@@toPrimitive]() method. Both {} and [] inherit valueOf() from Object.prototype.valueOf, which returns the object itself. Since the return value is an object, it is ignored. Therefore, toString() is called instead. {}.toString() returns "[object Object]", while [].toString() returns "", so the result is their concatenation: "[object Object]".

The [@@toPrimitive]() method always takes precedence when doing conversion to any primitive type. Primitive conversion generally behaves like number conversion, because valueOf() is called in priority; however, objects with custom [@@toPrimitive]() methods can choose to return any primitive. Date and Symbol objects are the only built-in objects that override the [@@toPrimitive]() method. Date.prototype[@@toPrimitive]() treats the "default" hint as if it's "string", while Symbol.prototype[@@toPrimitive]() ignores the hint and always returns a symbol.
Numeric coercion

There are two numeric types: Number and BigInt. Sometimes the language specifically expects a number or a BigInt (such as Array.prototype.slice(), where the index must be a number); other times, it may tolerate either and perform different operations depending on the operand's type. For strict coercion processes that do not allow implicit conversion from the other type, see number coercion and BigInt coercion.

Numeric coercion is nearly the same as number coercion, except that BigInts are returned as-is instead of causing a TypeError. Numeric coercion is used by all arithmetic operators, since they are overloaded for both numbers and BigInts. The only exception is unary plus, which always does number coercion.
Other coercions

All data types, except Null, Undefined, and Symbol, have their respective coercion process. See string coercion, boolean coercion, and object coercion for more details.

As you may have noticed, there are three distinct paths through which objects may be converted to primitives:

    Primitive coercion: [@@toPrimitive]("default") → valueOf() → toString()
    Numeric coercion, number coercion, BigInt coercion: [@@toPrimitive]("number") → valueOf() → toString()
    String coercion: [@@toPrimitive]("string") → toString() → valueOf()

In all cases, [@@toPrimitive](), if present, must be callable and return a primitive, while valueOf or toString will be ignored if they are not callable or return an object. At the end of the process, if successful, the result is guaranteed to be a primitive. The resulting primitive is then subject to further coercions depending on the context.

## Equality comparisons and sameness

JavaScript provides three different value-comparison operations:

    === — strict equality (triple equals)
    == — loose equality (double equals)
    Object.is()

Which operation you choose depends on what sort of comparison you are looking to perform. Briefly:

    Double equals (==) will perform a type conversion when comparing two things, and will handle NaN, -0, and +0 specially to conform to IEEE 754 (so NaN != NaN, and -0 == +0);
    Triple equals (===) will do the same comparison as double equals (including the special handling for NaN, -0, and +0) but without type conversion; if the types differ, false is returned.
    Object.is() does no type conversion and no special handling for NaN, -0, and +0 (giving it the same behavior as === except on those special numeric values).

They correspond to three of four equality algorithms in JavaScript:

    IsLooselyEqual: ==
    IsStrictlyEqual: ===
    SameValue: Object.is()
    SameValueZero: used by many built-in operations

Note that the distinction between these all have to do with their handling of primitives; none of them compares whether the parameters are conceptually similar in structure. For any non-primitive objects x and y which have the same structure but are distinct objects themselves, all of the above forms will evaluate to false.
Strict equality using ===

Strict equality compares two values for equality. Neither value is implicitly converted to some other value before being compared. If the values have different types, the values are considered unequal. If the values have the same type, are not numbers, and have the same value, they're considered equal. Finally, if both values are numbers, they're considered equal if they're both not NaN and are the same value, or if one is +0 and one is -0.
js

const num = 0;
const obj = new String("0");
const str = "0";

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num === obj); // false
console.log(num === str); // false
console.log(obj === str); // false
console.log(null === undefined); // false
console.log(obj === null); // false
console.log(obj === undefined); // false

Strict equality is almost always the correct comparison operation to use. For all values except numbers, it uses the obvious semantics: a value is only equal to itself. For numbers it uses slightly different semantics to gloss over two different edge cases. The first is that floating point zero is either positively or negatively signed. This is useful in representing certain mathematical solutions, but as most situations don't care about the difference between +0 and -0, strict equality treats them as the same value. The second is that floating point includes the concept of a not-a-number value, NaN, to represent the solution to certain ill-defined mathematical problems: negative infinity added to positive infinity, for example. Strict equality treats NaN as unequal to every other value — including itself. (The only case in which (x !== x) is true is when x is NaN.)

Besides ===, strict equality is also used by array index-finding methods including Array.prototype.indexOf(), Array.prototype.lastIndexOf(), TypedArray.prototype.indexOf(), TypedArray.prototype.lastIndexOf(), and case-matching. This means you cannot use indexOf(NaN) to find the index of a NaN value in an array, or use NaN as a case value in a switch statement and make it match anything.
js

console.log([NaN].indexOf(NaN)); // -1
switch (NaN) {
case NaN:
console.log("Surprise"); // Nothing is logged
}

Loose equality using ==

Loose equality is symmetric: A == B always has identical semantics to B == A for any values of A and B (except for the order of applied conversions). The behavior for performing loose equality using == is as follows:

    If the operands have the same type, they are compared as follows:
        Object: return true only if both operands reference the same object.
        String: return true only if both operands have the same characters in the same order.
        Number: return true only if both operands have the same value. +0 and -0 are treated as the same value. If either operand is NaN, return false; so NaN is never equal to NaN.
        Boolean: return true only if operands are both true or both false.
        BigInt: return true only if both operands have the same value.
        Symbol: return true only if both operands reference the same symbol.
    If one of the operands is null or undefined, the other must also be null or undefined to return true. Otherwise return false.
    If one of the operands is an object and the other is a primitive, convert the object to a primitive.
    At this step, both operands are converted to primitives (one of String, Number, Boolean, Symbol, and BigInt). The rest of the conversion is done case-by-case.
        If they are of the same type, compare them using step 1.
        If one of the operands is a Symbol but the other is not, return false.
        If one of the operands is a Boolean but the other is not, convert the boolean to a number: true is converted to 1, and false is converted to 0. Then compare the two operands loosely again.
        Number to String: convert the string to a number. Conversion failure results in NaN, which will guarantee the equality to be false.
        Number to BigInt: compare by their numeric value. If the number is ±Infinity or NaN, return false.
        String to BigInt: convert the string to a BigInt using the same algorithm as the BigInt() constructor. If conversion fails, return false.

Traditionally, and according to ECMAScript, all primitives and objects are loosely unequal to undefined and null. But most browsers permit a very narrow class of objects (specifically, the document.all object for any page), in some contexts, to act as if they emulate the value undefined. Loose equality is one such context: null == A and undefined == A evaluate to true if, and only if, A is an object that emulates undefined. In all other cases an object is never loosely equal to undefined or null.

In most cases, using loose equality is discouraged. The result of a comparison using strict equality is easier to predict, and may evaluate more quickly due to the lack of type coercion.

The following example demonstrates loose equality comparisons involving the number primitive 0, the bigint primitive 0n, the string primitive '0', and an object whose toString() value is '0'.
js

const num = 0;
const big = 0n;
const str = "0";
const obj = new String("0");

console.log(num == str); // true
console.log(big == num); // true
console.log(str == big); // true

console.log(num == obj); // true
console.log(big == obj); // true
console.log(str == obj); // true

Loose equality is only used by the == operator.
Same-value equality using Object.is()

Same-value equality determines whether two values are functionally identical in all contexts. (This use case demonstrates an instance of the Liskov substitution principle.) One instance occurs when an attempt is made to mutate an immutable property:
js

// Add an immutable NEGATIVE_ZERO property to the Number constructor.
Object.defineProperty(Number, "NEGATIVE_ZERO", {
value: -0,
writable: false,
configurable: false,
enumerable: false,
});

function attemptMutation(v) {
Object.defineProperty(Number, "NEGATIVE_ZERO", { value: v });
}

Object.defineProperty will throw an exception when attempting to change an immutable property, but it does nothing if no actual change is requested. If v is -0, no change has been requested, and no error will be thrown. Internally, when an immutable property is redefined, the newly-specified value is compared against the current value using same-value equality.

Same-value equality is provided by the Object.is method. It's used almost everywhere in the language where a value of equivalent identity is expected.
Same-value-zero equality

Similar to same-value equality, but +0 and -0 are considered equal.

Same-value-zero equality is not exposed as a JavaScript API, but can be implemented with custom code:
js

function sameValueZero(x, y) {
if (typeof x === "number" && typeof y === "number") {
// x and y are equal (may be -0 and 0) or they are both NaN
return x === y || (x !== x && y !== y);
}
return x === y;
}

Same-value-zero only differs from strict equality by treating NaN as equivalent, and only differs from same-value equality by treating -0 as equivalent to 0. This makes it usually have the most sensible behavior during searching, especially when working with NaN. It's used by Array.prototype.includes(), TypedArray.prototype.includes(), as well as Map and Set methods for comparing key equality.
Comparing equality methods

People often compare double equals and triple equals by saying one is an "enhanced" version of the other. For example, double equals could be said as an extended version of triple equals, because the former does everything that the latter does, but with type conversion on its operands — for example, 6 == "6". Alternatively, it can be claimed that double equals is the baseline, and triple equals is an enhanced version, because it requires the two operands to be the same type, so it adds an extra constraint.

However, this way of thinking implies that the equality comparisons form a one-dimensional "spectrum" where "totally strict" lies on one end and "totally loose" lies on the other. This model falls short with Object.is, because it isn't "looser" than double equals or "stricter" than triple equals, nor does it fit somewhere in between (i.e., being both stricter than double equals, but looser than triple equals). We can see from the sameness comparisons table below that this is due to the way that Object.is handles NaN. Notice that if Object.is(NaN, NaN) evaluated to false, we could say that it fits on the loose/strict spectrum as an even stricter form of triple equals, one that distinguishes between -0 and +0. The NaN handling means this is untrue, however. Unfortunately, Object.is has to be thought of in terms of its specific characteristics, rather than its looseness or strictness with regard to the equality operators.
x y == === Object.is SameValueZero
undefined undefined ✅ true ✅ true ✅ true ✅ true
null null ✅ true ✅ true ✅ true ✅ true
true true ✅ true ✅ true ✅ true ✅ true
false false ✅ true ✅ true ✅ true ✅ true
'foo' 'foo' ✅ true ✅ true ✅ true ✅ true
0 0 ✅ true ✅ true ✅ true ✅ true
+0 -0 ✅ true ✅ true ❌ false ✅ true
+0 0 ✅ true ✅ true ✅ true ✅ true
-0 0 ✅ true ✅ true ❌ false ✅ true
0n -0n ✅ true ✅ true ✅ true ✅ true
0 false ✅ true ❌ false ❌ false ❌ false
"" false ✅ true ❌ false ❌ false ❌ false
"" 0 ✅ true ❌ false ❌ false ❌ false
'0' 0 ✅ true ❌ false ❌ false ❌ false
'17' 17 ✅ true ❌ false ❌ false ❌ false
[1, 2] '1,2' ✅ true ❌ false ❌ false ❌ false
new String('foo') 'foo' ✅ true ❌ false ❌ false ❌ false
null undefined ✅ true ❌ false ❌ false ❌ false
null false ❌ false ❌ false ❌ false ❌ false
undefined false ❌ false ❌ false ❌ false ❌ false
{ foo: 'bar' } { foo: 'bar' } ❌ false ❌ false ❌ false ❌ false
new String('foo') new String('foo') ❌ false ❌ false ❌ false ❌ false
0 null ❌ false ❌ false ❌ false ❌ false
0 NaN ❌ false ❌ false ❌ false ❌ false
'foo' NaN ❌ false ❌ false ❌ false ❌ false
NaN NaN ❌ false ❌ false ✅ true ✅ true
When to use Object.is() versus triple equals

In general, the only time Object.is's special behavior towards zeros is likely to be of interest is in the pursuit of certain meta-programming schemes, especially regarding property descriptors, when it is desirable for your work to mirror some of the characteristics of Object.defineProperty. If your use case does not require this, it is suggested to avoid Object.is and use === instead. Even if your requirements involve having comparisons between two NaN values evaluate to true, generally it is easier to special-case the NaN checks (using the isNaN method available from previous versions of ECMAScript) than it is to work out how surrounding computations might affect the sign of any zeros you encounter in your comparison.

Here's a non-exhaustive list of built-in methods and operators that might cause a distinction between -0 and +0 to manifest itself in your code:

- (unary negation)

      Consider the following example:
      js

      const stoppingForce = obj.mass * -obj.velocity;

      If obj.velocity is 0 (or computes to 0), a -0 is introduced at that place and propagates out into stoppingForce.

  Math.atan2, Math.ceil, Math.pow, Math.round

      In some cases, it's possible for a -0 to be introduced into an expression as a return value of these methods even when no -0 exists as one of the parameters. For example, using Math.pow to raise -Infinity to the power of any negative, odd exponent evaluates to -0. Refer to the documentation for the individual methods.

  Math.floor, Math.max, Math.min, Math.sin, Math.sqrt, Math.tan

      It's possible to get a -0 return value out of these methods in some cases where a -0 exists as one of the parameters. E.g., Math.min(-0, +0) evaluates to -0. Refer to the documentation for the individual methods.

  ~, <<, >>

      Each of these operators uses the ToInt32 algorithm internally. Since there is only one representation for 0 in the internal 32-bit integer type, -0 will not survive a round trip after an inverse operation. E.g., both Object.is(~~(-0), -0) and Object.is(-0 << 2 >> 2, -0) evaluate to false.

Relying on Object.is when the signedness of zeros is not taken into account can be hazardous. Of course, when the intent is to distinguish between -0 and +0, it does exactly what's desired.
Caveat: Object.is() and NaN

The Object.is specification treats all instances of NaN as the same object. However, since typed arrays are available, we can have distinct floating point representations of NaN which don't behave identically in all contexts. For example:
js

const f2b = (x) => new Uint8Array(new Float64Array([x]).buffer);
const b2f = (x) => new Float64Array(x.buffer)[0];
// Get a byte representation of NaN
const n = f2b(NaN);
// Change the first bit, which is the sign bit and doesn't matter for NaN
n[0] = 1;
const nan2 = b2f(n);
console.log(nan2); // NaN
console.log(Object.is(nan2, NaN)); // true
console.log(f2b(NaN)); // Uint8Array(8) [0, 0, 0, 0, 0, 0, 248, 127]
console.log(f2b(nan2)); // Uint8Array(8) [1, 0, 0, 0, 0, 0, 248, 127]

## Enumerability and ownership of properties

Every property in JavaScript objects can be classified by three factors:

- Enumerable or non-enumerable;
- String or symbol;
- Own property or inherited property from the prototype chain.
  Enumerable properties are those properties whose internal enumerable flag is set to true, which is the default for properties created via simple assignment or via a property initializer. Properties defined via Object.defineProperty and such are not enumerable by default. Most iteration means (such as for...in loops and Object.keys) only visit enumerable keys.

Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain.

All properties, enumerable or not, string or symbol, own or inherited, can be accessed with dot notation or bracket notation. In this section, we will focus on the means provided by JavaScript to visit a group of object properties one-by-one.
Querying object properties

There are four built-in ways to query a property of an object. They all support both string and symbol keys. The following table summarizes when each method returns true.
Enumerable, own Enumerable, inherited Non-enumerable, own Non-enumerable, inherited
propertyIsEnumerable() true ✅ false ❌ false ❌ false ❌
hasOwnProperty() true ✅ false ❌ true ✅ false ❌
Object.hasOwn() true ✅ false ❌ true ✅ false ❌
in true ✅ true ✅ true ✅ true ✅
Traversing object properties

There are many methods in JavaScript that traverse a group of properties of an object. Sometimes, these properties are returned as an array; sometimes, they are iterated one-by-one in a loop; sometimes, they are used for constructing or mutating another object. The following table summarizes when a property may be visited.

Methods that only visit string properties or only symbol properties will have an extra note. ✅ means a property of this type will be visited; ❌ means it will not.
Enumerable, own Enumerable, inherited Non-enumerable, own Non-enumerable, inherited
Object.keys
Object.values
Object.entries ✅
(strings) ❌ ❌ ❌
Object.getOwnPropertyNames ✅
(strings) ❌ ✅
(strings) ❌
Object.getOwnPropertySymbols ✅
(symbols) ❌ ✅
(symbols) ❌
Object.getOwnPropertyDescriptors ✅ ❌ ✅ ❌
Reflect.ownKeys ✅ ❌ ✅ ❌
for...in ✅
(strings) ✅
(strings) ❌ ❌
Object.assign
(After the first parameter) ✅ ❌ ❌ ❌
Object spread ✅ ❌ ❌ ❌

## Closures

Those three public functions form closures that share the same lexical environment. Thanks to JavaScript's lexical scoping, they each have access to the privateCounter variable and the changeBy function.
js

const makeCounter = function () {
let privateCounter = 0;
function changeBy(val) {
privateCounter += val;
}
return {
increment() {
changeBy(1);
},

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },

};
};

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1.value()); // 0.

counter1.increment();
counter1.increment();
console.log(counter1.value()); // 2.

counter1.decrement();
console.log(counter1.value()); // 1.
console.log(counter2.value()); // 0.

Notice how the two counters maintain their independence from one another. Each closure references a different version of the privateCounter variable through its own closure. Each time one of the counters is called, its lexical environment changes by changing the value of this variable. Changes to the variable value in one closure don't affect the value in the other closure.

Note: Using closures in this way provides benefits that are normally associated with object-oriented programming. In particular, data hiding and encapsulation.

### Closure scope chain

Every closure has three scopes:

    Local scope (Own scope)
    Enclosing scope (can be block, function, or module scope)
    Global scope

A common mistake is not realizing that in the case where the outer function is itself a nested function, access to the outer function's scope includes the enclosing scope of the outer function—effectively creating a chain of function scopes. To demonstrate, consider the following example code.

# ADVANCED

## Inheritance and the prototype chain

Performance

The lookup time for properties that are high up on the prototype chain can have a negative impact on the performance, and this may be significant in the code where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.

## Memory Management

### Memory life cycle

Regardless of the programming language, the memory life cycle is pretty much always the same:

    Allocate the memory you need
    Use the allocated memory (read, write)
    Release the allocated memory when it is not needed anymore

The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript.

#### Allocation in JavaScript

##### Value initialization

When you initialize a value, JS automatically allocate memory for that value.
const x = 'Same'; // allocates memory for string

##### Allocation via function calls

const d = new Date(); // allocates a Date object

### Garbage Collection

The general problem of automatically finding whether some memory "is not needed anymore" is undecidable. As a consequence, garbage collectors implement a restriction of a solution to the general problem. This section will explain the concepts that are necessary for understanding the main garbage collection algorithms and their respective limitations.

Reference-counting garbage collection:This algorithm reduces the problem from determining whether or not an object is still needed to determining if an object still has any other objects referencing it. An object is said to be "garbage", or collectible if there are zero references pointing to it.

Mark-and-sweep algorithm:This algorithm assumes the knowledge of a set of objects called roots. In JavaScript, the root is the global object. Periodically, the garbage collector will start from these roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.

#### Data structures aiding memory management

Although JavaScript does not directly expose the garbage collector API, the language offers several data structures that indirectly observe garbage collection and can be used to manage memory usage.

WeakMaps and WeakSets

WeakMap and WeakSet are data structures whose APIs closely mirror their non-weak counterparts: Map and Set. WeakMap allows you to maintain a collection of key-value pairs, while WeakSet allows you to maintain a collection of unique values, both with performant addition, deletion, and querying.

WeakMap and WeakSet got the name from the concept of weakly held values. If x is weakly held by y, it means that although you can access the value of x via y, the mark-and-sweep algorithm won't consider x as reachable if nothing else strongly holds to it. Most data structures, except the ones discussed here, strongly holds to the objects passed in so that you can retrieve them at any time. The keys of WeakMap and WeakSet can be garbage-collected (for WeakMap objects, the values would then be eligible for garbage collection as well) as long as nothing else in the program is referencing the key. This is ensured by two characteristics:

    WeakMap and WeakSet can only store objects or symbols. This is because only objects are garbage collected — primitive values can always be forged (that is, 1 === 1 but {} !== {}), making them stay in the collection forever. Registered symbols (like Symbol.for("key")) can also be forged and thus not garbage collectable, but symbols created with Symbol("key") are garbage collectable. Well-known symbols like Symbol.iterator come in a fixed set and are unique throughout the lifetime of the program, similar to intrinsic objects such as Array.prototype, so they are also allowed as keys.
    WeakMap and WeakSet are not iterable. This prevents you from using Array.from(map.keys()).length to observe the liveliness of objects, or get hold of an arbitrary key which should otherwise be eligible for garbage collection. (Garbage collection should be as invisible as possible.)

WeakRefs and FinalizationRegistry

Note: WeakRef and FinalizationRegistry offer direct introspection into the garbage collection machinery. Avoid using them where possible because the runtime semantics are almost completely unguaranteed.

All variables with an object as value are references to that object. However, such references are strong — their existence would prevent the garbage collector from marking the object as eligible for collection. A WeakRef is a weak reference to an object that allows the object to be garbage collected, while still retaining the ability to read the object's content during its lifetime.

One use case for WeakRef is a cache system which maps string URLs to large objects. We cannot use a WeakMap for this purpose, because WeakMap objects have their keys weakly held, but not their values — if you access a key, you would always deterministically get the value (since having access to the key means it's still alive). Here, we are okay to get undefined for a key (if the corresponding value is no longer alive) since we can just re-compute it, but we don't want unreachable objects to stay in the cache. In this case, we can use a normal Map, but with each value being a WeakRef of the object instead of the actual object value.
js

function cached(getter) {
// A Map from string URLs to WeakRefs of results
const cache = new Map();
return async (key) => {
if (cache.has(key)) {
const dereferencedValue = cache.get(key).deref();
if (dereferencedValue !== undefined) {
return dereferencedValue;
}
}
const value = await getter(key);
cache.set(key, new WeakRef(value));
return value;
};
}

const getImage = cached((url) => fetch(url).then((res) => res.blob()));

FinalizationRegistry provides an even stronger mechanism to observe garbage collection. It allows you to register objects and be notified when they are garbage collected. For example, for the cache system exemplified above, even when the blobs themselves are free for collection, the WeakRef objects that hold them are not — and over time, the Map may accumulate a lot of useless entries. Using a FinalizationRegistry allows one to perform cleanup in this case.
js

function cached(getter) {
// A Map from string URLs to WeakRefs of results
const cache = new Map();
// Every time after a value is garbage collected, the callback is
// called with the key in the cache as argument, allowing us to remove
// the cache entry
const registry = new FinalizationRegistry((key) => {
// Note: it's important to test that the WeakRef is indeed empty.
// Otherwise, the callback may be called after a new object has been
// added with this key, and that new, alive object gets deleted
if (!cache.get(key)?.deref()) {
cache.delete(key);
}
});
return async (key) => {
if (cache.has(key)) {
return cache.get(key).deref();
}
const value = await getter(key);
cache.set(key, new WeakRef(value));
registry.register(value, key);
return value;
};
}

const getImage = cached((url) => fetch(url).then((res) => res.blob()));

Due to performance and security concerns, there is no guarantee of when the callback will be called, or if it will be called at all. It should only be used for cleanup — and non-critical cleanup. There are other ways for more deterministic resource management, such as try...finally, which will always execute the finally block. WeakRef and FinalizationRegistry exist solely for optimization of memory usage in long-running programs.

For more information on the API of WeakRef and FinalizationRegistry, see their reference pages.

## Concurrency model and Event Loop

JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.
Runtime concepts

The following sections explain a theoretical model. Modern JavaScript engines implement and heavily optimize the described semantics.

Stack

Function calls form a stack of frames.

Heap

Objects are allocated in a heap which is just a name to denote a large (mostly unstructured) region of memory.

Queue

A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function that gets called to handle the message.

At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use.

The processing of functions continues until the stack is once again empty. Then, the event loop will process the next message in the queue (if there is one).

Event loop

The event loop got its name because of how it's usually implemented, which usually resembles:
js

while (queue.waitForMessage()) {
queue.processNextMessage();
}

queue.waitForMessage() waits synchronously for a message to arrive (if one is not already available and waiting to be handled).

"Run-to-completion"

Each message is processed completely before any other message is processed.

This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be preempted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.

A downside of this model is that if a message takes too long to complete, the web application is unable to process user interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A good practice to follow is to make message processing short and if possible cut down one message into several messages.

Several runtimes communicating together

A web worker or a cross-origin iframe has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the postMessage method. This method adds a message to the other runtime if the latter listens to message events.

Never blocking

A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or a fetch() request to return, it can still process other things like user input.

Legacy exceptions exist like alert or synchronous XHR, but it is considered good practice to avoid them.

# MISC

## JavaScript technologies overview

## Lexical grammar

This page describes JavaScript's lexical grammar. JavaScript source text is just a sequence of characters — in order for the interpreter to understand it, the string has to be parsed to a more structured representation. The initial step of parsing is called lexical analysis, in which the text gets scanned from left to right and is converted into a sequence of individual, atomic input elements. Some input elements are insignificant to the interpreter, and will be stripped after this step — they include white space and comments. The others, including identifiers, keywords, literals, and punctuators (mostly operators), will be used for further syntax analysis. Line terminators and multiline comments are also syntactically insignificant, but they guide the process for automatic semicolons insertion to make certain invalid token sequences become valid.

### Identifiers

In JavaScript, identifiers are commonly made of alphanumeric characters, underscores (\_), and dollar signs ($). Identifiers are not allowed to start with numbers. However, JavaScript identifiers are not only limited to ASCII — many Unicode code points are allowed as well. Namely, any character in the ID_Start category can start an identifier, while any character in the ID_Continue category can appear after the first character.

Note: If, for some reason, you need to parse some JavaScript source yourself, do not assume all identifiers follow the pattern /[A-Za-z\_$][\w$]_/ (i.e. ASCII-only)! The range of identifiers can be described by the regex /[$\_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]_/u (excluding unicode escape sequences).

In addition, JavaScript allows using Unicode escape sequences in the form of \u0000 or \u{000000} in identifiers, which encode the same string value as the actual Unicode characters. For example, 你好 and \u4f60\u597d are the same identifiers:
js

const 你好 = "Hello";
console.log(\u4f60\u597d); // Hello

## Iteration protocols

Iteration protocols aren't new built-ins or syntax, but protocols. These protocols can be implemented by any object by following some conventions.

There are two protocols: The iterable protocol and the iterator protocol.
The iterable protocol

The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for...of construct. Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.

In order to be iterable, an object must implement the @@iterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant Symbol.iterator:

[Symbol.iterator]

    A zero-argument function that returns an object, conforming to the iterator protocol.

Whenever an object needs to be iterated (such as at the beginning of a for...of loop), its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

Note that when this zero-argument function is called, it is invoked as a method on the iterable object. Therefore inside of the function, the this keyword can be used to access the properties of the iterable object, to decide what to provide during the iteration.

This function can be an ordinary function, or it can be a generator function, so that when invoked, an iterator object is returned. Inside of this generator function, each entry can be provided by using yield.
The iterator protocol

The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.

An object is an iterator when it implements a next() method with the following semantics:

next()

    A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface (see below). If a non-object value gets returned (such as false or undefined) when a built-in language feature (such as for...of) is using the iterator, a TypeError ("iterator.next() returned a non-object value") will be thrown.

All iterator protocol methods (next(), return(), and throw()) are expected to return an object implementing the IteratorResult interface. It must have the following properties:

done Optional

    A boolean that's false if the iterator was able to produce the next value in the sequence. (This is equivalent to not specifying the done property altogether.)

    Has the value true if the iterator has completed its sequence. In this case, value optionally specifies the return value of the iterator.

value Optional

    Any JavaScript value returned by the iterator. Can be omitted when done is true.

In practice, neither property is strictly required; if an object without either property is returned, it's effectively equivalent to { done: false, value: undefined }.

If an iterator returns a result with done: true, any subsequent calls to next() are expected to return done: true as well, although this is not enforced on the language level.

The next method can receive a value which will be made available to the method body. No built-in language feature will pass any value. The value passed to the next method of generators will become the value of the corresponding yield expression.

Optionally, the iterator can also implement the return(value) and throw(exception) methods, which, when called, tells the iterator that the caller is done with iterating it and can perform any necessary cleanup (such as closing database connection).

return(value) Optional

    A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface, typically with value equal to the value passed in and done equal to true. Calling this method tells the iterator that the caller does not intend to make any more next() calls and can perform any cleanup actions.

throw(exception) Optional

    A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface, typically with done equal to true. Calling this method tells the iterator that the caller detects an error condition, and exception is typically an Error instance.

Note: It is not possible to know reflectively (i.e. without actually calling next() and validating the returned result) whether a particular object implements the iterator protocol.

It is very easy to make an iterator also iterable: just implement an [@@iterator]() method that returns this.
js

// Satisfies both the Iterator Protocol and Iterable
const myIterator = {
next() {
// ...
},
[Symbol.iterator]() {
return this;
},
};

Such object is called an iterable iterator. Doing so allows an iterator to be consumed by the various syntaxes expecting iterables — therefore, it is seldom useful to implement the Iterator Protocol without also implementing Iterable. (In fact, almost all syntaxes and APIs expect iterables, not iterators.) The generator object is an example:
js

const aGeneratorObject = (function\* () {
yield 1;
yield 2;
yield 3;
})();

console.log(typeof aGeneratorObject.next);
// "function" — it has a next method (which returns the right result), so it's an iterator

console.log(typeof aGeneratorObject[Symbol.iterator]);
// "function" — it has an @@iterator method (which returns the right iterator), so it's an iterable

console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject);
// true — its @@iterator method returns itself (an iterator), so it's an iterable iterator

All built-in iterators inherit from Iterator.prototype, which implements the [@@iterator]() method as returning this, so that built-in iterators are also iterable.

However, when possible, it's better for iterable[Symbol.iterator] to return different iterators that always start from the beginning, like Set.prototype[@@iterator]() does.
The async iterator and async iterable protocols

There are another pair of protocols used for async iteration, named async iterator and async iterable protocols. They have very similar interfaces compared to the iterable and iterator protocols, except that each return value from the calls to the iterator methods is wrapped in a promise.

An object implements the async iterable protocol when it implements the following methods:

[Symbol.asyncIterator]

    A zero-argument function that returns an object, conforming to the async iterator protocol.

An object implements the async iterator protocol when it implements the following methods:

next()

    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

return(value) Optional

    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

throw(exception) Optional

    A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

Interactions between the language and iteration protocols

The language specifies APIs that either produce or consume iterables and iterators.
Built-in iterables

String, Array, TypedArray, Map, Set, and Segments (returned by Intl.Segmenter.prototype.segment()) are all built-in iterables, because each of their prototype objects implements an @@iterator method. In addition, the arguments object and some DOM collection types such as NodeList are also iterables. There is no object in the core JavaScript language that is async iterable. Some web APIs, such as ReadableStream, have the Symbol.asyncIterator method set by default.

Generator functions return generator objects, which are iterable iterators. Async generator functions return async generator objects, which are async iterable iterators.

The iterators returned from built-in iterables actually all inherit from a common class Iterator, which implements the aforementioned [Symbol.iterator]() { return this; } method, making them all iterable iterators. The Iterator class also provides additional helper methods in addition to the next() method required by the iterator protocol. You can inspect an iterator's prototype chain by logging it in a graphical console.

console.log([][Symbol.iterator]());

Array Iterator {}
[[Prototype]]: Array Iterator ==> This is the prototype shared by all array iterators
next: ƒ next()
Symbol(Symbol.toStringTag): "Array Iterator"
[[Prototype]]: Object ==> This is the prototype shared by all built-in iterators
Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
[[Prototype]]: Object ==> This is Object.prototype

## Strict mode

JavaScript's strict mode is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode". Strict mode isn't just a subset: it intentionally has different semantics from normal code. Browsers not supporting strict mode will run strict mode code with different behavior from browsers that do, so don't rely on strict mode without feature-testing for support for the relevant aspects of strict mode. Strict mode code and non-strict mode code can coexist, so scripts can opt into strict mode incrementally.

Strict mode makes several changes to normal JavaScript semantics:

    Eliminates some JavaScript silent errors by changing them to throw errors.
    Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
    Prohibits some syntax likely to be defined in future versions of ECMAScript.

Invoking strict mode

Strict mode applies to entire scripts or to individual functions. It doesn't apply to block statements enclosed in {} braces; attempting to apply it to such contexts does nothing. eval code, Function code, event handler attributes, strings passed to setTimeout(), and related functions are either function bodies or entire scripts, and invoking strict mode in them works as expected.
Strict mode for scripts

To invoke strict mode for an entire script, put the exact statement "use strict"; (or 'use strict';) before any other statements.
js

// Whole-script strict mode syntax
"use strict";
const v = "Hi! I'm a strict mode script!";

Strict mode for functions

Likewise, to invoke strict mode for a function, put the exact statement "use strict"; (or 'use strict';) in the function's body before any other statements.
js

function myStrictFunction() {
// Function-level strict mode syntax
"use strict";
function nested() {
return "And so am I!";
}
return `Hi! I'm a strict mode function! ${nested()}`;
}
function myNotStrictFunction() {
return "I'm not strict.";
}

The "use strict" directive can only be applied to the body of functions with simple parameters. Using "use strict" in functions with rest, default, or destructured parameters is a syntax error.
js

function sum(a = 1, b = 2) {
// SyntaxError: "use strict" not allowed in function with default parameter
"use strict";
return a + b;
}

Strict mode for modules

The entire contents of JavaScript modules are automatically in strict mode, with no statement needed to initiate it.
js

function myStrictFunction() {
// because this is a module, I'm strict by default
}
export default myStrictFunction;

Strict mode for classes

All parts of a class's body are strict mode code, including both class declarations and class expressions.
js

class C1 {
// All code here is evaluated in strict mode
test() {
delete Object.prototype;
}
}
new C1().test(); // TypeError, because test() is in strict mode

const C2 = class {
// All code here is evaluated in strict mode
};

// Code here may not be in strict mode
delete Object.prototype; // Will not throw error

Changes in strict mode

Strict mode changes both syntax and runtime behavior. Changes generally fall into these categories:

    changes converting mistakes into errors (as syntax errors or at runtime)
    changes simplifying how variable references are resolved
    changes simplifying eval and arguments
    changes making it easier to write "secure" JavaScript
    changes anticipating future ECMAScript evolution.

Converting mistakes into errors

Strict mode changes some previously-accepted mistakes into errors. JavaScript was designed to be easy for novice developers, and sometimes it gives operations which should be errors non-error semantics. Sometimes this fixes the immediate problem, but sometimes this creates worse problems in the future. Strict mode treats these mistakes as errors so that they're discovered and promptly fixed.
Assigning to undeclared variables

Strict mode makes it impossible to accidentally create global variables. In sloppy mode, mistyping a variable in an assignment creates a new property on the global object and continues to "work". Assignments which would accidentally create global variables throw an error in strict mode:
js

"use strict";
let mistypeVariable;

// Assuming no global variable mistypeVarible exists
// this line throws a ReferenceError due to the
// misspelling of "mistypeVariable" (lack of an "a")
mistypeVarible = 17;

Failing to assign to object properties

Strict mode makes assignments which would otherwise silently fail to throw an exception. There are three ways to fail a property assignment:

    assignment to a non-writable data property
    assignment to a getter-only accessor property
    assignment to a new property on a non-extensible object

For example, NaN is a non-writable global variable. In sloppy mode, assigning to NaN does nothing; the developer receives no failure feedback. In strict mode, assigning to NaN throws an exception.
js

"use strict";

// Assignment to a non-writable global
undefined = 5; // TypeError
Infinity = 5; // TypeError

// Assignment to a non-writable property
const obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // TypeError

// Assignment to a getter-only property
const obj2 = {
get x() {
return 17;
},
};
obj2.x = 5; // TypeError

// Assignment to a new property on a non-extensible object
const fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // TypeError

Failing to delete object properties

Attempts to delete a non-configurable or otherwise undeletable (e.g. it's intercepted by a proxy's deleteProperty handler which returns false) property throw in strict mode (where before the attempt would have no effect):
js

"use strict";
delete Object.prototype; // TypeError
delete [].length; // TypeError

Strict mode also forbids deleting plain names. delete name in strict mode is a syntax error:
js

"use strict";

var x;
delete x; // syntax error

If the name is a configurable global property, prefix it with globalThis to delete it.
js

"use strict";

delete globalThis.x;

Duplicate parameter names

Strict mode requires that function parameter names be unique. In sloppy mode, the last duplicated argument hides previous identically-named arguments. Those previous arguments remain available through arguments, so they're not completely inaccessible. Still, this hiding makes little sense and is probably undesirable (it might hide a typo, for example), so in strict mode, duplicate argument names are a syntax error:
js

function sum(a, a, c) {
// syntax error
"use strict";
return a + a + c; // wrong if this code ran
}

Legacy octal literals

Strict mode forbids a 0-prefixed octal literal or octal escape sequence. In sloppy mode, a number beginning with a 0, such as 0644, is interpreted as an octal number (0644 === 420), if all digits are smaller than 8. Novice developers sometimes believe a leading-zero prefix has no semantic meaning, so they might use it as an alignment device — but this changes the number's meaning! A leading-zero syntax for the octal is rarely useful and can be mistakenly used, so strict mode makes it a syntax error:
js

"use strict";
const sum =
015 + // syntax error
197 +
142;

The standardized way to denote octal literals is via the 0o prefix. For example:
js

const sumWithOctal = 0o10 + 8;
console.log(sumWithOctal); // 16

Octal escape sequences, such as "\45", which is equal to "%", can be used to represent characters by extended-ASCII character code numbers in octal. In strict mode, this is a syntax error. More formally, it's disallowed to have \ followed by any decimal digit other than 0, or \0 followed by a decimal digit; for example \9 and \07.
Setting properties on primitive values

Strict mode forbids setting properties on primitive values. Accessing a property on a primitive implicitly creates a wrapper object that's unobservable, so in sloppy mode, setting properties is ignored (no-op). In strict mode, a TypeError is thrown.
js

"use strict";

false.true = ""; // TypeError
(14).sailing = "home"; // TypeError
"with".you = "far away"; // TypeError

Duplicate property names

Duplicate property names used to be considered a SyntaxError in strict mode. With the introduction of computed property names, making duplication possible at runtime, this restriction was removed in ES2015.
js

"use strict";
const o = { p: 1, p: 2 }; // syntax error prior to ECMAScript 2015

Note: Making code that used to error become non-errors is always considered backwards-compatible. This is a good part of the language being strict about throwing errors: it leaves room for future semantic changes.
Simplifying scope management

Strict mode simplifies how variable names map to particular variable definitions in the code. Many compiler optimizations rely on the ability to say that variable X is stored in that location: this is critical to fully optimizing JavaScript code. JavaScript sometimes makes this basic mapping of name to variable definition in the code impossible to perform until runtime. Strict mode removes most cases where this happens, so the compiler can better optimize strict mode code.
Removal of the with statement

Strict mode prohibits with. The problem with with is that any name inside the block might map either to a property of the object passed to it, or to a variable in surrounding (or even global) scope, at runtime; it's impossible to know which beforehand. Strict mode makes with a syntax error, so there's no chance for a name in a with to refer to an unknown location at runtime:
js

"use strict";
const x = 17;
with (obj) {
// Syntax error
// If this weren't strict mode, would this be const x, or
// would it instead be obj.x? It's impossible in general
// to say without running the code, so the name can't be
// optimized.
x;
}

The simple alternative of assigning the object to a short name variable, then accessing the corresponding property on that variable, stands ready to replace with.
Non-leaking eval

In strict mode, eval does not introduce new variables into the surrounding scope. In sloppy mode, eval("var x;") introduces a variable x into the surrounding function or the global scope. This means that, in general, in a function containing a call to eval, every name not referring to an argument or local variable must be mapped to a particular definition at runtime (because that eval might have introduced a new variable that would hide the outer variable). In strict mode, eval creates variables only for the code being evaluated, so eval can't affect whether a name refers to an outer variable or some local variable:
js

var x = 17;
var evalX = eval("'use strict'; var x = 42; x;");
console.assert(x === 17);
console.assert(evalX === 42);

Whether the string passed to eval() is evaluated in strict mode depends on how eval() is invoked (direct eval or indirect eval).
Block-scoped function declarations

The JavaScript language specification, since its start, had not allowed function declarations nested in block statements. However, it was so intuitive that most browsers implemented it as an extension grammar. Unfortunately, the implementations' semantics diverged, and it became impossible for the language specification to reconcile all implementations. Therefore, block-scoped function declarations are only explicitly specified in strict mode (whereas they were once disallowed in strict mode), while sloppy mode behavior remains divergent among browsers.
Making eval and arguments simpler

Strict mode makes arguments and eval less bizarrely magical. Both involve a considerable amount of magical behavior in sloppy mode: eval to add or remove bindings and to change binding values, and arguments syncing named arguments with its indexed properties. Strict mode makes great strides toward treating eval and arguments as keywords.
Preventing binding or assigning eval and arguments

The names eval and arguments can't be bound or assigned in language syntax. All these attempts to do so are syntax errors:
js

"use strict";
eval = 17;
arguments++;
++eval;
const obj = { set p(arguments) {} };
let eval;
try {
} catch (arguments) {}
function x(eval) {}
function arguments() {}
const y = function eval() {};
const f = new Function("arguments", "'use strict'; return 17;");

No syncing between parameters and arguments indices

Strict mode code doesn't sync indices of the arguments object with each parameter binding. In a sloppy mode function whose first argument is arg, setting arg also sets arguments[0], and vice versa (unless no arguments were provided or arguments[0] is deleted). arguments objects for strict mode functions store the original arguments when the function was invoked. arguments[i] does not track the value of the corresponding named argument, nor does a named argument track the value in the corresponding arguments[i].
js

function f(a) {
"use strict";
a = 42;
return [a, arguments[0]];
}
const pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
"Securing" JavaScript

Strict mode makes it easier to write "secure" JavaScript. Some websites now provide ways for users to write JavaScript which will be run by the website on behalf of other users. JavaScript in browsers can access the user's private information, so such JavaScript must be partially transformed before it is run, to censor access to forbidden functionality. JavaScript's flexibility makes it effectively impossible to do this without many runtime checks. Certain language functions are so pervasive that performing runtime checks has a considerable performance cost. A few strict mode tweaks, plus requiring that user-submitted JavaScript be strict mode code and that it be invoked in a certain manner, substantially reduce the need for those runtime checks.
No this substitution

The value passed as this to a function in strict mode is not forced into being an object (a.k.a. "boxed"). For a sloppy mode function, this is always an object: either the provided object, if called with an object-valued this; or the boxed value of this, if called with a primitive as this; or the global object, if called with undefined or null as this. (Use call, apply, or bind to specify a particular this.) Not only is automatic boxing a performance cost, but exposing the global object in browsers is a security hazard because the global object provides access to functionality that "secure" JavaScript environments must restrict. Thus for a strict mode function, the specified this is not boxed into an object, and if unspecified, this is undefined instead of globalThis:
js

"use strict";
function fun() {
return this;
}
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);

Removal of stack-walking properties

In strict mode it's no longer possible to "walk" the JavaScript stack. Many implementations used to implement some extension features that make it possible to detect the upstream caller of a function. When a function fun is in the middle of being called, fun.caller is the function that most recently called fun, and fun.arguments is the arguments for that invocation of fun. Both extensions are problematic for "secure" JavaScript because they allow "secured" code to access "privileged" functions and their (potentially unsecured) arguments. If fun is in strict mode, both fun.caller and fun.arguments are non-deletable properties which throw when set or retrieved:
js

function restricted() {
"use strict";
restricted.caller; // throws a TypeError
restricted.arguments; // throws a TypeError
}
function privilegedInvoker() {
return restricted();
}
privilegedInvoker();

Similarly, arguments.callee is no longer supported. In sloppy mode, arguments.callee refers to the enclosing function. This use case is weak: name the enclosing function! Moreover, arguments.callee substantially hinders optimizations like inlining functions, because it must be made possible to provide a reference to the un-inlined function if arguments.callee is accessed. arguments.callee for strict mode functions is a non-deletable property which throws an error when set or retrieved:
js

"use strict";
const f = function () {
return arguments.callee;
};
f(); // throws a TypeError

Future-proofing JavaScript
Extra reserved words

Reserved words are identifiers that can't be used as variable names. Strict mode reserves some more names than sloppy mode, some of which are already used in the language, and some of which are reserved for the future to make future syntax extensions easier to implement.

    implements
    interface
    let
    package
    private
    protected
    public
    static
    yield

Transitioning to strict mode

Strict mode has been designed so that the transition to it can be made gradually. It is possible to change each file individually and even to transition code to strict mode down to the function granularity.

You can migrate a codebase to strict mode by first adding "use strict" to a piece of source code, and then fixing all execution errors, while watching out for semantic differences.
Syntax errors

When adding 'use strict';, the following cases will throw a SyntaxError before the script is executing:

    Octal syntax const n = 023;
    with statement
    Using delete on a variable name delete myVariable;
    Using eval or arguments as variable or function argument name
    Using one of the newly reserved keywords (in prevision for future language features): implements, interface, let, package, private, protected, public, static, and yield
    Declaring two function parameters with the same name function f(a, b, b) {}
    Declaring the same property name twice in an object literal {a: 1, b: 3, a: 7}. This constraint was later removed (bug 1041128).

These errors are good, because they reveal plain errors or bad practices. They occur before the code is running, so they are easily discoverable as long as the code gets parsed by the runtime.
New runtime errors

JavaScript used to silently fail in contexts where what was done should be an error. Strict mode throws in such cases. If your code base contains such cases, testing will be necessary to be sure nothing is broken. You can screen for such errors at the function granularity level.

    Assigning to an undeclared variable throws a ReferenceError. This used to set a property on the global object, which is rarely the expected effect. If you really want to set a value to the global object, explicitly assign it as a property on globalThis.
    Failing to assign to an object's property (e.g. it's read-only) throws a TypeError. In sloppy mode, this would silently fail.
    Deleting a non-deletable property throws a TypeError. In sloppy mode, this would silently fail.
    Accessing arguments.callee, strictFunction.caller, or strictFunction.arguments throws a TypeError if the function is in strict mode. If you are using arguments.callee to call the function recursively, you can use a named function expression instead.

Semantic differences

These differences are very subtle differences. It's possible that a test suite doesn't catch this kind of subtle difference. Careful review of your code base will probably be necessary to be sure these differences don't affect the semantics of your code. Fortunately, this careful review can be done gradually down the function granularity.

this

    In sloppy mode, function calls like f() would pass the global object as the this value. In strict mode, it is now undefined. When a function was called with call or apply, if the value was a primitive value, this one was boxed into an object (or the global object for undefined and null). In strict mode, the value is passed directly without conversion or replacement.

arguments

    In sloppy mode, modifying a value in the arguments object modifies the corresponding named argument. This made optimizations complicated for JavaScript engine and made code harder to read/understand. In strict mode, the arguments object is created and initialized with the same values than the named arguments, but changes to either the arguments object or the named arguments aren't reflected in one another.

eval

    In strict mode code, eval doesn't create a new variable in the scope from which it was called. Also, of course, in strict mode, the string is evaluated with strict mode rules. Thorough testing will need to be performed to make sure nothing breaks. Not using eval if you don't really need it may be another pragmatic solution.

Block-scoped function declarations

    In sloppy mode, a function declaration inside a block may be visible outside the block and even callable. In strict mode, a function declaration inside a block is only visible inside the block.

## Template literals

## Trailing commas

## Deprecated features

# OTHERS

## Tasks vs. microtasks

A task is any JavaScript scheduled to be run by the standard mechanisms such as initially starting to execute a program, an event triggering a callback, and so forth. Other than by using events, you can enqueue a task by using setTimeout() or setInterval().

The difference between the task queue and the microtask queue is simple but very important:

    When executing tasks from the task queue, the runtime executes each task that is in the queue at the moment a new iteration of the event loop begins. Tasks added to the queue after the iteration begins will not run until the next iteration.
    Each time a task exits, and the execution context stack is empty, each microtask in the microtask queue is executed, one after another. The difference is that execution of microtasks continues until the queue is empty—even if new ones are scheduled in the interim. In other words, microtasks can enqueue new microtasks and those new microtasks will execute before the next task begins to run, and before the end of the current event loop iteration.

Solutions

The use of web workers, which allow the main script to run other scripts in new threads, help to alleviate this problem. A well-designed website or app uses workers to perform any complex or lengthy operations, leaving the main thread to do as little work as possible beyond updating, laying out, and rendering the web page.

This is further alleviated by using asynchronous JavaScript techniques such as promises to allow the main code to continue to run while waiting for the results of a request. However, code running at a more fundamental level—such as code comprising a library or framework—may need a way to schedule code to be run at a safe time while still executing on the main thread, independent of the results of any single request or task.

Microtasks are another solution to this problem, providing a finer degree of access by making it possible to schedule code to run before the next iteration of the event loop begins, instead of having to wait until the next one.

The microtask queue has been around for a while, but it's historically been used only internally in order to drive things like promises. The addition of queueMicrotask(), exposing it to web developers, creates a unified queue for microtasks which is used wherever it's necessary to have the ability to schedule code to run safely when there are no execution contexts left on the JavaScript execution context stack. Across multiple instances and across all browsers and JavaScript runtimes, a standardized microqueue mechanism means these microtasks will operate reliably in the same order, thus avoiding potentially difficult to find bugs.

## Using microtasks in JavaScript with queueMicrotask()

A microtask is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent to drive the script's execution environment.This event loop may be either the browser's main event loop or the event loop driving a web worker.

### Tasks

The event loop driving your code handles these tasks one after another, in the order in which they were enqueued. The oldest runnable task in the task queue will be executed during a single iteration of the event loop. After that, microtasks will be executed until the microtask queue is empty, and then the browser may choose to update rendering. Then the browser moves on to the next iteration of event loop.

### Microtasks

whereas the event loop runs only the tasks present on the queue when the iteration began, one after another, it handles the microtask queue very differently.

here are two key differences.

First, each time a task exits, the event loop checks to see if the task is returning control to other JavaScript code. If not, it runs all of the microtasks in the microtask queue. The microtask queue is, then, processed multiple times per iteration of the event loop, including after handling events and other callbacks.

Second, if a microtask adds more microtasks to the queue by calling queueMicrotask(), those newly-added microtasks execute before the next task is run. That's because the event loop will keep calling microtasks until there are none left in the queue, even if more keep getting added.

### Using Microtasks

#### Ensuring ordering on conditional use of promises

The Problem:

```js
customElement.prototype.getData = (url) => {
  if (this.cache[url]) {
    this.data = this.cache[url];
    this.dispatchEvent(new Event("load"));
  } else {
    fetch(url)
      .then((result) => result.arrayBuffer())
      .then((data) => {
        this.cache[url] = data;
        this.data = data;
        this.dispatchEvent(new Event("load"));
      });
  }
};
```

The problem introduced here is that by using a task in one branch of the if...else statement (in the case in which the image is available in the cache) but having promises involved in the else clause, we have a situation in which the order of operations can vary; for example, as seen below.

The Solution:

```js
customElement.prototype.getData = (url) => {
  if (this.cache[url]) {
    queueMicrotask(() => {
      this.data = this.cache[url];
      this.dispatchEvent(new Event("load"));
    });
  } else {
    fetch(url)
      .then((result) => result.arrayBuffer())
      .then((data) => {
        this.cache[url] = data;
        this.data = data;
        this.dispatchEvent(new Event("load"));
      });
  }
};
```

This balances the clauses by having both situations handle the setting of data and firing of the load event within a microtask (using queueMicrotask() in the if clause and using the promises used by fetch() in the else clause).
