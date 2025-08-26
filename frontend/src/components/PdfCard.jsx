import React from 'react'

export default function PdfCard({ article, onDelete }) {
  const { id, title, summary, keywords, created_at } = article
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title || 'Untitled'}</h3>
          <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString()}</p>
        </div>
        <div>
          <button
            onClick={() => onDelete(id)}
            className="px-3 py-1 text-sm rounded-md bg-red-500 text-white"
            title="Delete summary"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>

      <div className="mt-3">
        {keywords?.length ? (
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span key={k} className="px-2 py-1 text-xs rounded-full bg-skimlyYellow text-skimlyBlue">
                {k}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
