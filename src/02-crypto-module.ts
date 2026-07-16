import crypto from "node:crypto";

const requestId = crypto.randomUUID();
console.log(requestId);


const resetToken = crypto.randomBytes(16).toString("hex");
console.log(resetToken);

const text = "hello node";

const hash = crypto.createHash("sha256").update(text).digest("hex");
console.log(hash);


const secret = "my-super-secret-key";
const message = "user_id=1";

const signature = crypto.createHmac("sha256", secret).update(message).digest("hex");

console.log(signature);

const signatureVerify = crypto.createHmac("sha256", secret).update(message).digest("hex");

console.log("signature is valid and matching", signature === signatureVerify);