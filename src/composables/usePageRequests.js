export default function usePageRequests(){

  const makePostRequest = async (url, body, headers = {}) => {
    const accessToken = localStorage.getItem('access_token');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...headers // Merge any additional headers
      },
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the token is expired or unauthorized
        if (errorData.statusCode === 'INTERNAL_SERVER'
          || errorData.message === 'UnauthorizedException'
        ) {
          return {
            status: 'error'
          } // Call auto-logout function
        }

        return {
          status: errorData.status || response.status,
          statusText: errorData.message || response.statusText,
          error: errorData.error || response.error || 0,
          message: errorData.message || response.message || '',
          type: errorData.type || response.type || '',
          details: errorData.details || response.details || '',
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return null;
    }
  };
  
  return {
    makePostRequest
  }
}