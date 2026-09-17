Chỉ có 1 Unit Test cho trường hợp đăng nhập đúng admin/123.

const { login } = require("./auth");

test("Smoke Test - Đăng nhập đúng admin/123", () => {
    expect(login("admin", "123")).toBe(true);
});
