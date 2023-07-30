# 1 - The JavaScript Programming Environment and Model
One major difference between the JavaScript switch statement and switch statements in other programming languages is that the expression that is being tested in the state‐ ment can be of any data type, as opposed to an integral data type, as required by languages such as C++ and Java. In fact, you’ll notice in the previous example that we use the month numbers as strings, rather than converting them to numbers, since we can com‐ pare strings using the switch statement in JavaScript.

All function parameters in JavaScript are passed by value, and there are no reference parameters. However, there are reference objects, such as arrays, which are passed to functions by reference, see this example:

```js
function curve(arr, amount) {
for (var i = 0; i < arr.length; ++i) {
      arr[i] += amount;
   }
}
var grades = [77, 73, 74, 81, 90]; curve(grades, 5);
print(grades); // displays 82,78,79,86,95
```
Hoisting:
1. Variable declarations are scanned and are made undefined
2. Function declarations are scanned and are made available
3. Arrow functions act like a variable, gets undefined.

# 2 - Arrays 
In programming, Array is the most basic data structure. Array is a linear locations in memory for data, which you can access by indices which is actually the offset of the element.

But Array in JS is different. Array in JS is an object. It is a specialized object. When you pass indices as numbers, engine converts it to a string to use as object properties. Because JS array is not an array actually, it is not as efficient as arrays in other programming languages.

Unlike other programming languages but common in other scripting languages; you don't have to put same type of elements in an array.

We can check if an object is array or not using Array.isArray() method.

When assign an array to another variable, your are assigning as a reference. It means when you make changes on the original array, assigned array also changes. This is called **shallow copy**.

```js
var nums = []; for(vari=0;i<100;++i){
       nums[i] = i+1;
    }
var samenums = nums;
nums[0] = 400;
print(samenums[0]); // displays 400
```
A better alternative is to make a deep copy, so that each of the original array’s elements is actually copied to the new array’s elements.

sort() methods sorts an array assumings it is a string array. For number array we need to pass a compare function to correctly sort numbers in the array like this:

```js
function compare(num1, num2) { 
    return num1 - num2;
}
var nums = [3,1,2,100,4,200]; 
nums.sort(compare); 
console.log(nums); // 1,2,3,4,100,200
```

# 3 - Lists 
# 4 - Stacks 
# 5 - Queues 
# 6 - Linked List 
# 7 - Dictionaries 
# 8 - Hashing 
# 9 - Sets 
# 10 - Binary Trees and Binary Search Trees 
# 11 - Graphs 
# 12 - Sorting Algorithms 
# 13 - Searching Algorithms 
# 14 - Advanced Algorithms 
