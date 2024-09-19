const getApi = async (url, method = 'GET') => {
    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  };
  
  export default getApi;
  