# Async/Await Output Practice Questions

---

## Question 1

```ts
async function test() 
{
    console.log("A");

    await Promise.resolve();

    console.log("B");
}

console.log("C");

test();

console.log("D");
```

### Output

```text
C
A
D
B
```

---

## Question 2

```ts
async function test() 
{
    console.log(1);

    const value = await Promise.resolve(100);

    console.log(value);

    console.log(2);
}

console.log(0);

test();

Promise.resolve().then(() => 
{
    console.log(3);
});

console.log(4);
```

### Output

```text
0
1
4
100
2
3
```

---

## Question 3

```ts
async function test() 
{
    console.log("A");

    await Promise.resolve();

    console.log("B");
}

setTimeout(() => 
{
    console.log("C");
}, 0);

test();

console.log("D");
```

### Output

```text
A
D
B
C
```

---

## Question 4

```ts
async function first() 
{
    console.log(1);

    await Promise.resolve();

    console.log(2);
}

async function second() 
{
    console.log(3);

    await Promise.resolve();

    console.log(4);
}

first();

second();

console.log(5);
```

### Output

```text
1
3
5
2
4
```

---

## Question 5

```ts
async function test() 
{
    console.log("A");

    setTimeout(() => 
    {
        console.log("B");
    }, 0);

    await Promise.resolve();

    console.log("C");

    setTimeout(() => 
    {
        console.log("D");
    }, 0);
}

test();

console.log("E");
```

### Output

```text
A
E
C
B
D
```

---

## Question 6 (Bonus)

```ts
async function foo() 
{
    console.log(1);

    await Promise.resolve();

    console.log(2);

    Promise.resolve().then(() => 
    {
        console.log(3);
    });

    console.log(4);
}

console.log(0);

foo();

Promise.resolve().then(() => 
{
    console.log(5);
});

console.log(6);
```

### Output

```text
0
1
6
2
4
5
3
```