import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}, isJson = true) => {
    setLoading(true);
    try {
      if (body) {
        if (isJson) {
          headers['Content-Type'] = "application/json";
          body = JSON.stringify(body)
        }

        // headers['Content-Type'] = "multipart/form-data";
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Smth Wrong');
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      console.log(e)
      throw e;
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])
  return { loading, request, error, clearError }
}