// frontend/src/lib/auth.js
export function saveToken(token) {
  localStorage.setItem('skimly_token', token);
}

export function getToken() {
  return localStorage.getItem('skimly_token');
}

export function removeToken() {
  localStorage.removeItem('skimly_token');
}

export function isAuthenticated() {
  return !!getToken();
}
