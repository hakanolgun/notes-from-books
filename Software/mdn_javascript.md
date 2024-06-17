JavaScript is an

- interpreted (or JIT compiled)
- prototype-based (like smalltalk and self but more popular. with lua)
- multi-paradigm (supports OOP, imperative, declarative(functional) styles)
- single threaded
  language with first-class functions.

As soon as a browser implements a feature MDN tries to document it.

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
