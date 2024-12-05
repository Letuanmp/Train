interface User {
  username: string;
  password: string;
}
class login {
  public async getApi(): Promise<void> {
    const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let loginForm: HTMLFormElement;
    usernameInput = document.getElementById("username") as HTMLInputElement;
    passwordInput = document.getElementById("password") as HTMLInputElement;
    loginForm = document.getElementById("loginForm") as HTMLFormElement;
    const username: string = usernameInput.value;
    const password: string = passwordInput.value;

    try {
      // Send POST request with form-data
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }
}
