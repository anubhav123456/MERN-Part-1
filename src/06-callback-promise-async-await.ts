interface User { id: number; name: string; role: string; };

interface UserCallback { (error: Error | null, user: User | null): void };

interface ResolveCallback { (user: User): void; };

interface RejectCallback { (error: Error): void; };

const users:User[] = [
    { id: 1, name: "anubhav", role: "super-admin", },
    { id: 2, name: "john", role: "user", },
    { id: 3, name: "roman", role: "user", },
];

function matchUserById(currentUser: User, userId: number): boolean
{
    return currentUser.id === userId;
}

function onUserFound(error: Error | null, user: User | null): void
{
    if (error) 
    {
        console.log("callback error:", error.message);
        return;
    }

    console.log("callback result:", user?.id, user?.name, user?.role)
}

function onCallbackTimerComplete(userId:number, cb: UserCallback): void
{
    const user = users.find((currentUser) => matchUserById(currentUser, userId));

    if (!user)
    {
        cb(new Error(`User with id ${userId} was not found`), null);
        return;
    }

    cb(null, user);
}


function handlePromiseResult(resolve: ResolveCallback, reject:RejectCallback, error:Error | null, user: User | null) : void 
{
    if (error) 
    {
        reject(error);
        return;
    }

    resolve(user!)
    return;
}

function onPromiseTimerComplete(resolve:ResolveCallback, reject:RejectCallback, userId: number): void
{
    const user = users.find((currentUser) => matchUserById(currentUser, userId));
    
    if(!user)
    {
        const error = new Error(`User with id ${userId} was not found`);
        return handlePromiseResult(resolve, reject, error, null);
    }
    
    return handlePromiseResult(resolve, reject, null, user);
}


function handlePromiseTimer(resolve:ResolveCallback, reject:RejectCallback, userId:number): void
{
    setTimeout(() => onPromiseTimerComplete(resolve, reject, userId), 500);
}



// Callback version
function findUserWithCallback(userId:number, cb:UserCallback): void 
{
    setTimeout(()=> onCallbackTimerComplete(userId, cb), 500);
}

//
function findUserWithPromise(userId: number) 
{
    return new Promise<User>((resolve, reject)=>  handlePromiseTimer(resolve, reject, userId));
}

async function findUserWithAsyncAwait(userId: number):Promise<void> 
{
    try 
    {
        const user = await findUserWithPromise(userId);
        console.log("async/await result:", user.id, user.name, user.role);
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            console.log("async/await error:", error.message);
        }
    }
}


// ----------------------------
// Callback Example
// ----------------------------
findUserWithCallback(3, onUserFound);

// ----------------------------
// Promise Example
// ----------------------------
findUserWithPromise(3)
    .then((user: User) => 
    {
        console.log("promise result:", user.id, user.name, user.role);
    })
    .catch((error: Error) => 
    {
        console.log("promise error:", error.message);
    });

// ----------------------------
// Async Await Example
// ----------------------------
findUserWithAsyncAwait(3)