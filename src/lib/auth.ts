export const saveAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token)
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token')
}