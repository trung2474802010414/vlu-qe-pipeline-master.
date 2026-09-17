```javascript
function login(username, password) {
    // Tài khoản bị khóa
    if (username === "locked") {
        throw new Error("Tài khoản đã bị khóa");
    }

    // Username rỗng
    if (!username) {
        throw new Error("Username không được để trống");
    }

    // Mật khẩu rỗng
    if (!password) {
        throw new Error("Password không được để trống");
    }

    // Mật khẩu chứa ký tự đặc biệt
    if (/[^a-zA-Z0-9]/.test(password)) {
        throw new Error("Mật khẩu chứa ký tự đặc biệt");
    }

    // Kiểm tra tài khoản và mật khẩu
    if (username === "admin" && password === "123") {
        return true;
    }

    // Mật khẩu sai
    throw new Error("Sai username hoặc password");
}

module.exports = { login };
```

### 2. `package.json`

```json
{
  "name": "auth-jest-test",
  "version": "1.0.0",
  "description": "Unit Test Login bằng Jest",
  "main": "auth.js",
  "scripts": {
    "test:smoke": "jest auth.smoke.test.js",
    "test:regression": "jest auth.regression.test.js"
  },
  "devDependencies": {
    "jest": "^30.0.0"
  }
}
```

### 3. `auth.smoke.test.js`

Chỉ có **1 Unit Test** cho trường hợp đăng nhập đúng `admin/123`.

```javascript
const { login } = require("./auth");

test("Smoke Test - Đăng nhập đúng admin/123", () => {
    expect(login("admin", "123")).toBe(true);
});
```

### 4. `auth.regression.test.js`

File này kiểm tra các trường hợp ngoại lệ: mật khẩu sai, username rỗng, mật khẩu rỗng, mật khẩu có ký tự đặc biệt và tài khoản bị khóa.

```javascript
const { login } = require("./auth");

// 1. Mật khẩu sai
test("Regression - Mật khẩu sai", () => {
    expect(() => login("admin", "456"))
        .toThrow("Sai username hoặc password");
});

// 2. Username rỗng
test("Regression - Username rỗng", () => {
    expect(() => login("", "123"))
        .toThrow("Username không được để trống");
});

// 3. Mật khẩu rỗng
test("Regression - Mật khẩu rỗng", () => {
    expect(() => login("admin", ""))
        .toThrow("Password không được để trống");
});

// 4. Mật khẩu chứa ký tự đặc biệt
test("Regression - Mật khẩu chứa ký tự đặc biệt", () => {
    expect(() => login("admin", "123@"))
        .toThrow("Mật khẩu chứa ký tự đặc biệt");
});

// 5. Tài khoản bị khóa
test("Regression - Tài khoản bị khóa", () => {
    expect(() => login("locked", "123"))
        .toThrow("Tài khoản đã bị khóa");
});
```

### Cấu trúc thư mục

```text
auth-jest-test/
│
├── auth.js
├── auth.smoke.test.js
├── auth.regression.test.js
└── package.json
```

### Chạy test

Mở Terminal tại thư mục dự án:

```bash
npm install
```

Chạy **Smoke Test**:

```bash
npm run test:smoke
```

Chạy **Regression Test**:

```bash
npm run test:regression
```

Kết quả mong đợi:

```text
Smoke Test:
✓ Đăng nhập đúng admin/123

Regression Test:
✓ Mật khẩu sai
✓ Username rỗng
✓ Mật khẩu rỗng
✓ Mật khẩu chứa ký tự đặc biệt
✓ Tài khoản bị khóa
```

Cách này cũng phù hợp để bạn trình bày rằng **Smoke Test kiểm tra chức năng cốt lõi sau khi build**, còn **Regression Test kiểm tra lại nhiều trường hợp lỗi/ngoại lệ của chức năng đăng nhập**.
