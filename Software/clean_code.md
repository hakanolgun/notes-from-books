# 2 - Meaningfull Names

- Dont use hard to understand words, abbrevations or single letters.
- Don't add noise words, use Product not ProductInfo or ProductData
- Use pronouncable names (class DtaRcrd102 )
- Pick one word per concept ( use fetch or get verb for requests not both)
- Use CS terms (JobQueue, AccountVisitor...)

# 3 - Functions

- FUNCTIONS SHOULD BE SMALL! DOES ONE THING AND THAT THING ONLY!
- This implies that the blocks within if statements, else statements, while statements, and so on should be one line long. Probably that line should be a function call. Not only does this keep the enclosing function small, but it also adds documentary value because the function called within the block can have a nicely descriptive name
- If a function does only those steps that are one level below the stated name of the function, then the function is doing one thing.
- So, another way to know that a function is doing more than “one thing” is if you can extract another function from it with a name that is not merely a restatement of its imple- mentation
- Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment. Use a naming convention that allows multiple words to be easily read in the function names, and then make use of those multiple words to give the function a name that says what it does.
- The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification—and then shouldn’t be used anyway.
- Flag arguments are ugly. Passing a boolean into a function is a truly terrible practice. It immediately complicates the signature of the method, loudly proclaiming that this function does more than one thing. It does one thing if the flag is true and another if the flag is false!
- For example, write(name) is very evocative. Whatever this “name” thing is, it is being “written.” An even better name might be writeField(name), which tells us that the “name” thing is a “field.”
- Command Query Separation
  Functions should either do something or answer something, but not both. Either your function should change the state of an object, or it should return some information about that object. Doing both often leads to confusion. Consider, for example, the following function:
  public boolean set(String attribute, String value);
  This function sets the value of a named attribute and returns true if it is successful and
  false if no such attribute exists. This leads to odd statements like this: if (set("username", "unclebob"))... The real solution is to separate the command from the query so that the ambiguity cannot occur.
  if (attributeExists("username")) { setAttribute("username", "unclebob"); ...
  }
- Extract try/catch blocks. Create seperate functions each one of them.
- Master programmers think of systems as stories to be told rather than programs to be written. They use the facilities of their chosen programming language to construct a much richer and more expressive language that can be used to tell that story.

# 4 - Comments

- No comments, if possible!
- Don't comment bad code, rewrite it!
- The proper use of comments is to compensate for our failure to express ourself in code. Note that I used the word failure. I meant it. Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration.
- Dont commented-out codes, delete them. You can use version control to see back.

# 5 - Formatting

- We would like a source file to be like a newspaper article. The name should be simple but explanatory. The name, by itself, should be sufficient to tell us whether we are in the right module or not. The topmost parts of the source file should provide the high-level concepts and algorithms. Detail should increase as we move downward, until at the end we find the lowest level functions and details in the source file.
- Concepts that are closely related should be kept vertically close to each other [G10]. Clearly this rule doesn’t work for concepts that belong in separate files. But then closely related concepts should not be separated into different files unless you have a very good reason. Indeed, this is one of the reasons that protected variables should be avoided.
- If one function calls another, they should be vertically close, and the caller should be above the callee, if at all possible.
- Max 200 lines long files is optimal.
- Max 120 characters in one line is OK. 80 and 100 are also good.

# 6 - Objects and Data Structures

# 7 - Error Handling

- DO NOT RETURN NULL. If you are tempted to return null from a method, consider throwing an exception or returning a SPECIAL CASE object instead. If you are calling a null-returning method from a third-party API, consider wrapping that method with a method that either throws an exception or returns a special case object.

# 8 - Boundaries

# 9 - Unit Tests

# 10 - Classes

- Classes should be small! As with functions, our immediate question is always “How small?”
  With functions we measured size by counting physical lines. With classes we use a different measure. We count responsibilities.

# 11 - Systems

# 12 - Emergence

# 13 - Concurrency
