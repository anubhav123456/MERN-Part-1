# Node.js `crypto` Module

## 1. What is the `crypto` module in Node.js?

**Answer:**
The `crypto` module is a built-in Node.js module used for performing security-related operations.

It is commonly used for:

* Creating random UUIDs and IDs
* Generating secure tokens
* Hashing data
* Verifying that data has not been modified
* Encrypting and decrypting data

---

## 2. Do we need to install the `crypto` module?

**Answer:**
No.

`crypto` is a built-in Node.js module, so it can be imported directly.

```javascript
import crypto from "node:crypto";
```

---

# crypto.randomUUID()

## 3. What is `crypto.randomUUID()`?

**Answer:**
`crypto.randomUUID()` generates a unique random UUID (Universally Unique Identifier).

Example:

```javascript
const requestId = crypto.randomUUID();
console.log(requestId);
```

Example Output:

```
5dc84ef9-f2d8-45b8-a81e-7b4e3a6b1d1a
```

---

## 4. Where is `randomUUID()` used?

**Answer:**

It is commonly used for:

* User IDs
* Order IDs
* Session IDs
* Request IDs
* Transaction IDs

---

## 5. Why do we use UUID instead of normal numbers?

**Answer:**

Because UUIDs are extremely unlikely to repeat, making them safe for uniquely identifying resources across systems.

---

# crypto.randomBytes()

## 6. What is `crypto.randomBytes()`?

**Answer:**

`crypto.randomBytes()` generates cryptographically secure random bytes.

Example:

```javascript
const resetToken = crypto.randomBytes(16).toString("hex");
```

---

## 7. Why is `.toString("hex")` used?

**Answer:**

`randomBytes()` returns a Buffer.

Using:

```javascript
.toString("hex")
```

converts the Buffer into a readable hexadecimal string.

---

## 8. Why is `16` passed to `randomBytes()`?

**Answer:**

`16` means generate **16 random bytes**.

Each byte becomes **2 hexadecimal characters**, so:

```
16 bytes = 32 hexadecimal characters
```

Example:

```
a94bc83fd913bca42c9efb5d8131ef11
```

---

## 9. Where are random tokens used?

**Answer:**

Random tokens are commonly used for:

* Password reset tokens
* Email verification tokens
* Session secrets
* API keys
* Authentication tokens

---

# crypto.createHash()

## 10. What is hashing?

**Answer:**

Hashing is the process of converting data into a fixed-length string called a hash.

Example:

```
hello node
↓

8f8f9d...
```

---

## 11. How do we create a hash in Node.js?

**Answer:**

Example:

```javascript
const hash = crypto
    .createHash("sha256")
    .update(text)
    .digest("hex");
```

---

## 12. What does `createHash("sha256")` mean?

**Answer:**

It creates a SHA-256 hashing algorithm.

SHA-256 always produces a **256-bit (32-byte)** hash.

---

## 13. What does `.update()` do?

**Answer:**

`.update()` provides the data that needs to be hashed.

Example:

```javascript
.update("hello node")
```

---

## 14. What does `.digest("hex")` do?

**Answer:**

It completes the hashing process and returns the hash as a hexadecimal string.

---

## 15. Can we convert a hash back to the original text?

**Answer:**

No.

Hashing is a **one-way process**.

Example:

```
hello
↓

2cf24dba...
```

You **cannot** convert it back to `"hello"`.

---

## 16. Where is hashing used?

**Answer:**

Hashing is commonly used for:

* Password storage
* File integrity verification
* Digital signatures
* Blockchain
* Data verification

---

# crypto.createHmac()

## 17. What is HMAC?

**Answer:**

HMAC stands for **Hash-based Message Authentication Code**.

It creates a hash using both:

* the data
* a secret key

Formula:

```
HMAC = Data + Secret Key → Signed Hash
```

---

## 18. What is the difference between Hash and HMAC?

| Hash                   | HMAC                                             |
| ---------------------- | ------------------------------------------------ |
| Uses only data         | Uses data + secret key                           |
| Anyone can generate it | Only someone with the secret key can generate it |
| Used for integrity     | Used for integrity + authentication              |

---

## 19. How do we create an HMAC?

**Answer:**

Example:

```javascript
const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");
```

---

## 20. Why do we pass a secret key?

**Answer:**

The secret key ensures that only trusted parties can generate or verify the HMAC.

If the secret changes, the generated HMAC also changes.

---

## 21. Where is HMAC used?

**Answer:**

HMAC is commonly used for:

* Webhooks
* Signed tokens
* API request verification
* Message authentication
* Secure communication

---

## 22. How is an HMAC verified?

**Answer:**

Generate the HMAC again using the same:

* message
* secret key

Then compare it with the received HMAC.

Example:

```javascript
const signatureVerify = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

console.log(signature === signatureVerify);
```

If both signatures are equal:

```
true
```

the data has not been modified and the sender is authenticated.

---

# 23. What happens if the message changes?

**Answer:**

Even a tiny change in the message produces a completely different hash/HMAC.

Example:

```
user_id=1
↓

abc123...
```

```
user_id=2
↓

f9d7ae...
```

The signatures will not match.

---

# 24. What happens if the secret key changes?

**Answer:**

The generated HMAC will also change completely.

This prevents attackers from creating valid signatures without knowing the secret key.

---

# 25. Summary

| Function               | Purpose                                         | Common Uses                                                       |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| `crypto.randomUUID()`  | Generates a unique UUID                         | User IDs, Order IDs, Session IDs                                  |
| `crypto.randomBytes()` | Generates cryptographically secure random bytes | Password reset tokens, Email verification, API keys               |
| `crypto.createHash()`  | Creates a one-way hash                          | Password hashing, File integrity, Data verification               |
| `crypto.createHmac()`  | Creates a hash using data + secret key          | Webhooks, Signed tokens, API authentication, Message verification |

---