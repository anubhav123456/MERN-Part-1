# Node.js `process` Object 

---

## Q1. What is the `process` object in Node.js?

**Answer:**

The `process` object is a **global object** provided by Node.js that gives information about the currently running Node.js process and allows interaction with it.

It is used for:

* Reading environment variables
* Reading command-line arguments
* Exiting the application
* Handling process lifecycle events
* Getting process information

Example:

```javascript
import process from "node:process";
```

---

## Q2. What is `process.env`?

**Answer:**

`process.env` is an object that contains all the **environment variables** available to the Node.js application.

It is mainly used to store configuration values outside the source code.

Examples:

* Backend Port
* Database URL
* API Keys
* JWT Secret
* Google OAuth Secret
* Passwords
* Environment Name

Example:

```javascript
const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT;
```

---

## Q3. Why do we use environment variables?

**Answer:**

Environment variables help keep configuration separate from the application's source code.

Benefits:

* Avoid hardcoding sensitive information.
* Different configurations for development, testing, and production.
* Improve application security.
* Easier deployment across different environments.

---

## Q4. What data type does `process.env` return?

**Answer:**

Every value in `process.env` is either:

* `string`
* `undefined`

Even numeric values are stored as strings.

Example:

```javascript
process.env.PORT
```

returns

```javascript
"5000"
```

not

```javascript
5000
```

---

## Q5. Why do we use `Number()` with `process.env.PORT`?

**Answer:**

Since environment variables are stored as strings, we convert numeric values into numbers before using them.

Example:

```javascript
const port = Number(process.env.PORT ?? 3000);
```

Without `Number()`, the port remains a string.

---

## Q6. What is the purpose of the `??` (Nullish Coalescing) operator?

**Answer:**

The `??` operator provides a default value when the left-hand side is `null` or `undefined`.

Example:

```javascript
const nodeEnv = process.env.NODE_ENV ?? "development";
```

If `NODE_ENV` is undefined, `"development"` is used.

---

## Q7. What is dotenv?

**Answer:**

`dotenv` is a package that loads environment variables from a `.env` file into `process.env`.

Example `.env` file:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mysql://localhost
JWT_SECRET=mysecret
```

After loading dotenv:

```javascript
process.env.PORT
process.env.JWT_SECRET
```

become available.

---

## Q8. What is `process.argv`?

**Answer:**

`process.argv` is an array containing the command-line arguments used to start the Node.js application.

Example:

```bash
node app.js start
```

Output:

```javascript
[
  "/path/to/node",
  "/path/to/app.js",
  "start"
]
```

---

## Q9. What do the indexes of `process.argv` represent?

**Answer:**

| Index | Meaning                 |
| ----- | ----------------------- |
| 0     | Path of Node executable |
| 1     | Path of current script  |
| 2     | First user argument     |
| 3     | Second user argument    |

---

## Q10. How do you get the first command-line argument?

**Answer:**

```javascript
const command = process.argv[2];
```

If the command is:

```bash
node app.js start
```

then

```javascript
command
```

contains

```javascript
"start"
```

---

## Q11. How do you provide a default command if no argument is passed?

**Answer:**

```javascript
const command = process.argv[2] ?? "start";
```

If the user does not provide an argument, `"start"` is used.

---

## Q12. What are command-line flags?

**Answer:**

Flags are optional command-line options that modify the application's behavior.

Example:

```bash
node app.js start --fail
```

Here, `--fail` is a flag.

---

## Q13. How do you check whether a flag exists?

**Answer:**

Use the `includes()` method.

Example:

```javascript
const shouldFail = process.argv.includes("--fail");
```

Similarly,

```javascript
const shouldCrash = process.argv.includes("--crash");
```

returns `true` if the flag is present.

---

## Q14. What is `process.exit()`?

**Answer:**

`process.exit()` immediately terminates the Node.js process.

Example:

```javascript
process.exit(1);
```

---

## Q15. What do different exit codes mean?

**Answer:**

| Exit Code | Meaning                |
| --------- | ---------------------- |
| 0         | Successful execution   |
| 1         | Error or failure       |
| >1        | Other error conditions |

Example:

```javascript
process.exit(0);
```

means successful completion.

```javascript
process.exit(1);
```

means the application exited because of an error.

---

## Q16. What are process lifecycle events?

**Answer:**

Process lifecycle events are events emitted by Node.js during different stages of the application's execution.

One common event is:

```javascript
process.on("exit", callback);
```

---

## Q17. What is the `"exit"` event?

**Answer:**

The `"exit"` event is emitted just before the Node.js process terminates.

Example:

```javascript
process.on("exit", (code) => {
    console.log(`Process finished with exit code ${code}`);
});
```

The callback receives the exit code.

---

## Q18. What can be done inside the `"exit"` event?

**Answer:**

Allowed:

* Final logging
* Synchronous cleanup

Example:

```javascript
process.on("exit", () => {
    console.log("Cleaning up...");
});
```

---

## Q19. What should NOT be done inside the `"exit"` event?

**Answer:**

Avoid starting asynchronous operations such as:

* Database queries
* API calls
* `setTimeout`
* `setInterval`
* Asynchronous file operations

Reason:
The Node.js process is already shutting down, so asynchronous tasks may never complete.

---
