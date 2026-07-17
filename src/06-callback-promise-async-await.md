# Step 1

## Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithCallback(3, onUserFound)       │ ← Current Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer (500ms)                                              │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

---

# Step 2

## Call Stack

```text
┌────────────────────────────────────────────┐
│                                            │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer (500ms)                                              │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

---

# Step 3

## Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithPromise(3)                     │ ← Current Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer (500ms)                                              │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 4

## Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous                                  │ ← Promise Executor
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer (500ms)                                              │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 5

## Call Stack

```text
┌────────────────────────────────────────────┐
│ handlePromiseTimer(resolve, reject, 3)     │ ← Current Function
├────────────────────────────────────────────┤
│ anonymous                                  │ ← Promise Executor
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer (500ms)                                              │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 6

## Call Stack

```text
┌────────────────────────────────────────────┐
│ handlePromiseTimer(resolve, reject, 3)     │ ← Current Function
├────────────────────────────────────────────┤
│ anonymous                                  │ ← Promise Executor
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer #1 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
├────────────────────────────────────────────────────────────┤
│ Timer #2 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onPromiseTimerComplete(resolve, reject, userId)      │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
├──────────────────────────┤
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

---
# Step 7

## Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous                                  │ ← Promise Executor
├────────────────────────────────────────────┤
│ findUserWithPromise(3)                     │
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer #1 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
├────────────────────────────────────────────────────────────┤
│ Timer #2 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onPromiseTimerComplete(resolve, reject, userId)      │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
├──────────────────────────┤
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 8

## Call Stack

```text
┌────────────────────────────────────────────┐
│ findUserWithPromise(3)                     │ ← Current Function
├────────────────────────────────────────────┤
│ Global()                                   │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer #1 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
├────────────────────────────────────────────────────────────┤
│ Timer #2 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onPromiseTimerComplete(resolve, reject, userId)      │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
├──────────────────────────┤
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 9

## Call Stack

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────────────────────┐
│ Timer #1 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onCallbackTimerComplete(userId, cb)                  │
├────────────────────────────────────────────────────────────┤
│ Timer #2 (500ms)                                           │
├────────────────────────────────────────────────────────────┤
│ () => onPromiseTimerComplete(resolve, reject, userId)      │
└────────────────────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
├──────────────────────────┤
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 10

## Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous                                  │ ← Callback from setTimeout
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```

> **Note:** The callback version's timer has completed, so the Event Loop has pushed its callback onto the Call Stack. 
> The Promise version's timer has also completed, and its callback is now waiting in the Task Queue.

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 11

## Call Stack

```text
┌────────────────────────────────────────────┐
│ matchUserById(currentUser, userId)         │ ← Current Function
├────────────────────────────────────────────┤
│ anonymous                                  │ ← users.find() callback
├────────────────────────────────────────────┤
│ onCallbackTimerComplete(userId, cb)        │
├────────────────────────────────────────────┤
│ anonymous                                  │ ← setTimeout callback
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---
# Step 12

## Call Stack

```text
┌────────────────────────────────────────────┐
│ onUserFound(null, user)                    │ ← Current Function
├────────────────────────────────────────────┤
│ onCallbackTimerComplete(userId, cb)        │
├────────────────────────────────────────────┤
│ anonymous                                  │ ← setTimeout callback
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```


## Task Queue

```text
┌──────────────────────────┐
│ anonymous                │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```
---

# Step 13

## Call Stack

```text
┌────────────────────────────────────────────┐
│ anonymous                                  │ ← Current Function
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

---

### Explanation

- `onUserFound()` has finished executing and returned.
- `onCallbackTimerComplete()` has also finished and returned.
- Now only the timer callback's anonymous function remains on the Call Stack.

```js
() => onCallbackTimerComplete(userId, cb)
```

- After this anonymous function returns, the Call Stack becomes completely empty.
- The callback-based asynchronous flow is now fully completed.
- There are no pending tasks in the Task Queue and no pending microtasks in the Microtask Queue.

At this point, the Event Loop has finished processing the callback example and is ready to continue with any future asynchronous work.

---
# Step 14

## Call Stack

```text
┌────────────────────────────────────────────┐
│ matchUserById(userId)                      │ ← Current Function
├────────────────────────────────────────────┤
│ onPromiseTimerComplete(resolve, reject,    │
│ userId)                                    │
├────────────────────────────────────────────┤
│ anonymous                                  │
└────────────────────────────────────────────┘
```

## Web API

```text
┌────────────────────────────────────────────┐
│                                            │
└────────────────────────────────────────────┘
```

## Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

## Micro Task Queue

```text
┌──────────────────────────┐
│                          │
└──────────────────────────┘
```

---

### Explanation

- The callback example has completely finished.
- The Event Loop picked the **Promise timer callback** from the Task Queue.

```js
() => onPromiseTimerComplete(resolve, reject, userId)
```

- This anonymous function started executing and called:

```js
onPromiseTimerComplete(resolve, reject, userId);
```

- Inside `onPromiseTimerComplete()`, JavaScript searches for the requested user by calling:

```js
const user = matchUserById(userId);
```

- Therefore, the Call Stack becomes:

```text
matchUserById()
↓
onPromiseTimerComplete()
↓
anonymous
```

- `matchUserById()` is currently executing to find the user.
- The Task Queue is now empty because its only task has already been moved to the Call Stack.
- The Microtask Queue is still empty because the Promise has **not been resolved or rejected yet**.
---

