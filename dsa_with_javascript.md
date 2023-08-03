# 1 - The JavaScript Programming Environment and Model

One major difference between the JavaScript switch statement and switch statements in other programming languages is that the expression that is being tested in the statement can be of any data type, as opposed to an integral data type, as required by languages such as C++ and Java. In fact, you’ll notice in the previous example that we use the month numbers as strings, rather than converting them to numbers, since we can com‐ pare strings using the switch statement in JavaScript.

All function parameters in JavaScript are passed by value, and there are no reference parameters. However, there are reference objects, such as arrays, which are passed to functions by reference, see this example:

```js
function curve(arr, amount) {
  for (var i = 0; i < arr.length; ++i) {
    arr[i] += amount;
  }
}
var grades = [77, 73, 74, 81, 90];
curve(grades, 5);
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
var nums = [];
for (vari = 0; i < 100; ++i) {
  nums[i] = i + 1;
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
var nums = [3, 1, 2, 100, 4, 200];
nums.sort(compare);
console.log(nums); // 1,2,3,4,100,200
```

# 3 - Lists

A list is an ordered sequence of data.

```js
function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
  this.clear = clear;
  this.find = find;
  this.toString = toString;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.length = length;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.length = length;
  this.contains = contains;
}
```

**Traversing a List**
This final set of functions allows movement through a list, and the last function, getElement(), displays the current element in a list:

```js
function front() {
  this.pos = 0;
}
function end() {
  this.pos = this.listSize - 1;
}
function prev() {
  if (this.pos > 0) {
    --this.pos;
  }
}
function next() {
  if (this.pos < this.listSize - 1) {
    ++this.pos;
  }
}
function currPos() {
  return this.pos;
}
function moveTo(position) {
  this.pos = position;
}
function getElement() {
  return this.dataStore[this.pos];
}
```

```js
names.front(); // moves to first element of the list
names.next(); // moves to next element of the list
console.log(names.getElement());
```

The behavior we’ve demonstrated in these past few code fragments is captured in the concept of an **iterator**. An iterator allows us to traverse a list without referencing the internal storage mecha‐ nism of the List class. Some advantages to using iterators over using array indexing include:

- Not having to worry about the underlying data storage structure when accessing list elements
- Being able to update the list and not having to update the iterator, where an index becomes invalid when a new element is added to the list
- Providing a uniform means of accessing elements for different types of data stores used in the implemenation of a List class
  With these advantages in mind, here is how to use an iterator to traverse through a list:

```js
for (names.front(); names.currPos() < names.length(); names.next()) {
  print(names.getElement());
}
```

# 4 - Stacks

Stack is a list-like data structure. Data can be added or removed only from the top of the stack.
Stacks are very widely used in prgramming like function calls order etc. LIFO (last in first out).

Because of the last-in, first-out nature of the stack, any element that is not currently at the top of the stack cannot be accessed. To get to an element at the bottom of the stack, you have to dispose of all the elements above it first.

The two primary operations of a stack are adding elements to a stack and taking elements off a stack. Elements are added to a stack using the push operation. Elements are taken off a stack using the pop operation.

To keep track of where the top element is, as well as keeping track of where to add a new element, we use a top variable that is incremented when we push new elements onto the stack and is decremented when we pop elements off the stack.

```js
class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }
  push(el) {
    this.dataStore[this.top++] = el;
  }
  peek() {
    return this.dataStore[this.top - 1];
  }
  pop() {
    return this.dataStore[--this.top];
  }
  clear() {
    this.top = 0;
  }
  length() {
    return this.top;
  }
}
```

# 5 - Queues

A queue is a type of list where data are inserted at the end and are removed from the front. Queues are used to store data in the order in which they occur, as opposed to a stack, in which the last piece of data entered is the first element used for processing. Think of a queue like the line at your bank, where the first person into the line is the first person served, and as more customers enter a line, they wait in the back until it is their turn to be served. A queue is an example of a first-in, first-out (FIFO) data structure.

```js
function Queue() {
  this.dataStore = [];
  this.enqueue = enqueue;
}
function enqueue(element) {
  this.dataStore.push(element);
}
function dequeue() {
  return this.dataStore.shift();
}
function front() {
  return this.dataStore[0];
}
function back() {
  return this.dataStore[this.dataStore.length - 1];
}
function toString() {
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; ++i) {
    retStr += this.dataStore[i] + "\n";
    return retStr;
  }
}
function empty() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}
```

**Priority Queues**
In the course of normal queue operations, when an element is removed from a queue, that element is always the first element that was inserted into the queue. There are certain applications of queues, however, that require that elements be removed in an order other than first-in, first-out. When we need to simulate such an application, we need to create a data structure called a priority queue.

# 6 - Linked List

There are several reasons arrays are not always the best data structure to use for organizing data. In many programming languages, arrays are fixed in length, so it is hard to add new data when the last element of the array is reached. Adding and removing data from an array is also difficult because you have to move array elements up or down to reflect either an addition or a deletion. However, these problems do not come up with JavaScript arrays, since we can use the split() function without having to perform additional array element accesses.

The main problem with using JavaScript arrays, however, is that arrays in JavaScript are implemented as objects, causing them to be less efficient than arrays built in languages such as C++ and Java.

When you determine that the operations performed on an array are too slow for practical use, you can consider using the linked list as an alternative data structure. The linked list can be used in almost every situation where a one-dimensional array is used, except when you need random access to the elements of a list. When random access is required, an array is the better data structure to use.

Linked List is very efficient when inserting and removing item from the list.

```js
function Node(element) {
  this.element = element;
  this.next = null;
}
function LList() {
  this.head = new Node("head");
  this.find = find;
  this.insert = insert;
  this.display = display;
  this.findPrevious = findPrevious;
  this.remove = remove;
}
function remove(item) {
  var prevNode = this.findPrevious(item);
  if (!(prevNode.next == null)) {
    prevNode.next = prevNode.next.next;
  }
}
function findPrevious(item) {
  var currNode = this.head;
  while (!(currNode.next == null) && currNode.next.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}
function display() {
  var currNode = this.head;
  while (!(currNode.next == null)) {
    print(currNode.next.element);
    currNode = currNode.next;
  }
}
function find(item) {
  var currNode = this.head;
  while (currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}
function insert(newElement, item) {
  var newNode = new Node(newElement);
  var current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
}
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
```

# 7 - Dictionaries

# 8 - Hashing

# 9 - Sets

# 10 - Binary Trees and Binary Search Trees

# 11 - Graphs

# 12 - Sorting Algorithms

# 13 - Searching Algorithms

# 14 - Advanced Algorithms
