import { useState } from 'react'

export default function FlashcardTool({ flashcards, onUpdate, isExpanded, onToggleExpand }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [flippedCards, setFlippedCards] = useState({})

  const handleEdit = (index, field, value) => {
    const updated = [...flashcards]
    updated[index][field] = value
    onUpdate(updated)
  }

  const handleDelete = async(index) => {

     const card = flashcards[index]
  try {
    await fetch(`/api/ai/flashcards/${card._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    onUpdate(flashcards.filter((_, i) => i !== index))
  } catch (err) {
    console.log('Delete failed')
  }
  
  }

  const handleFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const handleExport = () => {
    const text = flashcards.map((card, i) => `${i + 1}. Q: ${card.question}\n   A: ${card.answer}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'flashcards.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="font-display font-bold text-sm" style={{ color: 'var(--neon)', margin: 0 }}>
          Flashcards ({flashcards.length})
        </h3>
        <div className="flex gap-2">
          <button onClick={handleExport}
            className="px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, var(--neon), var(--violet))', color: 'oklch(0.1 0.02 265)', border: 'none', cursor: 'pointer' }}>
            Export
          </button>
          <button onClick={onToggleExpand}
            className="px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: 'oklch(1 0 0 / 8%)', color: 'var(--muted-foreground)', border: '1px solid oklch(1 0 0 / 10%)', cursor: 'pointer' }}>
            {isExpanded ? '↙' : '↗'}
          </button>
        </div>
      </div>

      {/* Cards list */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {flashcards.map((card, index) => (
          <div key={index}
            className="rounded-xl transition-all duration-200"
            style={{
              background: flippedCards[index] ? 'color-mix(in oklab, var(--neon) 10%, oklch(0.18 0.035 265))' : 'oklch(1 0 0 / 5%)',
              border: flippedCards[index] ? '1px solid color-mix(in oklab, var(--neon) 40%, transparent)' : '1px solid oklch(1 0 0 / 10%)',
            }}>
            <div className="flex items-center justify-between px-3 pt-3 pb-1">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
                Card {index + 1}
              </span>
            </div>

            {editingIndex === index ? (
              <div className="flex flex-col gap-2 px-3 pb-3">
                <label className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Question:</label>
                <textarea value={card.question} onChange={(e) => handleEdit(index, 'question', e.target.value)}
                  className="w-full rounded-lg p-2 text-xs resize-none outline-none"
                  style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)', minHeight: '60px' }} />
                <label className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Answer:</label>
                <textarea value={card.answer} onChange={(e) => handleEdit(index, 'answer', e.target.value)}
                  className="w-full rounded-lg p-2 text-xs resize-none outline-none"
                  style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)', minHeight: '60px' }} />
                <button onClick={() => setEditingIndex(null)}
                  className="self-end px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: 'oklch(0.78 0.18 145 / 20%)', color: 'oklch(0.78 0.18 145)', border: '1px solid oklch(0.78 0.18 145 / 40%)', cursor: 'pointer' }}>
                  Save
                </button>
              </div>
            ) : (
              <div onClick={() => handleFlip(index)}
                className="px-3 py-3 cursor-pointer min-h-16 flex flex-col justify-center gap-1">
                {flippedCards[index] ? (
                  <>
                    <span className="text-xs font-bold" style={{ color: 'oklch(0.78 0.18 145)' }}>A:</span>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)', margin: 0 }}>{card.answer}</p>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-bold" style={{ color: 'var(--neon)' }}>Q:</span>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)', margin: 0 }}>{card.question}</p>
                  </>
                )}
                <p className="text-xs italic mt-1" style={{ color: 'var(--muted-foreground)', margin: '4px 0 0' }}>
                  {flippedCards[index] ? 'Tap to see question' : 'Tap to reveal answer'}
                </p>
              </div>
            )}

            <div className="flex gap-2 px-3 pb-3 justify-end">
              <button onClick={() => setEditingIndex(index)}
                className="px-2 py-1 rounded-lg text-xs font-semibold"
                style={{ background: 'oklch(0.78 0.18 235 / 20%)', color: 'oklch(0.78 0.18 235)', border: 'none', cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}
                className="px-2 py-1 rounded-lg text-xs font-semibold"
                style={{ background: 'oklch(0.65 0.22 25 / 20%)', color: 'oklch(0.65 0.22 25)', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}