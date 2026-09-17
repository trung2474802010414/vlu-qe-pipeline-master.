function login(username, password) { // Tài khoản bị khóa if (username === "locked") { throw new Error("Tài khoản đã bị khóa"); } // Username rỗng if (!username) { throw new Error("Username không được để trống"); } // Mật khẩu rỗng if (!password) { throw new Error("Password không được để trống"); } // Mật khẩu chứa ký tự đặc biệt if (/[^a-zA-Z0-9]/.test(password)) { throw new Error("Mật khẩu chứa ký tự đặc biệt"); } // Kiểm tra tài khoản và mật khẩu if (username === "admin" && password === "123") { return true; } // Mật khẩu sai throw new Error("Sai username hoặc password"); } module.exports = { login };// Kiểm tra thông tin đăng nhập hợp lệ
if (username === "admin" && password === "999") {
    return true;
}
