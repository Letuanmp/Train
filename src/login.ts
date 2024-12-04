interface User {
  username: string; // Corrected typo from 'usename' to 'username'
  password: string;
}

async function getApi(): Promise<void> {
  const apiUrl = 'http://training.mumesoft.com/api/login';
  
  const username: string = 'admin';
  const password: string = '123456';

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
      // Send POST request with form-data
      const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle API response
      if (data.status) {
          console.log('Login successful:', data.data);
      } else {
          console.error('Login failed:', data.msg);
      }
  } catch (error) {
      console.error('Error calling API:', error);
  }
}

getApi();