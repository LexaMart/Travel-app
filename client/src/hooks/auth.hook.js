import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null)
  const [photoPath, setPhotoPath] = useState(null);

  const login = useCallback((jwtToken, id, photoPath) => {
    setToken(jwtToken);
    setUserId(id);
    setPhotoPath(photoPath)
    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken, photoPath: photoPath }))
  }, [])
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setPhotoPath(null)
    localStorage.removeItem(storageName);
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId, data.photoPath);
    }
  }, [login])

  return { login, logout, token, userId, photoPath }
}