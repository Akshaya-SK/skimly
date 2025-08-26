import React, { useState } from 'react'
import { del } from '../lib/api'
import { removeToken, decodeTokenPayload, getToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const token = getToken()
  const payload = token ? decodeTokenPayload(token) : null
  const email = payload?.email

  async function handleDeleteAccount() {
    if (!confirm('Permanently delete your account and all saved summaries?')) return
    setLoading(true)
    const res = await del('/auth/delete')
    setLoading(false)
    if (res?.success) {
      removeToken()
      navigate('/')
    } else {
      setMessage(res.message || 'Failed to delete account')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <p className="text-sm mb-2">Email: <strong>{email}</strong></p>
        <p className="text-sm text-gray-600 mb-4">Delete your account to remove all data.</p>

        {message && <p className="text-sm text-red-500">{message}</p>}

        <div className="flex gap-3">
          <button onClick={handleDeleteAccount} disabled={loading} className="px-3 py-2 rounded bg-red-500 text-white">
            {loading ? 'Deleting…' : 'Delete account'}
          </button>
        </div>
      </div>
    </div>
  )
}
