const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Creates a new recording session (meeting) on the server.
 *
 * @param {string} projectExternalId - The external ID of the project.
 * @param {object} recordingData - The recording data (e.g., { title, creator_id }).
 * @returns {Promise<any>} - The JSON response from the server containing the new meeting object.
 */
export async function createRecording(projectExternalId, recordingData) {
  if (!projectExternalId) {
    throw new Error("Project ID not found.");
  }

  // The backend endpoint is still /meetings, but semantically this is a recording session.
  const response = await fetch(`${API_BASE_URL}/meetings/?project_external_id=${projectExternalId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recordingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Recording creation failed");
  }

  return response.json();
}

/**
 * Uploads a recording audio file to the server for a specific meeting.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @param {Blob} audioBlob - The audio data as a Blob.
 * @returns {Promise<any>} - The JSON response from the server.
 */
export async function uploadRecording(meetingExternalId, audioBlob) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");
  formData.append("chunk_sequence", 0);
  formData.append("accumulated_duration_ms", 0);

  console.log('Uploading recording for meeting:', meetingExternalId);

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/recordings`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "File upload failed");
  }

  return response.json();
}

/**
 * Uploads a PPT file to the server for a specific meeting.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @param {File} file - The PPT file to upload.
 * @returns {Promise<any>} - The JSON response from the server.
 */
export async function uploadPpt(meetingExternalId, file) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log('Uploading PPT for meeting:', meetingExternalId);

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/ppt`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "PPT upload failed");
  }

  return response.json();
}

/**
 * Requests an interim summary for a specific meeting.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @returns {Promise<any>} - The JSON response from the server containing the summary.
 */
export async function generateSummary(meetingExternalId) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  console.log('Generating summary for meeting:', meetingExternalId);

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/summary`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Summary generation failed");
  }

  return response.json();
}

/**
 * Fetches the full meeting report.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @returns {Promise<any>} - The JSON response from the server containing the report.
 */
export async function getMeetingReport(meetingExternalId) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  console.log('Fetching report for meeting:', meetingExternalId);

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/report`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Report fetching failed");
  }

  return response.json();
}

/**
 * Sends a chat message to the meeting's RAG chatbot.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @param {string} question - The user's question.
 * @returns {Promise<any>} - The JSON response from the server containing the answer.
 */
export async function chatWithMeeting(meetingExternalId, question) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: question }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Chat request failed");
  }

  return response.json();
}

/**
 * Ends a meeting and generates the final report.
 *
 * @param {string} meetingExternalId - The external ID of the meeting.
 * @param {object} endRequestData - The request data (e.g., { report_type, created_by }).
 * @returns {Promise<any>} - The JSON response from the server containing the final report.
 */
export async function endMeeting(meetingExternalId, endRequestData) {
  if (!meetingExternalId) {
    throw new Error("Meeting ID not found.");
  }

  const response = await fetch(`${API_BASE_URL}/meetings/${meetingExternalId}/end`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(endRequestData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to end meeting");
  }

  return response.json();
}
