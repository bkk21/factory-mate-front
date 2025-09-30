const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

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
  // For simplicity, we send the whole recording as one chunk.
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
