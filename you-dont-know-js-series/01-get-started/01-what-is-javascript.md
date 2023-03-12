# Language Specification

- TC39 manages JS. It is a committeeis comprised between 50-100 members. Members are from browser makers such as Mozilla, Google, device makers like Samsung. All members are volunteers but generally they are employees of the companies.

- Such as alert() or console.\*() are not a feature of JS. They are provided by browsers not the language.

- JS is backward compatible language, means that once something accepted as a valid JS, there will be no future change that cause that code to become invalid.

- HTML and CSS are forward-compatible but not backward. If some HTML is invalid in the future, other parts of the HTML will work.

- Difference between interpreted languages and compiled languages are not clear. Generally compiled languages firstly parse the code than create binaries.

- JS also a parsed language. Is it compiled? The answer is closer to yes than no.

1. When you finished your developmend your code is bundled by webpack and send to the JS engine of the browser.
2. Engine parse the code to AST
3. Engine converst AST to some kind of byte code
4. Finally JS Virtual Machine executes the code

- Web Assembly's original intend is to provide a paht to none-JS programs to be executed by an JS Engine. WASM is a represention format similar to Assembly that can be processed by a JS engine without parsing/compiling. Parsing/compiling of the WASM done ahead of time so only the binary goes to JS engine and executed immediately.
