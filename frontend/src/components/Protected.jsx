import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../lib/auth'

export default function Protected({ children }) {
  const auth = isAuthenticated()
  const loc = useLocation()
  if (!auth) {
    return <Navigate to="/login" replace state={{ from: loc }} />
  }
  return children
}
