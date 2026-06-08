import { useState } from 'react'

export default function QuizTool({ quizzes, onUpdate, isExpanded, onToggleExpand }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleEdit = (index, field, value) => {
    const updated = [...quizzes]
    updated[index][field] = value
    onUpdate(updated)
  }

  const handleOptionEdit = (qIndex, optIndex, value) => {
    const updated = [...quizzes]
    updated[qIndex].options[optIndex] = value
    onUpdate(updated)
  }

  const handleDelete = async (index) => {
     const item = quizzes[index]
  try {
    await fetch(`/api/ai/quiz/${item._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    onUpdate(quizzes.filter((_, i) => i !== index))
  } catch (err) {
    console.log('Delete failed')
  }
  }

  const handleAnswer = (index, answer) => {
    if (!showResults) setUserAnswers(prev => ({ ...prev, [index]: answer }))
  }

  const calculateScore = () => {
    let correct = 0
    quizzes.forEach((quiz, i) => { if (userAnswers[i] === quiz.correctAnswer) correct++ })
    return { correct, total: quizzes.length }
  }

  const handleExport = () => {
    const text = quizzes.map((q, i) => {
      const opts = q.options.map((opt, idx) => `   ${String.fromCharCode(65 + idx)}. ${opt}`).join('\n')
      return `${i + 1}. ${q.question}\n${opts}\n   Answer: ${q.correctAnswer}`
    }).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'quiz.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-2">
        <h3 className="font-display font-bold text-sm" style={{ color: 'var(--neon)', margin: 0 }}>
          Quiz ({quizzes.length} questions)
        </h3>
        <div className="flex gap-2 flex-wrap">
          {!showResults ? (
            <button onClick={() => setShowResults(true)}
              className="px-3 py-1 rounded-lg text-xs font-semibold"
              style={{ background: 'oklch(0.78 0.18 235 / 20%)', color: 'oklch(0.78 0.18 235)', border: '1px solid oklch(0.78 0.18 235 / 40%)', cursor: 'pointer' }}>
              Check Answers
            </button>
          ) : (
            <button onClick={() => { setShowResults(false); setUserAnswers({}) }}
              className="px-3 py-1 rounded-lg text-xs font-semibold"
              style={{ background: 'oklch(0.75 0.22 60 / 20%)', color: 'oklch(0.75 0.22 60)', border: '1px solid oklch(0.75 0.22 60 / 40%)', cursor: 'pointer' }}>
              Try Again
            </button>
          )}
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

      {/* Score */}
      {showResults && score && (
        <div className="rounded-xl px-4 py-3 text-center font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, var(--neon), var(--violet))', color: 'oklch(0.1 0.02 265)' }}>
          Score: {score.correct} / {score.total} ({Math.round((score.correct / score.total) * 100)}%)
        </div>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {quizzes.map((quiz, qIndex) => {
          const answered = userAnswers[qIndex]
          const isCorrect = answered === quiz.correctAnswer
          return (
            <div key={qIndex}
              className="rounded-xl p-3 transition-all duration-200"
              style={{
                background: showResults
                  ? isCorrect ? 'oklch(0.78 0.18 145 / 10%)' : 'oklch(0.65 0.22 25 / 10%)'
                  : 'oklch(1 0 0 / 5%)',
                border: showResults
                  ? isCorrect ? '1px solid oklch(0.78 0.18 145 / 40%)' : '1px solid oklch(0.65 0.22 25 / 40%)'
                  : '1px solid oklch(1 0 0 / 10%)'
              }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)', margin: '0 0 8px' }}>
                Question {qIndex + 1}
              </p>

              {editingIndex === qIndex ? (
                <div className="flex flex-col gap-2">
                  <textarea value={quiz.question} onChange={(e) => handleEdit(qIndex, 'question', e.target.value)}
                    className="w-full rounded-lg p-2 text-xs resize-none outline-none"
                    style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)', minHeight: '60px' }} />
                  {quiz.options.map((opt, optIndex) => (
                    <input key={optIndex} type="text" value={opt}
                      onChange={(e) => handleOptionEdit(qIndex, optIndex, e.target.value)}
                      className="w-full rounded-lg p-2 text-xs outline-none"
                      style={{ background: 'oklch(1 0 0 / 8%)', border: '1px solid oklch(1 0 0 / 15%)', color: 'var(--foreground)' }} />
                  ))}
                  <button onClick={() => setEditingIndex(null)}
                    className="self-end px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: 'oklch(0.78 0.18 145 / 20%)', color: 'oklch(0.78 0.18 145)', border: 'none', cursor: 'pointer' }}>
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold leading-relaxed mb-2" style={{ color: 'var(--foreground)', margin: '0 0 8px' }}>
                    {quiz.question}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {quiz.options?.map((option, optIndex) => {
                      const isSelected = userAnswers[qIndex] === option
                      const isCorrectOpt = option === quiz.correctAnswer
                      return (
                        <div key={optIndex} onClick={() => handleAnswer(qIndex, option)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-200"
                          style={{
                            background: showResults
                              ? isCorrectOpt ? 'oklch(0.78 0.18 145 / 15%)' : isSelected ? 'oklch(0.65 0.22 25 / 15%)' : 'oklch(1 0 0 / 4%)'
                              : isSelected ? 'color-mix(in oklab, var(--neon) 10%, transparent)' : 'oklch(1 0 0 / 4%)',
                            border: showResults
                              ? isCorrectOpt ? '1px solid oklch(0.78 0.18 145 / 50%)' : isSelected ? '1px solid oklch(0.65 0.22 25 / 50%)' : '1px solid oklch(1 0 0 / 8%)'
                              : isSelected ? '1px solid color-mix(in oklab, var(--neon) 50%, transparent)' : '1px solid oklch(1 0 0 / 8%)',
                            color: showResults
                              ? isCorrectOpt ? 'oklch(0.78 0.18 145)' : isSelected ? 'oklch(0.65 0.22 25)' : 'var(--muted-foreground)'
                              : 'var(--foreground)',
                            cursor: showResults ? 'default' : 'pointer'
                          }}>
                          <span>{String.fromCharCode(65 + optIndex)}.</span>
                          <span className="flex-1">{option}</span>
                          {showResults && isCorrectOpt && <span>✓</span>}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}

              <div className="flex gap-2 justify-end mt-2">
                <button onClick={() => setEditingIndex(qIndex)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: 'oklch(0.78 0.18 235 / 20%)', color: 'oklch(0.78 0.18 235)', border: 'none', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(qIndex)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: 'oklch(0.65 0.22 25 / 20%)', color: 'oklch(0.65 0.22 25)', border: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}