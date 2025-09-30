const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Fetches a list of all projects.
 *
 * @returns {Promise<any>} - The JSON response from the server containing the list of projects.
 */
export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/projects/`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch projects");
  }

  return response.json();
}

/**
 * Creates a new project.
 *
 * @param {object} projectData - The project data (e.g., { name, description, creator_id }).
 * @returns {Promise<any>} - The JSON response from the server containing the new project.
 */
export async function createProject(projectData) {
  const response = await fetch(`${API_BASE_URL}/projects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create project");
  }

  return response.json();
}
