import { useState } from 'react'

export default function VocabTool({ vocabInsights, onUpdate, isExpanded, onToggleExpand }) {
  const [expanded, setExpanded] = useState({})

  const handleDelete = async (index) => {
     const item = vocabInsights[index]
  try {
    await fetch(`/api/ai/vocab/${item._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    onUpdate(vocabInsights.filter((_, i) => i !== index))
  } catch (err) {
    console.log('Delete failed')
  }
  }

  const handleExport = () => {
    const text = vocabInsights.map((item, i) =>
      `${i + 1}. Word: ${item.vocabulary}\n` +
      `Definition: ${item.definition}\n` +
      `Correct Examples:\n${item.correctSentence?.map(ex => `  • ${ex}`).join('\n')}\n` +
      `Incorrect Example: ${item.incorrectSentence}`
    ).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'vocab-insights.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="font-display font-bold text-sm" style={{ color: 'var(--neon)', margin: 0 }}>
          Vocabulary ({vocabInsights.length})
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

      {/* Vocab cards */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {vocabInsights.length === 0 ? (
          <p className="text-xs text-center py-4" style={{ color: 'var(--muted-foreground)' }}>
            No vocab yet. Select 5-8 words from the document first.
          </p>
        ) : (
          vocabInsights.map((item, index) => (
            <div key={index}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{ border: '1px solid color-mix(in oklab, var(--neon) 20%, transparent)' }}>
              {/* Word header */}
              <div
                onClick={() => setExpanded(prev => ({ ...prev, [index]: !prev[index] }))}
                className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
                style={{ background: 'color-mix(in oklab, var(--neon) 8%, oklch(0.18 0.035 265))' }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">📚</span>
                  <p className="text-sm font-bold" style={{ color: 'var(--neon)', margin: 0 }}>
                    {item.vocabulary}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(index) }}
                    className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'oklch(0.65 0.22 25 / 20%)', color: 'oklch(0.65 0.22 25)', border: 'none', cursor: 'pointer' }}>
                    🗑️
                  </button>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {expanded[index] ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              {expanded[index] && (
               <div className="flex flex-col gap-2 p-3 overflow-y-auto"
    style={{ background: 'oklch(1 0 0 / 3%)', animation: 'fadeIn 0.2s ease', maxHeight: '300px' }}>
                  <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

                  {/* Definition */}
                  <div className="rounded-lg p-2.5"
                    style={{ background: 'oklch(0.65 0.25 295 / 10%)', borderLeft: '3px solid var(--violet)' }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--violet)', margin: '0 0 4px' }}>
                      Definition
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)', margin: 0 }}>
                      {item.definition}
                    </p>
                  </div>

                  {/* Correct examples */}
                  {item.correctSentence?.length > 0 && (
                    <div className="rounded-lg p-2.5"
                      style={{ background: 'oklch(0.78 0.18 145 / 10%)', borderLeft: '3px solid oklch(0.78 0.18 145)' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'oklch(0.78 0.18 145)', margin: '0 0 4px' }}>
                        ✅ Correct Usage
                      </p>
                      {item.correctSentence.map((ex, i) => (
                        <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)', margin: '2px 0 0' }}>
                          • {ex}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Incorrect example */}
                  {item.incorrectSentence && (
                    <div className="rounded-lg p-2.5"
                      style={{ background: 'oklch(0.65 0.22 25 / 10%)', borderLeft: '3px solid oklch(0.65 0.22 25)' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'oklch(0.65 0.22 25)', margin: '0 0 4px' }}>
                        ❌ Common Mistake
                      </p>
                      <p className="text-xs leading-relaxed italic" style={{ color: 'var(--muted-foreground)', margin: 0 }}>
                        {item.incorrectSentence}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}