const products = [
  {
    id: 1,
    name: "Áo phông Leon",
    price: "249.000đ",
    category: "tee",
    isNew: true,
    image: "AoPhongLeon.png",
    description: "Chất cotton 2 chiều, logo Leon mới nhất."
  },
  {
    id: 2,
    name: "Hoodie Leon",
    price: "489.000đ",
    category: "hoodie",
    isNew: false,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Form oversize, nỉ ngoại nhập mềm mịn."
  },
  {
    id: 3,
    name: "Áo phông Limited Edition",
    price: "279.000đ",
    category: "tee",
    isNew: false,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    description: "Phiên bản giới hạn với hoạ tiết đặc biệt."
  },
  {
    id: 4,
    name: "Nón lưỡi trai",
    price: "189.000đ",
    category: "accessory",
    isNew: true,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    description: "Chống nắng tốt, chất liệu cotton thoáng khí."
  },
  {
    id: 5,
    name: "Bình nước thể thao",
    price: "159.000đ",
    category: "accessory",
    isNew: false,
    image: "https://images.unsplash.com/photo-1526402464714-2b1f2128fdaa?auto=format&fit=crop&w=900&q=80",
    description: "Dung tích 750ml, giữ nhiệt 6 giờ."
  },
  {
    id: 6,
    name: "Hoodie Neon Limited",
    price: "529.000đ",
    category: "hoodie",
    isNew: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description: "In chuyển nhiệt, phản quang nổi bật về đêm."
  },
  {
    id: 7,
    name: "Áo khoác bomber",
    price: "649.000đ",
    category: "hoodie",
    isNew: false,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Thiết kế 2 lớp, giữ ấm tốt khi di chuyển."
  },
  {
    id: 8,
    name: "Bộ sticker Leon",
    price: "79.000đ",
    category: "accessory",
    isNew: false,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    description: "12 mẫu sticker vinyl chống thấm."
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll("#categoryFilters button");
const accountMenu = document.getElementById("accountMenu");
const accountTrigger = document.getElementById("accountTrigger");
const searchTriggers = document.querySelectorAll("[data-search-trigger]");

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col-sm-6 col-lg-3";

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

function renderProducts({ category = "all", keyword = "" } = {}) {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchCategory = category === "all" || product.category === category;
    const matchKeyword = !normalizedKeyword
      || product.name.toLowerCase().includes(normalizedKeyword)
      || product.description.toLowerCase().includes(normalizedKeyword);
    return matchCategory && matchKeyword;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-dark border border-secondary text-center" role="alert">
          Không tìm thấy sản phẩm phù hợp. Vui lòng thử từ khóa khác.
        </div>
      </div>
    `;
    return;
  }

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

let searchTimer;
function handleSearchInput(event) {
  const value = event.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const activeBtn = document.querySelector("#categoryFilters button.active");
    const category = activeBtn ? activeBtn.dataset.category : "all";
    renderProducts({ category, keyword: value });
  }, 200);
}

/* --------------------
 * Local storage helpers
 * -------------------- */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

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
  window.location.href = "mainindex.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất!");
  window.location.href = "mainindex.html";
}

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

function initProductsSection() {
  if (!productGrid) return;
  renderProducts({ category: "all" });
  filterButtons.forEach((button) => button.addEventListener("click", handleFilterClick));
  searchInput?.addEventListener("input", handleSearchInput);
}

document.addEventListener("DOMContentLoaded", () => {
  showUser();
  initAuthForms();
  initProductsSection();

  searchTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!searchInput) return;
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  console.log("✅ MixiStyle UI ready");
});

window.logout = logout;