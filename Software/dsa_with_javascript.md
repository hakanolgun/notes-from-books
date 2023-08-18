# 1 - The JavaScript Programming Environment and Model

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
  this.clear = clear; // reset
  this.find = find; // find element index
  this.toString = toString; // return or log the dataStore
  this.insert = insert; // insert after an element
  this.append = append; // push
  this.remove = remove; // remove element if it exist
  this.front = front; // move pos to first item
  this.end = end; // move pos to last item
  this.prev = prev; // move pos to previous item
  this.next = next; // move pos to next item
  this.length = length; // return length of dataStore
  this.currPos = currPos; //return current pos
  this.moveTo = moveTo; // move pos to specific index
  this.getElement = getElement; // return current pos element
}

const myList = new List();
myList.toString();
myList.append("mike");
myList.toString();
myList.append("john");
myList.toString();
myList.insert("killu", "mike");
myList.toString();
myList.next();
myList.getElement();

// Solution
class List {
  constructor() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }
  clear() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }
  find(elem) {
    for (let i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i] === elem) {
        return i;
      }
    }
    return -1;
  }
  toString() {
    console.log(this.dataStore);
    return this.dataStore;
  }
  insert(elem, after) {
    const afterPos = this.find(after);
    if (afterPos > -1) {
      this.dataStore.splice(afterPos + 1, 0, elem);
      ++this.listSize;
    }
  }
  append(elem) {
    this.dataStore[this.listSize++] = elem;
  }
  remove(elem) {
    const elemPos = this.find(elem);
    if (elemPos > -1) {
      this.dataStore.splice(elemPos, 0);
      --this.listSize;
      return true;
    }
    return false;
  }
  // After this line for traversing
  front() {
    this.pos = 0;
  }
  end() {
    this.pos = this.listSize - 1;
  }
  prev() {
    if (this.pos > 0) {
      --this.pos;
    }
  }
  next() {
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  }
  currPos() {
    return this.pos;
  }
  moveTo(index) {
    if (index > -1 && index < this.listSize - 1) {
      this.pos = index;
    }
  }
  getElement() {
    console.log(this.dataStore[this.pos]);
    return this.dataStore[this.pos];
  }
}
```

The behavior we’ve demonstrated in these past few code fragments is captured in the concept of an **iterator**. An iterator allows us to traverse a list without referencing the internal storage mechanism of the List class. Some advantages to using iterators over using array indexing include:

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
function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push; // and new element end of the array
  this.pop = pop; // remove the last element
  this.peek = peek; // return the element on top
}

// Solution
class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }
  push(elem) {
    this.dataStore[this.top++] = elem;
  }
  pop() {
    if (this.dataStore.length > 0) {
      this.dataStore[--this.top];
    }
  }
  peek() {
    console.log(this.dataStore[this.top]);
    return this.dataStore[this.top];
  }
}

// type StackNode<T> = {
//   value: T;
//   prev?: StackNode<T>;
// };

class PrimageanStack {
  constructor() {
    this.head = undefined;
    this.length = 0;
  }
  push(item) {
    const node = { value: item };
    this.length++;
    if (!this.head) {
      this.head = node;
    } else {
      node.prev = this.head;
      this.head = node;
    }
  }
  pop() {
    this.length = Math.max(0, this.length - 1);
    this.head = this.head?.prev;
  }
  peek() {
    console.log(this.head?.value);
    this.head?.value;
  }
}

const myStack = new PrimageanStack();
myStack.push("john");
myStack.push("mike");
myStack.peek();
myStack.pop();
myStack.peek();
myStack.push("heyyo");
myStack.peek();
```

# 5 - Queues
A queue is a type of list where data are inserted at the end and are removed from the front. Queues are used to store data in the order in which they occur, as opposed to a stack, in which the last piece of data entered is the first element used for processing. Think of a queue like the line at your bank, where the first person into the line is the first person served, and as more customers enter a line, they wait in the back until it is their turn to be served. A queue is an example of a first-in, first-out (FIFO) data structure.

