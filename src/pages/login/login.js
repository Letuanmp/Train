const login = {
  run() {
    const formEl = document.getElementById("loginForm");
    if (!formEl) return;

    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      try {
        // const response =
      } catch (error) {}
    });
  },
};
login.run();
