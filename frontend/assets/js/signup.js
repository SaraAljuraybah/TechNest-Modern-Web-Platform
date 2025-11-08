document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const errorMessage = document.getElementById("errorMessage");
  const form = document.getElementById("signupForm");

  // 👁️ Toggle Password Visibility
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePassword.innerHTML =
        type === "password"
          ? '<i class="fa-solid fa-eye-slash"></i>'
          : '<i class="fa-solid fa-eye"></i>';
    });
  }

  // 🧩 Simple Validation before submission
  form.addEventListener("submit", (e) => {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    // تأكد أن الحقول ما تكون فاضية
    if (!username || !email || !password) {
// e.preventDefault();
      errorMessage.textContent = "⚠️ Please fill in all fields.";
      errorMessage.style.color = "#ff4d4d";
      return;
    }

    // ✅ لو كل شيء تمام خليه يرسل البيانات فعلاً لـ backend
    errorMessage.textContent = "";
  });
});
