# JavaScript Callback, Promises & Async/Await

## Q1
```js
console.log("Start");

setTimeout(()=>console.log("Timeout"),0);

console.log("End");
```
**Output**
```text
Start
End
Timeout
```

## Q2
```js
console.log(1);

setTimeout(()=>console.log(2),1000);

setTimeout(()=>console.log(3),0);

console.log(4);
```
**Output**
```text
1
4
3
2
```

## Q3
```js
for (var i=0;i<3;i++)
{
    setTimeout(()=>console.log(i),100);
}
```
**Output**
```text
3
3
3
```

## Q4
```js
for (let i=0;i<3;i++)
{
    setTimeout(()=>console.log(i),100);
}
```
**Output**
```text
0
1
2
```

## Q5
```js
console.log("Start");

Promise.resolve().then(()=>console.log("Promise"));

console.log("End");
```
**Output**
```text
Start
End
Promise
```

## Q6
```js
console.log(1);

Promise.resolve().then(()=>console.log(2));

console.log(3);

Promise.resolve().then(()=>console.log(4));
```
**Output**
```text
1
3
2
4
```

## Q7
```js
console.log("A");

setTimeout(()=>console.log("B"),0);

Promise.resolve().then(()=>console.log("C"));

console.log("D");
```
**Output**
```text
A
D
C
B
```

## Q8
```js
Promise.resolve().then(()=>console.log(1)).then(()=>console.log(2)).then(()=>console.log(3));

console.log(4);
```
**Output**
```text
4
1
2
3
```

## Q9
```js
Promise.resolve(10)
    .then((x)=>
    {
        console.log(x);return x*2;
    })
    .then((x)=>
    {
        console.log(x);
        return x+5;
    })
    .then((x)=>
    {
        console.log(x)
    });
```
**Output**
```text
10
20
25
```

## Q10
```js
Promise.resolve().then(()=>{throw new Error("Oops");}).catch(()=>console.log("Caught")).then(()=>console.log("Done"));
```
**Output**
```text
Caught
Done
```

## Q11
```js
Promise.resolve().then(()=>{console.log(1);return Promise.resolve(2);}).then(v=>console.log(v));
```
**Output**
```text
1
2
```

## Q12
```js
async function test(){console.log(1);await Promise.resolve();console.log(2);}
console.log(3);test();console.log(4);
```
**Output**
```text
3
1
4
2
```

## Q13
```js
async function test(){console.log("A");await Promise.resolve();console.log("B");}
test();console.log("C");
```
**Output**
```text
A
C
B
```

## Q14
```js
async function test(){return 100;}
test().then(console.log);
console.log(200);
```
**Output**
```text
200
100
```

## Q15
```js
async function test(){console.log(1);await Promise.resolve();console.log(2);await Promise.resolve();console.log(3);}
console.log(4);test();console.log(5);
```
**Output**
```text
4
1
5
2
3
```

## Q16
```js
console.log("Start");setTimeout(()=>console.log("Timeout"),0);Promise.resolve().then(()=>console.log("Promise"));console.log("End");
```
**Output**
```text
Start
End
Promise
Timeout
```

## Q17
```js
console.log(1);setTimeout(()=>console.log(2),0);Promise.resolve().then(()=>console.log(3));Promise.resolve().then(()=>console.log(4));console.log(5);
```
**Output**
```text
1
5
3
4
2
```

## Q18
```js
console.log("A");
setTimeout(()=>{console.log("B");Promise.resolve().then(()=>console.log("C"));},0);
Promise.resolve().then(()=>console.log("D"));
console.log("E");
```
**Output**
```text
A
E
D
B
C
```

## Q19
```js
async function foo(){console.log(1);await Promise.resolve();console.log(2);}
console.log(3);setTimeout(()=>console.log(4),0);foo();Promise.resolve().then(()=>console.log(5));console.log(6);
```
**Output**
```text
3
1
6
2
5
4
```

## Q20
```js
console.log(1);
setTimeout(()=>console.log(2),0);
Promise.resolve().then(()=>console.log(3)).then(()=>console.log(4));
async function test(){console.log(5);await Promise.resolve();console.log(6);}
test();
console.log(7);
```
**Output**
```text
1
5
7
3
6
4
2
```

## Q21
```js
console.log("Start");
setTimeout(()=>{console.log("Timeout 1");Promise.resolve().then(()=>console.log("Promise inside Timeout"));},0);
Promise.resolve().then(()=>console.log("Promise 1")).then(()=>console.log("Promise 2"));
console.log("End");
```
**Output**
```text
Start
End
Promise 1
Promise 2
Timeout 1
Promise inside Timeout
```

## Q22
```js
async function foo(){console.log("A");await bar();console.log("B");}
async function bar(){console.log("C");}
console.log("D");foo();console.log("E");
```
**Output**
```text
D
A
C
E
B
```

## Q23
```js
console.log(1);
setTimeout(()=>{console.log(2);Promise.resolve().then(()=>console.log(3));},0);
Promise.resolve().then(()=>{console.log(4);setTimeout(()=>console.log(5),0);});
console.log(6);
```
**Output**
```text
1
6
4
2
3
5
```

## Q24
```js
async function test(){console.log(1);await Promise.resolve();console.log(2);setTimeout(()=>console.log(3),0);await Promise.resolve();console.log(4);}
console.log(5);test();Promise.resolve().then(()=>console.log(6));console.log(7);
```
**Output**
```text
5
1
7
2
6
4
3
```

## Q25
```js
console.log("A");
setTimeout(()=>{console.log("B");Promise.resolve().then(()=>console.log("C"));setTimeout(()=>console.log("D"),0);},0);
Promise.resolve().then(()=>{console.log("E");setTimeout(()=>console.log("F"),0);Promise.resolve().then(()=>console.log("G"));});
console.log("H");
```
**Output**
```text
A
H
E
G
B
C
F
D
```