```js
class Queue {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }
  enqueue(elem) {
    this.top++;
    this.dataStore.push(elem);
  }
  dequeue() {
    if (this.top > 0) {
      this.dataStore = this.dataStore.slice(1);
      this.top--;
    }
  }
  peek() {
    console.log(this.dataStore[0]);
  }
}

class PrimageanQueue {
  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }
  enqueue(item) {
    this.length++;
    const node = { value: item };
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
    }
  }
  dequeue() {
    if (this.head) {
      this.head = this.head.next;
      this.length--;
    }
  }
  peek() {
    console.log(this.head?.value);
    return this.head?.value;
  }
}
const myQ = new Queue();
myQ.enqueue("ilk item");
myQ.enqueue("ikinci item");
myQ.peek();
myQ.dequeue();
myQ.peek();
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

// another solution
class Node {
  constructor(item) {
    this.value = item;
    this.next = undefined;
    this.prev = undefined;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("Head");
  }
  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
    }
    return currNode;
  }
  insert(value, after) {
    const node = new Node(value);
    const current = this.find(after);
    node.next = current.next;
    node.prev = current;
    current.next = node;
  }
  append(value) {
    let node = new Node(value);
    const currNode = this.head;
    while (currNode.next) {
      currNode = currNode.next;
    }
    currNode.next = node;
    node.prev = currNode;
  }
  remove(value) {
    const current = this.find(value);
    current.prev.next = current.next;
  }
  display() {
    let currNode = this.head;
    console.log("display starts");
    while (currNode.next) {
      console.log(currNode.next);
      currNode = currNode.next;
    }
  }
}

const ll = new LinkedList();
ll.append("ilk");
ll.display();
ll.insert("iki", "ilk");
ll.display();
ll.remove("iki");
ll.display();

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();
```

**ArrayList**
ArrayList is the data structure which js uses for arrays. So const arr = [] is an ArrayList.

```js
class ArrayList {
  constructor() {
    this.array = [];
  }

  // Add an element to the end of the ArrayList
  add(element) {
    this.array.push(element);
  }

  // Get the element at the specified index
  get(index) {
    if (index >= 0 && index < this.array.length) {
      return this.array[index];
    }
    return undefined;
  }

  // Remove the element at the specified index
  remove(index) {
    if (index >= 0 && index < this.array.length) {
      this.array.splice(index, 1);
    }
  }

  // Get the current size of the ArrayList
  size() {
    return this.array.length;
  }

  // Check if the ArrayList is empty
  isEmpty() {
    return this.array.length === 0;
  }
}

// Usage example:
const myArrayList = new ArrayList();
myArrayList.add(10);
myArrayList.add(20);
myArrayList.add(30);

console.log("Size:", myArrayList.size()); // Output: Size: 3
console.log("Element at index 1:", myArrayList.get(1)); // Output: Element at index 1: 20

myArrayList.remove(0);
console.log("Size after removing:", myArrayList.size()); // Output: Size after removing: 2
```

A RingBuffer is a fixed-size buffer that overwrites the oldest data when it reaches its capacity. Here's an implementation of a RingBuffer:
```js
class RingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.size = 0;
  }

  // Add an element to the buffer
  enqueue(value) {
    this.buffer[this.writeIndex] = value;
    this.writeIndex = (this.writeIndex + 1) % this.capacity;
    if (this.size < this.capacity) {
      this.size++;
    } else {
      this.readIndex = this.writeIndex;
    }
  }

  // Remove and return the oldest element from the buffer
  dequeue() {
    if (this.size === 0) {
      return undefined;
    }
    const value = this.buffer[this.readIndex];
    this.buffer[this.readIndex] = null;
    this.readIndex = (this.readIndex + 1) % this.capacity;
    this.size--;
    return value;
  }

  // Get the number of elements in the buffer
  getSize() {
    return this.size;
  }

  // Get the capacity of the buffer
  getCapacity() {
    return this.capacity;
  }

  // Check if the buffer is empty
  isEmpty() {
    return this.size === 0;
  }

  // Check if the buffer is full
  isFull() {
    return this.size === this.capacity;
  }
}

// Usage example:
const myRingBuffer = new RingBuffer(5);
myRingBuffer.enqueue(1);
myRingBuffer.enqueue(2);
myRingBuffer.enqueue(3);
myRingBuffer.enqueue(4);
myRingBuffer.enqueue(5);
console.log(myRingBuffer.dequeue()); // Output: 1 (Oldest element)
console.log(myRingBuffer.getSize()); // Output: 4
```

# 7 - Dictionaries

# 8 - Hashing

# 9 - Sets

# 10 - Binary Trees and Binary Search Trees

# 11 - Graphs

# 12 - Sorting Algorithms

# 13 - Searching Algorithms

# 14 - Advanced Algorithms
