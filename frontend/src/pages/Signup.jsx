import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postJSON } from '../lib/api'
import { saveToken } from '../lib/auth'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await postJSON('/auth/signup', { email, password })
      if (res?.token) {
        saveToken(res.token)
        navigate('/dashboard')
      } else {
        setError(res.message || 'Signup failed')
      }
    } catch {
      setError('Network error')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-between items-center">
            <button type="submit" className="btn-primary">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
