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

## Keyed collections

## Working with objects

## Using classes

## Using promises

## JavaScript types arrays

## Iterators and generators

## Meta programming

## JavaScript modules

# INTERMEDIATE

# ADVANCED
