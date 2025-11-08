document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      errorMessage.textContent = "⚠️ Please fill in both fields!";
      errorMessage.style.color = "#ff4d4d";
      return;
    }

    try {
      const response = await fetch("http://localhost/technest/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password })
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("🎉 " + data.message);
        window.location.href = data.redirect;
      } else {
        errorMessage.textContent = "❌ " + data.message;
        errorMessage.style.color = "#ff4d4d";
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.textContent = "⚠️ Server error. Please try again later.";
    }
  });

  // 👁️ Toggle password visibility
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const eyeIcon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    eyeIcon.classList.toggle("fa-eye", isHidden);
    eyeIcon.classList.toggle("fa-eye-slash", !isHidden);
  });
});
