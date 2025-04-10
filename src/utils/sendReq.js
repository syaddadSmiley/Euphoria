async function sendApiRequest(url, method, body) {
  const request = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: method !== 'GET' ? JSON.stringify(body) : null
  };

  try {
    const response = await fetch(url, {
      method,
      headers: request.headers,
      body: request.body
    });
    return response.json();
  } catch (error) {
    console.error('Network request failed', error);
    throw error; // Throw the error to handle it in the calling function
  }
}

export default sendApiRequest;
