import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { postJSON } from '../lib/api'
import { saveToken } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await postJSON('/auth/login', { email, password })
      if (res?.token) {
        saveToken(res.token)
        navigate(from, { replace: true })
      } else {
        setError(res.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Log in</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-between items-center">
            <button type="submit" className="px-4 py-2 rounded bg-skimly-blue text-white" style={{backgroundColor:'var(--skimly-blue)'}}>Login</button>
            <Link to="/signup" className="text-sm text-gray-600">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
