import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-extrabold text-skimly-blue" style={{color:'var(--skimly-blue)'}}>Skimly — Read smarter, faster</h1>
        <p className="mt-4 text-gray-700">Upload PDFs, get concise summaries and keyword highlights. Store and search your reading history — built for busy readers.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/signup" className="px-4 py-2 rounded bg-yellow-400 text-slate-800">Get started</Link>
          <Link to="/upload" className="px-4 py-2 rounded border border-slate-200">Try a quick upload</Link>
        </div>
      </div>

      <div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700">
            <li>Sign up and log in.</li>
            <li>Upload a PDF — backend extracts text and generates a summary.</li>
            <li>View summaries in your dashboard and search your history.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
