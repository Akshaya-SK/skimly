const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

function authHeaders() {
  const token = localStorage.getItem('skimly_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function postJSON(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function getJSON(path, params = {}) {
  const url = new URL(`${BASE}${path}`)
  Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.append(k, v))
  const res = await fetch(url.toString(), { headers: authHeaders() })
  return res.json()
}

export async function postForm(path, formData) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  })
  return res.json()
}

export async function del(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  return res.json()
}
