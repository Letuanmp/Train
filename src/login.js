const apiUrl = process.env.VITE_API_URL;
console.log("API URL:", apiUrl);
(async function callLoginAPI() {
  // Dữ liệu mặc định
  const payload = {
    username: "admin",
    password: "123456",
  };

  try {
    // Gửi yêu cầu tới API
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Chuyển phản hồi thành JSON
    const data = await response.json();

    // Log kết quả ra console
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error during API call:", error);
  }
})();
