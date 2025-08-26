import React from 'react'

export default function PdfCard({ article, onDelete }) {
  const { id, title, summary, keywords, created_at } = article
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title || 'Untitled'}</h3>
          <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString()}</p>
        </div>
        <div>
          {onDelete && (
            <button onClick={() => onDelete(id)} className="px-3 py-1 text-sm rounded-md bg-red-500 text-white">
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">{summary}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(keywords || []).map(k => (
          <span key={k} className="text-xs px-2 py-1 rounded-full bg-yellow-200 text-slate-800">{k}</span>
        ))}
      </div>
    </div>
  )
}
