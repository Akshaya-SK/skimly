import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken, decodeTokenPayload } from '../lib/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const auth = isAuthenticated()
  const token = localStorage.getItem('skimly_token')
  const payload = token ? decodeTokenPayload(token) : null
  const userEmail = payload?.email

  function handleLogout() {
    removeToken()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-2xl font-bold text-skimlyBlue">Skimly</Link>
          <span className="text-sm text-gray-500">AI Reading Assistant</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          {auth && <Link to="/dashboard" className="text-sm hover:underline">Dashboard</Link>}
          {auth && <Link to="/upload" className="text-sm hover:underline">Upload</Link>}
          {auth && <Link to="/history" className="text-sm hover:underline">History</Link>}
          {auth ? (
            <>
              <Link to="/account" className="text-sm">{userEmail}</Link>
              <button onClick={handleLogout} className="text-sm btn-muted">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary text-sm">Log in</Link>
              <Link to="/signup" className="btn-muted text-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
