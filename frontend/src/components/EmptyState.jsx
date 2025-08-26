import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyState({ title = 'No summaries yet', hint = 'Upload a PDF to create your first summary.' }) {
  return (
    <div className="card text-center py-12">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{hint}</p>
      <Link to="/upload" className="btn-primary">Upload a PDF</Link>
    </div>
  )
}
