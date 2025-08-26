import React, { useState } from 'react'
import { postForm } from '../lib/api'
import PdfCard from '../components/PdfCard'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return setError('Please select a PDF')
    setProcessing(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await postForm('/articles/upload', fd)
      if (res?.article) {
        setResult(res.article)
      } else {
        setError(res.message || 'Upload failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Upload PDF</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0])} />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary" disabled={processing}>
              {processing ? 'Processing…' : 'Upload & Summarize'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Summary result</h3>
          <PdfCard article={result} onDelete={() => {}} />
          <p className="text-sm text-gray-500 mt-2">Saved to your account automatically.</p>
        </div>
      )}
    </div>
  )
}
