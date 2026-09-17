File này kiểm tra các trường hợp ngoại lệ: mật khẩu sai, username rỗng, mật khẩu rỗng, mật khẩu có ký tự đặc biệt và tài khoản bị khóa.

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
