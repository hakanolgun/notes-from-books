# Clean Code

## 2 - Meaningfull Names

- Dont use hard to understand words, abbrevations or single letters.
- Don't add noise words, use Product not ProductInfo or ProductData
- Use pronouncable names (class DtaRcrd102 )
- Pick one word per concept ( use fetch or get verb for requests not both)
- Use CS terms (JobQueue, AccountVisitor...)

## 3 - Functions

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

## 4 - Comments

- No comments, if possible!
- Don't comment bad code, rewrite it!
- The proper use of comments is to compensate for our failure to express ourself in code. Note that I used the word failure. I meant it. Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration.
- Dont commented-out codes, delete them. You can use version control to see back.

## 5 - Formatting

- We would like a source file to be like a newspaper article. The name should be simple but explanatory. The name, by itself, should be sufficient to tell us whether we are in the right module or not. The topmost parts of the source file should provide the high-level concepts and algorithms. Detail should increase as we move downward, until at the end we find the lowest level functions and details in the source file.
- Concepts that are closely related should be kept vertically close to each other [G10]. Clearly this rule doesn’t work for concepts that belong in separate files. But then closely related concepts should not be separated into different files unless you have a very good reason. Indeed, this is one of the reasons that protected variables should be avoided.
- If one function calls another, they should be vertically close, and the caller should be above the callee, if at all possible.
- Max 200 lines long files is optimal.
- Max 120 characters in one line is OK. 80 and 100 are also good.

## 6 - Objects and Data Structures

## 7 - Error Handling

- DO NOT RETURN NULL. If you are tempted to return null from a method, consider throwing an exception or returning a SPECIAL CASE object instead. If you are calling a null-returning method from a third-party API, consider wrapping that method with a method that either throws an exception or returns a special case object.

## 8 - Boundaries

## 9 - Unit Tests

## 10 - Classes

- Classes should be small! As with functions, our immediate question is always “How small?”
  With functions we measured size by counting physical lines. With classes we use a different measure. We count responsibilities.

## 11 - Systems

## 12 - Emergence

## 13 - Concurrency

## 14 - Successive Refinement

# Clean Coder

## 1 - Professionalism

It’s a lot easier to be a nonprofessional. Nonprofessionals don’t have to take responsibility for the job they do—they leave that to their employers. If a nonprofessional makes an error, the employer cleans up the mess. But when a professional makes a mistake, he cleans up the mess.
What would happen if you allowed a bug to slip through a module, and it cost your company $10,000? The nonprofessional would shrug his shoulders, say “stuff happens,” and start writing the next module. The professional would write the company a check for $10,000!1
Yeah, it feels a little different when it’s your own money, doesn’t it? But that feeling is the feeling a professional has all the time. Indeed, that feeling is the essence of professionalism. Because, you see, professionalism is all about taking responsibility.

- First do not harm. Do not harm to functionality of your software. We harm the function of our software when we create bugs. Therefore, in order to be professional, we must not create bugs.

- QA should find nothing
- You must know your code works. So test it. Test it all ways to Sunday.

### Work Ethic

It is also not your employer’s responsibility to give you the time you need to learn. Some employers may provide that time. Some employers may even demand that you take the time. But again, they are doing you a favor, and you should be appropriately appreciative. Such favors are not something you should expect.
You owe your employer a certain amount of time and effort. For the sake of argument, let’s use the U.S. standard of 40 hours per week. These 40 hours should be spent on your employer’s problems, not on your problems.
You should plan on working 60 hours per week. The first 40 are for your employer. The remaining 20 are for you. During this remaining 20 hours you should be reading, practicing, learning, and otherwise enhancing your career.

Here is a minimal list of the things that every software professional should be conversant with:
• Design patterns. You ought to be able to describe all 24 patterns in the GOF book and have a working knowledge of many of the patterns in the POSA books.
• Design principles. You should know the SOLID principles and have a good understanding of the component principles.
• Methods. You should understand XP, Scrum, Lean, Kanban, Waterfall, Structured Analysis, and Structured Design.
18B
• Disciplines. You should practice TDD, Object-Oriented design, Structured Programming, Continuous Integration, and Pair Programming.
• Artifacts: You should know how to use: UML, DFDs, Structure Charts, Petri Nets, State Transition Diagrams and Tables, flow charts, and decision tables.

CONTINUOUS LEARNING
The frenetic rate of change in our industry means that software developers must continue to learn copious quantities just to keep up. Woe to the architects who stop coding—they will rapidly find themselves irrelevant. Woe to the programmers who stop learning new languages—they will watch as the industry passes them by. Woe to the developers who fail to learn new disciplines and techniques—their peers will excel as they decline.
Would you visit a doctor who did not keep current with medical journals? Would you hire a tax lawyer who did not keep current with the tax laws and precedents? Why should employers hire developers who don’t keep current?
Read books, articles, blogs, tweets. Go to conferences. Go to user groups. Participate in reading and study groups. Learn things that are outside your comfort zone. If you are a .NET programmer, learn Java. If you are a Java programmer, learn Ruby. If you are a C programmer, learn Lisp. If you want to really bend your brain, learn Prolog and Forth!

PRACTICE
Professionals practice. True professionals work hard to keep their skills sharp and ready. It is not enough to simply do your daily job and call that practice. Doing your daily job is performance, not practice. Practice is when you specifically exercise your skills outside of the performance of your job for the sole purpose of refining and enhancing those skills.
What could it possibly mean for a software developer to practice? At first thought the concept seems absurd. But stop and think for a moment. Consider how musicians master their craft. It’s not by performing. It’s by practicing. And how do they practice? Among other things, they have special exercises that they perform. Scales and etudes and runs. They do these over and over to train their fingers and their mind, and to maintain mastery of their skill.

So what could software developers do to practice? There’s a whole chapter in this book dedicated to different practice techniques, so I won’t go into much detail here. One technique I use frequently is the repetition of simple exercises such as the Bowling Game or Prime Factors. I call these exercises kata. There are many such kata to choose from.
A kata usually comes in the form of a simple programming problem to solve, such as writing the function that calculates the prime factors of an integer. The point of doing the kata is not to figure out how to solve the problem; you know how to do that already. The point of the kata is to train your fingers and your brain.
I’ll do a kata or two every day, often as part of settling in to work. I might do it in Java, or in Ruby, or in Clojure, or in some other language for which I want to maintain my skills. I’ll use the kata to sharpen a particular skill, such as keeping my fingers used to hitting shortcut keys, or using certain refactorings.
Think of the kata as a 10-minute warm-up exercise in the morning and a 10-minute cool-down in the evening.

## 2 - Saying No

## 3 - Saying Yes

## 4 - Coding
