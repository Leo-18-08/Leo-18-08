const products = [
  {
    id: 1,
    name: "Áo phông Leon",
    price: "249.000đ",
    category: "tee",
    isNew: true,
    image: "image/aophongleon.png",
    description: "Chất cotton 2 chiều, logo Leon mới nhất."
  },
  {
    id: 2,
    name: "Hoodie Leon",
    price: "389.000đ",
    category: "hoodie",
    isNew: false,
    image: "image/aohoodie.png",
    description: "Form oversize, nỉ ngoại nhập mềm mịn."
  },
  {
    id: 3,
    name: "Áo phông Limited Edition",
    price: "279.000đ",
    category: "tee",
    isNew: false,
    image: "image/aophongleon.png",
    description: "Phiên bản giới hạn với hoạ tiết đặc biệt."
  },
  {
    id: 4,
    name: "Nón lưỡi trai",
    price: "189.000đ",
    category: "accessory",
    isNew: true,
    image: "image/non.png",
    description: "Chống nắng tốt, chất liệu cotton thoáng khí."
  },
  {
    id: 5,
    name: "Bình nước thể thao",
    price: "159.000đ",
    category: "accessory",
    isNew: false,
    image: "image/binhnuoc.png",
    description: "Dung tích 750ml, giữ nhiệt trong 18 giờ."
  },
  {
    id: 6,
    name: "Hoodie Neon Limited",
    price: "529.000đ",
    category: "hoodie",
    isNew: true,
    image: "image/aohoodie.png",
    description: "In chuyển nhiệt, phản quang nổi bật về đêm."
  },
  {
    id: 7,
    name: "Áo khoác bomber",
    price: "449.000đ",
    category: "hoodie",
    isNew: false,
    image: "image/aobomber.png",
    description: "Thiết kế 2 lớp, giữ ấm tốt khi di chuyển."
  },
  {
    id: 8,
    name: "Bộ sticker Leon",
    price: "49.000đ",
    category: "accessory",
    isNew: false,
    image: "image/sticker.png",
    description: "12 mẫu sticker 'Leon' chống thấm."
  }
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll("#categoryFilters button");
const accountMenu = document.getElementById("accountMenu");
const accountTrigger = document.getElementById("accountTrigger");
const searchTriggers = document.querySelectorAll("[data-search-trigger]");

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col-lg-3";

  col.innerHTML = `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-transparent text-uppercase text-secondary">${product.category}</span>
          ${product.isNew ? '<span class="badge badge-new">New</span>' : ""}
        </div>
        <h3 class="h5 mb-2">${product.name}</h3>
        <p class="text-secondary small mb-3">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="price-tag">${product.price}</span>
          <button class="btn btn-sm btn-primary rounded-pill" type="button">
            <i class="bi bi-bag-plus"></i> Thêm giỏ hàng
          </button> 
        </div>
      </div>
    </article>
  `;

  return col;
}

function renderProducts({ category = "all" } = {}) {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  // chỉ lọc theo category
  const filtered = products.filter(
    (product) => category === "all" || product.category === category
  );

  const fragment = document.createDocumentFragment();
  filtered.forEach((product) => fragment.appendChild(createProductCard(product)));
  productGrid.appendChild(fragment);
}


function handleFilterClick(event) {
  const button = event.currentTarget;
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  const category = button.dataset.category;
  renderProducts({ category, keyword: searchInput?.value || "" });
}


  
/* --------------------
 * Local storage
 * -------------------- */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// xử lý đăng ký
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPass").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!name || !email || !pass) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (pass !== confirm) {
    alert("Mật khẩu không trùng khớp!");
    return;
  }

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    alert("Email đã được đăng ký!");
    return;
  }

  users.push({ name, email, pass });
  saveUsers(users);

  alert("Đăng ký thành công! Hãy đăng nhập.");
  window.location.href = "login.html";
}

// xử lý đăng nhập
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;

  const users = getUsers();
  const found = users.find((user) => user.email === email && user.pass === pass);

  if (!found) {
    alert("Sai email hoặc mật khẩu!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(found));
  alert(`Xin chào ${found.name}!`);
  window.location.href = "index.html";
}

// xử lý đăng xuất
function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất!");
  window.location.href = "index.html";
}

// hiển thị trạng thái người dùng trên menu tài khoản
function showUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!accountMenu || !accountTrigger) {
    return;
  }

  if (user) {
    accountTrigger.setAttribute("aria-label", `Tài khoản của ${user.name}`);
    accountTrigger.classList.add("has-user");
    accountMenu.innerHTML = `
      <li class="dropdown-header">Xin chào, ${user.name}</li>
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" type="button" id="logoutMenuItem">Đăng xuất</button></li>
    `;

    const logoutItem = document.getElementById("logoutMenuItem");
    logoutItem?.addEventListener("click", () => {
      const dropdownInstance = window.bootstrap?.Dropdown.getOrCreateInstance(accountTrigger);
      dropdownInstance?.hide();
      logout();
    });
  } else {
    accountTrigger.setAttribute("aria-label", "Tài khoản");
    accountTrigger.classList.remove("has-user");
    accountMenu.innerHTML = `
      <li><a class="dropdown-item" href="login.html">Đăng nhập</a></li>
      <li><a class="dropdown-item" href="signup.html">Đăng ký</a></li>
    `;
  }
}

// khởi tạo form đăng ký và đăng nhập
function initAuthForms() {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}

// khởi tạo phần sản phẩm
function initProductsSection() {
  if (!productGrid) return;
  renderProducts({ category: "all" });
  filterButtons.forEach((button) => button.addEventListener("click", handleFilterClick));
}

document.addEventListener("DOMContentLoaded", () => {
  showUser();
  initAuthForms();
  initProductsSection();

  console.log("Leon UI ready");
});

window.logout = logout;