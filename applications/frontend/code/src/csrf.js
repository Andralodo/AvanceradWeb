export async function getCsrfToken() {
      const response = await fetch('http://localhost:8080/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Send cookies along with the request
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
      } 
      else {
        return null;
      }
  }
  
  
  
  
  