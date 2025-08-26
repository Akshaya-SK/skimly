import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken, decodeTokenPayload, getToken } from '../lib/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const auth = isAuthenticated()
  const token = getToken()
  const payload = token ? decodeTokenPayload(token) : null
  const email = payload?.email

  function handleLogout() {
    removeToken()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-2xl font-bold text-skimly-blue" style={{color: 'var(--skimly-blue)'}}>Skimly</Link>
          <span className="text-sm text-gray-500">AI Reading Assistant</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          {auth && <Link to="/dashboard" className="text-sm hover:underline">Dashboard</Link>}
          {auth && <Link to="/upload" className="text-sm hover:underline">Upload</Link>}
          {auth && <Link to="/history" className="text-sm hover:underline">History</Link>}
          {auth ? (
            <>
              <Link to="/account" className="text-sm">{email ?? 'Account'}</Link>
              <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-yellow-400 text-slate-800 text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded-md bg-skimly-blue text-white text-sm" style={{backgroundColor:'var(--skimly-blue)'}}>Log in</Link>
              <Link to="/signup" className="px-3 py-1 rounded-md bg-yellow-300 text-slate-800 text-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
