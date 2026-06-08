import { useState, useMemo } from 'react'

const CATEGORIES = [
  { name: 'Sure Exam Question', color: '#FACC15', icon: '⭐' },
  { name: 'Important', color: '#90EE90', icon: '📌' },
  { name: 'Less Important', color: '#ADD8E6', icon: '💡' }
]

export default function HighlightTool({ highlights, onUpdate, isExpanded, onToggleExpand }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [activeFilters, setActiveFilters] = useState(['Sure Exam Question', 'Important', 'Less Important'])

  const toggleFilter = (cat) => {
    setActiveFilters(prev => prev.includes(cat) ? prev.filter(f => f !== cat) : [...prev, cat])
  }

  const stats = useMemo(() => {
    const counts = {}
    CATEGORIES.forEach(cat => { counts[cat.name] = highlights.filter(h => h.category === cat.name).length })
    return counts
  }, [highlights])

  const filteredHighlights = highlights.filter(h => activeFilters.includes(h.category))

  const handleEdit = (index, field, value) => {
    const updated = [...highlights]
    const realIndex = highlights.indexOf(filteredHighlights[index])
    updated[realIndex][field] = value
    if (field === 'category') {
      const cat = CATEGORIES.find(c => c.name === value)
      updated[realIndex].color = cat.color
    }
    onUpdate(updated)
  }

  const handleDelete = (index) => {
    const realIndex = highlights.indexOf(filteredHighlights[index])
    onUpdate(highlights.filter((_, i) => i !== realIndex))
    setEditingIndex(null)
  }

  const handleExport = () => {
    let text = '# Study Highlights\n\n'
    CATEGORIES.forEach(cat => {
      const items = highlights.filter(h => h.category === cat.name)
      if (items.length > 0) {
        text += `## ${cat.icon} ${cat.name}\n\n`
        items.forEach((item, i) => { text += `${i + 1}. ${item.text}\n\n` })
      }
    })
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'highlights.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="font-display font-bold text-sm" style={{ color: 'var(--neon)', margin: 0 }}>
          Highlights ({highlights.length})
        </h3>
        <div className="flex gap-2">
          <button onClick={handleExport}
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg, var(--neon), var(--violet))', color: 'oklch(0.1 0.02 265)', border: 'none', cursor: 'pointer' }}>
            Export
          </button>
          <button onClick={onToggleExpand}
            className="px-3 py-1 rounded-lg text-xs"
            style={{ background: 'oklch(1 0 0 / 8%)', color: 'var(--muted-foreground)', border: '1px solid oklch(1 0 0 / 10%)', cursor: 'pointer' }}>
            {isExpanded ? '↙' : '↗'}
          </button>
        </div>
      </div>

      {/* Category stats / filters */}
      <div className="flex gap-2 flex-wrap flex-shrink-0">
        {CATEGORIES.map(cat => (
          <div key={cat.name} onClick={() => toggleFilter(cat.name)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-200 text-xs font-semibold"
            style={{
              background: activeFilters.includes(cat.name) ? `${cat.color}20` : 'oklch(1 0 0 / 5%)',
              border: `1px solid ${activeFilters.includes(cat.name) ? cat.color + '60' : 'oklch(1 0 0 / 10%)'}`,
              color: activeFilters.includes(cat.name) ? cat.color : 'var(--muted-foreground)',
              opacity: activeFilters.includes(cat.name) ? 1 : 0.4
            }}>
            <span>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="font-bold">({stats[cat.name]})</span>
          </div>
        ))}
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => setActiveFilters(['Sure Exam Question'])}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', border: 'none', cursor: 'pointer' }}>
          ⭐ Exam Critical Only
        </button>
        <button onClick={() => setActiveFilters(['Sure Exam Question', 'Important', 'Less Important'])}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, var(--neon), var(--violet))', color: 'oklch(0.1 0.02 265)', border: 'none', cursor: 'pointer' }}>
          📚 Show All
        </button>
      </div>

      {/* Highlights list */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-1">
        {filteredHighlights.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No highlights in selected categories</p>
            <button onClick={() => setActiveFilters(['Sure Exam Question', 'Important', 'Less Important'])}
              className="px-4 py-2 rounded-lg text-xs font-semibold"
              style={{ background: 'linear-gradient(135deg, var(--neon), var(--violet))', color: 'oklch(0.1 0.02 265)', border: 'none', cursor: 'pointer' }}>
              Show All
            </button>
          </div>
        ) : (
          filteredHighlights.map((highlight, index) => (
            <div key={index}
              className="rounded-xl p-3 transition-all duration-200 hover:translate-x-1"
              style={{
                background: `${highlight.color}12`,
                border: `1px solid ${highlight.color}30`,
                borderLeft: `3px solid ${highlight.color}`
              }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${highlight.color}30`, color: highlight.color }}>
                  {CATEGORIES.find(c => c.name === highlight.category)?.icon} {highlight.category}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>#{index + 1}</span>
              </div>

              {editingIndex === index ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea value={highlight.text} onChange={(e) => handleEdit(index, 'text', e.target.value)}
                    className="w-full rounded-lg p-2 text-xs resize-none outline-none"
                    style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)', minHeight: '80px' }} />
                  <select value={highlight.category} onChange={(e) => handleEdit(index, 'category', e.target.value)}
                    className="rounded-lg p-2 text-xs outline-none"
                    style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)' }}>
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingIndex(null)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: 'oklch(0.78 0.18 145 / 20%)', color: 'oklch(0.78 0.18 145)', border: 'none', cursor: 'pointer' }}>
                      Save
                    </button>
                    <button onClick={() => handleDelete(index)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: 'oklch(0.65 0.22 25 / 20%)', color: 'oklch(0.65 0.22 25)', border: 'none', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)', margin: 0 }}>{highlight.text}</p>
                  <button onClick={() => setEditingIndex(index)}
                    className="mt-2 px-2 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: 'oklch(0.78 0.18 235 / 20%)', color: 'oklch(0.78 0.18 235)', border: 'none', cursor: 'pointer' }}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}