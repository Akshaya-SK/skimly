import React, { useEffect, useState } from 'react'
import { getJSON, del } from '../lib/api'
import PdfCard from '../components/PdfCard'
import EmptyState from '../components/EmptyState'

export default function Dashboard() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchArticles() {
    setLoading(true)
    const res = await getJSON('/articles/list')
    if (res?.articles) {
      setArticles(res.articles)
    } else {
      setError(res.message || 'Failed to load')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this summary?')) return
    const res = await del(`/articles/delete/${id}`)
    if (res?.success) {
      setArticles((s) => s.filter((a) => a.id !== id))
    } else {
      alert(res.message || 'Delete failed')
    }
  }

  if (loading) return <div className="text-center">Loading…</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Summaries</h2>
      {articles.length === 0 ? <EmptyState /> : articles.map(a => <PdfCard key={a.id} article={a} onDelete={handleDelete} />)}
    </div>
  )
}
