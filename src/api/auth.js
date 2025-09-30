const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Logs in a user.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The JSON response from the server containing the user data.
 */
export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  return response.json();
}
