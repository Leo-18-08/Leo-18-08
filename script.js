function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// --- Đăng ký ---
function handleSignup(e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPass").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!name || !email || !pass) return alert("Vui lòng nhập đầy đủ thông tin!");
  if (pass !== confirm) return alert("Mật khẩu không trùng khớp!");

  const users = getUsers();

  // Kiểm tra trùng email
  if (users.find(u => u.email === email)) {
    return alert("Email đã được đăng ký!");
  }

  users.push({ name, email, pass });
  saveUsers(users);

  alert("Đăng ký thành công! Hãy đăng nhập.");
  window.location.href = "login.html";
}

// --- Đăng nhập ---
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;

  const users = getUsers();
  const found = users.find(u => u.email === email && u.pass === pass);

  if (!found) {
    alert("Sai email hoặc mật khẩu!");
    return;
  }

  // Lưu người dùng hiện tại
  localStorage.setItem("currentUser", JSON.stringify(found));
  alert(`Xin chào ${found.name}!`);
  window.location.href = "index.html";
}

// --- Đăng xuất ---
function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất!");
  window.location.href = "index.html";
}

// --- Hiển thị tên người dùng trên navbar (nếu đã đăng nhập) ---
function showUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userBox = document.getElementById("userBox");

  if (user && userBox) {
    loginBtn?.classList.add("d-none");
    signupBtn?.classList.add("d-none");
    userBox.innerHTML = `
      <span class="text-white me-2">Hi, ${user.name}</span>
      <button class="btn btn-sm btn-outline-light" onclick="logout()">Đăng xuất</button>
    `;
  }
}

// --- Khởi động ---
document.addEventListener("DOMContentLoaded", () => {
  showUser();

  // Nếu là trang signup
  const signupForm = document.getElementById("signupForm");
  if (signupForm) signupForm.addEventListener("submit", handleSignup);

  // Nếu là trang login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
});

console.log("✅ script.js loaded!");