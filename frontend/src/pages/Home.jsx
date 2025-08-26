import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <section>
        <h1 className="text-4xl font-extrabold text-skimlyBlue mb-4">Skimly — Read smarter, faster</h1>
        <p className="text-gray-700 mb-6">
          Upload PDFs, get concise, actionable summaries and keyword highlights.
          Store and search your reading history — built for students, developers, and busy readers.
        </p>

        <div className="flex gap-3">
          <Link to="/signup" className="btn-primary">Get started — it's free</Link>
          <Link to="/upload" className="btn-muted">Try a quick upload</Link>
        </div>
      </section>

      <section>
        <div className="card">
          <h3 className="font-semibold mb-2">How it works</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700">
            <li>Sign up and log in (JWT-auth).</li>
            <li>Upload a PDF — backend extracts text and generates a summary.</li>
            <li>View summaries in your dashboard and search your history.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}
