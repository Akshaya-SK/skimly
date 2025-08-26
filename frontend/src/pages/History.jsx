import React, { useEffect, useState } from 'react'
import { getJSON, del } from '../lib/api'
import PdfCard from '../components/PdfCard'
import EmptyState from '../components/EmptyState'

export default function History() {
  const [q, setQ] = useState('')
  const [date, setDate] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    const params = {}
    if (q) params.search = q
    if (date) params.date = date
    const res = await getJSON('/articles/list', params)
    if (res?.articles) setArticles(res.articles)
    else setArticles([])
    setLoading(false)
  }

  useEffect(() => { search() }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this summary?')) return
    const res = await del(`/articles/delete/${id}`)
    if (res?.success) {
      setArticles((s) => s.filter((a) => a.id !== id))
    } else {
      alert(res.message || 'Delete failed')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search History</h2>

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex gap-3">
          <input placeholder="Search topic or text" value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1 p-2 border rounded" />
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="p-2 border rounded" />
          <button onClick={search} className="px-4 py-2 rounded bg-skimly-blue text-white" style={{backgroundColor:'var(--skimly-blue)'}}>Search</button>
        </div>
      </div>

      {loading ? <div>Loading…</div> : (articles.length === 0 ? <EmptyState title="No matching summaries" hint="Try a different keyword or date" /> : articles.map(a => <PdfCard key={a.id} article={a} onDelete={handleDelete} />))}
    </div>
  )
}
