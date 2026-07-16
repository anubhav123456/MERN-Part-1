# Node.js `path` Module

## 1. What is the `path` module in Node.js?

**Answer:**

The `path` module is a built-in Node.js module used to work with file and directory paths.

It helps you:

* Build file paths
* Read parts of a path
* Get file names
* Get file extensions
* Get parent directories
* Create OS-independent paths

---

## 2. Do we need to install the `path` module?

**Answer:**

No.

`path` is a built-in Node.js module and can be imported directly.

```javascript
import path from "node:path";
```

---

# `path.join()`

## 3. What is `path.join()`?

**Answer:**

`path.join()` combines multiple path segments into a single valid file path.

It automatically uses the correct path separator for the current operating system.

Example:

```javascript
const fullPath = path.join("uploads", "users", "42", "profile.png");
```

---

## 4. Why should we use `path.join()` instead of string concatenation?

**Answer:**

Using string concatenation can create incorrect paths on different operating systems.

Example (Not Recommended):

```javascript
const filePath = projectRoot + "/uploads/" + filename;
```

Using `path.join()`:

```javascript
const filePath = path.join(projectRoot, "uploads", filename);
```

It automatically uses:

* `/` on Linux/macOS
* `\` on Windows

making your code cross-platform.

---

## 5. Does `path.join()` create folders or files?

**Answer:**

No.

`path.join()` only creates a **path string**.

It does **not**:

* Create directories
* Create files
* Check whether the file exists

It simply returns a properly formatted path.

---

## 6. Example of `path.join()`

```javascript
const uploadPath = path.join(
    projectRoot,
    "uploads",
    "users",
    "42",
    "profile.png"
);

console.log(uploadPath);
```

Possible Output (Windows):

```text
C:\Projects\MyApp\uploads\users\42\profile.png
```

Possible Output (Linux/macOS):

```text
/Users/anubhav/MyApp/uploads/users/42/profile.png
```

---

# `process.cwd()`

## 7. What is `process.cwd()`?

**Answer:**

`process.cwd()` returns the **current working directory**, which is the folder from where the Node.js process was started.

Example:

```javascript
const projectRoot = process.cwd();

console.log(projectRoot);
```

Example Output:

```text
C:\Projects\NodeApp
```

---

## 8. Why is `process.cwd()` useful?

**Answer:**

It is useful for creating absolute paths relative to the project folder.

Example:

```javascript
const uploadPath = path.join(
    process.cwd(),
    "uploads",
    "image.png"
);
```

---

# `path.basename()`

## 9. What is `path.basename()`?

**Answer:**

`path.basename()` returns the **last part of a file path**, usually the file name.

Example:

```javascript
const fileName = path.basename(uploadFilePath);
```

Suppose:

```text
C:\Projects\uploads\users\42\profile.photo.png
```

Output:

```text
profile.photo.png
```

---

## 10. Where is `path.basename()` commonly used?

**Answer:**

It is commonly used for:

* Displaying file names
* Logging uploaded files
* Extracting file names from full paths

---

# `path.extname()`

## 11. What is `path.extname()`?

**Answer:**

`path.extname()` returns the **file extension**, including the dot (`.`).

Example:

```javascript
const extension = path.extname(uploadFilePath);
```

Output:

```text
.png
```

---

## 12. What happens if a file has multiple dots?

Example:

```text
profile.photo.png
```

```javascript
path.extname("profile.photo.png");
```

Output:

```text
.png
```

Only the **last extension** is returned.

---

## 13. Where is `path.extname()` commonly used?

**Answer:**

It is useful for:

* Validating uploaded files
* Checking image types
* Checking document formats
* Filtering files by extension

---

# `path.dirname()`

## 14. What is `path.dirname()`?

**Answer:**

`path.dirname()` returns the **parent directory** of a given path.

Example:

```javascript
const parentFolder = path.dirname(uploadFilePath);
```

Suppose the path is:

```text
C:\Projects\uploads\users\42\profile.photo.png
```

Output:

```text
C:\Projects\uploads\users\42
```

---

## 15. Where is `path.dirname()` commonly used?

**Answer:**

It is commonly used for:

* Finding a file's parent folder
* Creating directories before saving files
* Logging directory locations
* File management tasks

---

# Practical Example

Suppose:

```javascript
const uploadFilePath =
"C:\\Projects\\NodeApp\\uploads\\users\\42\\profile.photo.png";
```

Then:

```javascript
path.basename(uploadFilePath);
```

Output:

```text
profile.photo.png
```

---

```javascript
path.extname(uploadFilePath);
```

Output:

```text
.png
```

---

```javascript
path.dirname(uploadFilePath);
```

Output:

```text
C:\Projects\NodeApp\uploads\users\42
```

---

# 16. Why is the `path` module important?

**Answer:**

The `path` module helps developers:

* Build file paths safely
* Write cross-platform code
* Extract file names
* Extract file extensions
* Find parent directories
* Avoid path separator issues (`/` vs `\`)

---

