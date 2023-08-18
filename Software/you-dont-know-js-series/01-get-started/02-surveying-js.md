# Surveying JS

- JS sees every .js file is a seperate program.
- Execution of the program make it possible to cooperate each file and act like a single program.
- Many projects uses build tools to get together all related js files and produce a one js file to be delivered to a webpage. Then JS treats this single file as the entire program
- The only way this could be happen by sharing all files state to a **global scope**.
- Since ES2015 introduces module system, you should still think of each file is a mini program.

```
typeof 42;                  // "number"
typeof "abc";               // "string"
typeof true;                // "boolean"
typeof undefined;           // "undefined"
typeof null;                // "object" -- oops, bug!
typeof { "a": 1 };          // "object"
typeof [1,2,3];             // "object"
typeof function hello(){};  // "function"
```

- Converting one type to another referred as **coercion**.
- We declare variables with **var**,**let** and **const**. Generally people say that don't use **var**. It assumes you cant figure out the differences between them. It's wrong. You can learn it and use it if its good to use it.
- Const declared variable unchangeable but reassignabe!. You can add or update new properties to an object an array which declared with const.
- In function declaration, assignment happens at compile time, but in function expression assingment with its variable happens runtime.

```
// Function Expression
var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff;
};
```

- == comparison does type coertion, === comprarison does not;
- === opeators lies in two comparison:

```
NaN === NaN;            // false
0 === -0;               // true
```

- For NaN comparisons, use the Number.isNaN(..) utility, which does not lie. For -0 comparison, use the Object.is(..) utility, which also does not lie. Object.is(..) can also be used for non-lying NaN checks, if you prefer. Humorously, you could think of Object.is(..) as the "quadruple-equals" ====, the really-really-strict comparison!

- JS does not provide a mechanism for structural equality comparison of object values, only reference identity comparison. To do structural equality comparison, you'll need to implement the checks yourself.
  But beware, it's more complicated than you'll assume. For example, how might you determine if two function references are "structurally equivalent"? Even stringifying to compare their source code text wouldn't take into account things like closure. JS doesn't provide structural equality comparison because it's almost intractable to handle all the corner cases!

- == and === do the same job when two values are same type. But two values are different types == does coercion.

- You may be thinking, "Oh, well, I will just always avoid any coercive equality comparison (using === instead) to avoid those corner cases"! Eh, sorry, that's not quite as likely as you would hope. There's a pretty good chance that you'll use relational comparison operators like <, > (and even <= and >=).

- Just like ==, these operators will perform as if they're "strict" if the types being relationally compared already match, but they'll allow coercion first (generally, to numbers) if the types differ.

Consider:

```
var arr = [ "1", "10", "100", "1000" ];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
    // will run 3 times
}
```

- The i < arr.length comparison is "safe" from coercion because i and arr.length are always numbers. The arr[i] < 500 invokes coercion, though, because the arr[i] values are all strings. Those comparisons thus become 1 < 500, 10 < 500, 100 < 500, and 1000 < 500. Since that fourth one is false, the loop stops after its third iteration.

- These relational operators typically use numeric comparisons, except in the case where both values being compared are already strings; in this case, they use alphabetical (dictionary-like) comparison of the strings:

```
var x = "10";
var y = "9";

x < y;      // true, watch out!
```

- There's no way to get these relational operators to avoid coercion, other than to just never use mismatched types in the comparisons. That's perhaps admirable as a goal, but it's still pretty likely you're going to run into a case where the types may differ.

- The wiser approach is not to avoid coercive comparisons, but to embrace and learn their ins and outs.

## ES Modules

ES modules (ESM), introduced to the JS language in ES6, are meant to serve much the same spirit and purpose as the existing classic modules just described, especially taking into account important variations and use cases from AMD, UMD, and CommonJS.

The implementation approach does, however, differ significantly.

First, there's no wrapping function to define a module. The wrapping context is a file. ESMs are always file-based; one file, one module.

Second, you don't interact with a module's "API" explicitly, but rather use the export keyword to add a variable or method to its public API definition. If something is defined in a module but not exported, then it stays hidden (just as with classic modules).

Third, and maybe most noticeably different from previously discussed patterns, you don't "instantiate" an ES module, you just import it to use its single instance. ESMs are, in effect, "singletons," in that there's only one instance ever created, at first import in your program, and all other imports just receive a reference to that same single instance. If your module needs to support multiple instantiations, you have to provide a classic module-style factory function on your ESM definition for that purpose.
