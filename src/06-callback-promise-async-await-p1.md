# JavaScript Event Loop Execution Flow

To fully grasp how this asynchronous code executes under the hood, we will track the state of the **Call Stack**, **Web APIs**, **Task Queue (Macrotask Queue)**, and **Microtask Queue** across the three main parts of your code:

1. **Synchronous Initialization** (Global code execution and registering the timers).
2. **Callback Example Completion** (Timer #1 completing after 500ms).
3. **Promise & Async/Await Completion** (Timer #2 and Timer #3 completing, resolving promises, and executing microtasks).

---

## Step 1: Global Execution Context (The Start)

When the script starts running, the `Global()` Execution Context is created and pushed onto the Call Stack.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ Global()                                   │ ← Currently Active
└────────────────────────────────────────────┘

```

### Web API & Task Queues

* **Web API:** Empty
* **Task Queue:** Empty
* **Micro Task Queue:** Empty

---

## Step 2: Callback Example Begins

The first function call in the global scope is `findUserWithCallback(3, onUserFound)`.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithCallback(3, onUserFound)       │ ← Active Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

---

## Step 3: Registering the Callback Timer

Inside `findUserWithCallback`, `setTimeout` is called. The environment (Browser/Node.js Web API) registers a **500ms** timer in the background.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithCallback(3, onUserFound)       │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

### Web API

```text
┌────────────────────────────────────────────┐
│ Timer #1 (500ms)                           │
├────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(3, cb)       │
└────────────────────────────────────────────┘

```

---

## Step 4: Callback Function Cleanup

`findUserWithCallback` completes its execution and is popped off the Call Stack.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ Global()                                   │
└────────────────────────────────────────────┘

```

*(Timer #1 continues running in the Web API background)*

---

## Step 5: Promise Example Begins

Next, the global execution reaches the `findUserWithPromise(3)` statement.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithPromise(3)                     │ ← Active Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

---

## Step 6: Executing the Promise Executor

`findUserWithPromise` instantiates a new `Promise` object. The **Promise Executor Function** (i.e., `(resolve, reject) => handlePromiseTimer(...)`) is always executed **Synchronously** (immediately).

### Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous (Executor Function)              │ ← Active Function
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

---

## Step 7: Registering the Promise Timer

The Executor calls `handlePromiseTimer`, which contains another `setTimeout`. This second timer (Timer #2) is registered in the Web API.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ handlePromiseTimer(resolve, reject, 3)     │
├────────────────────────────────────────────┤
│ anonymous (Executor Function)              │
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

### Web API

```text
┌────────────────────────────────────────────┐
│ Timer #1 (500ms) - Callback version        │
├────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(3, cb)       │
├────────────────────────────────────────────┤
│ Timer #2 (500ms) - Promise version         │
├────────────────────────────────────────────┤
│ () => onPromiseTimerComplete(res, rej, 3)  │
└────────────────────────────────────────────┘

```

---

## Step 8: Promise Cleanup

The Executor, `handlePromiseTimer`, and `findUserWithPromise` complete and pop off the stack. At this point, `.then()` and `.catch()` are registered with the promise to be executed when it resolves or rejects.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ Global()                                   │
└────────────────────────────────────────────┘

```

---

## Step 9: Async/Await Example Begins

The final synchronous call in the global execution context is `findUserWithAsyncAwait(3)`.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithAsyncAwait(3)                  │ ← Active Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

---

## Step 10: Await and the Third Timer

Inside `findUserWithAsyncAwait`, the expression `await findUserWithPromise(3)` is executed. This fires off `findUserWithPromise`, registering a third timer (Timer #3) in the background.

As soon as JavaScript encounters the `await` keyword, **it suspends the execution of `findUserWithAsyncAwait**`, yielding control back to the global execution context.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithAsyncAwait(3) [Suspended]      │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘

```

### Web API

```text
┌────────────────────────────────────────────┐
│ Timer #1 (500ms) - Callback                │
├────────────────────────────────────────────┤
│ Timer #2 (500ms) - Promise                 │
├────────────────────────────────────────────┤
│ Timer #3 (500ms) - Async/Await             │
└────────────────────────────────────────────┘

```

---

## Step 11: End of Synchronous Script Execution

There are no more statements left in the global scope. `Global()` pops off the Call Stack. The stack is now completely empty.

### Call Stack

```text
┌────────────────────────────────────────────┐
│                                            │ ← Empty
└────────────────────────────────────────────┘

```

*(The JavaScript engine now waits for the background asynchronous timers to finish)*

---

## Step 12: Timers Complete (Moving to the Task Queue)

After approximately 500ms, all three timers expire. The Web API environment pushes their respective callback functions into the **Task Queue (Macrotask Queue)**.

### Task Queue

```text
┌────────────────────────────────────────────────────────────┐
│ 1. () => onCallbackTimerComplete(3, onUserFound)           │
├────────────────────────────────────────────────────────────┤
│ 2. () => onPromiseTimerComplete(resolve, reject, 3)        │
├────────────────────────────────────────────────────────────┤
│ 3. () => onPromiseTimerComplete(resolve, reject, 3)        │
└────────────────────────────────────────────────────────────┘

```

---

## Step 13: Executing the Callback Example (Task 1)

The Event Loop detects that the Call Stack is empty. It takes the first task from the Task Queue (the callback timer) and pushes it onto the Call Stack.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ onCallbackTimerComplete(3, onUserFound)    │ ← Active Task
└────────────────────────────────────────────┘

```

---

## Step 14: Processing Callback and Finding User

Inside `onCallbackTimerComplete`, `users.find()` executes synchronously and locates the user (ID: 3, Roman). The `onUserFound` callback is then invoked.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ onUserFound(null, user)                    │ ← Currently Active
├────────────────────────────────────────────┤
│ onCallbackTimerComplete(3, onUserFound)    │
└────────────────────────────────────────────┘

```

**Console Output:**

> `callback result: 3 roman user`

Both functions complete, return, and are popped off the Call Stack, leaving it empty again.

---

## Step 15: Executing the Promise Example (Task 2)

With the Call Stack clear, the Event Loop takes the next macrotask (Timer #2's callback) from the Task Queue and executes it.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ onPromiseTimerComplete(res, rej, 3)        │ ← Active Task
└────────────────────────────────────────────┘

```

---

## Step 16: Resolving the Promise and Scheduling the Microtask

`onPromiseTimerComplete` finds the user and invokes `handlePromiseResult`, which triggers `resolve(user)`.

Resolving the promise immediately schedules its `.then()` callback in the **Microtask Queue**.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ handlePromiseResult(res, rej, null, user)  │
├────────────────────────────────────────────┤
│ onPromiseTimerComplete(res, rej, 3)        │
└────────────────────────────────────────────┘

```

### Micro Task Queue

```text
┌────────────────────────────────────────────┐
│ Promise #1 .then() Callback                │ ← Microtask Scheduled
└────────────────────────────────────────────┘

```

---

## Step 17: Clearing the Microtask Queue (High Priority)

Once `onPromiseTimerComplete` finishes and pops off the stack, the Event Loop checks the **Microtask Queue** before moving to any other macrotasks. Microtasks have higher execution priority.

The `.then()` callback is popped from the Microtask Queue and pushed onto the Call Stack.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous (.then() Callback)               │ ← Active Microtask
└────────────────────────────────────────────┘

```

**Console Output:**

> `promise result: 3 roman user`

The callback returns, leaving the Call Stack empty.

---

## Step 18: Executing the Async/Await Example (Task 3)

The Event Loop picks up the final macrotask (Timer #3's callback) from the Task Queue and executes it.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ onPromiseTimerComplete(res, rej, 3)        │ ← Active Task
└────────────────────────────────────────────┘

```

---

## Step 19: Resolving the Async/Await Promise

This task successfully retrieves the user and calls `resolve(user)`. Because `findUserWithAsyncAwait` was suspended awaiting this exact promise, the process to resume the async function is queued as a **Microtask**.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ handlePromiseResult(res, rej, null, user)  │
├────────────────────────────────────────────┤
│ onPromiseTimerComplete(res, rej, 3)        │
└────────────────────────────────────────────┘

```

### Micro Task Queue

```text
┌────────────────────────────────────────────┐
│ Resume findUserWithAsyncAwait              │ ← Async Resume Microtask
└────────────────────────────────────────────┘

```

---

## Step 20: Resuming the Async Function (Final Step)

The Call Stack becomes empty. The Event Loop immediately executes the pending microtask, resuming the execution of `findUserWithAsyncAwait` right from where it was suspended.

### Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithAsyncAwait(3) [Resumed]        │ ← Active Microtask
└────────────────────────────────────────────┘

```

**Console Output:**

> `async/await result: 3 roman user`

The function runs to completion and is popped off the Call Stack.

---

## Final Program State

All tasks, microtasks, and background timers have been executed and processed. The program has finished running.

* **Call Stack:** Empty
* **Task Queue:** Empty
* **Micro Task Queue:** Empty
* **Web API:** Empty

---