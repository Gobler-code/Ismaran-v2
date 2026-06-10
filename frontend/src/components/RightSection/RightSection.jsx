import { useState } from "react"
import FlashcardTool from './FlashcardTool'
import QuizTool from './QuizTool'
import HighlightTool from './HighlightTool'
import VocabTool from './VocabTool'

const TOOLS = [
  { id: 'flashcard', label: 'Flashcard Generator', icon: '🃏', description: 'Create Q&A flashcards', animation: 'flip' },
  { id: 'quiz', label: 'Quiz Generator', icon: '❓', description: 'Multiple-choice quizzes', animation: 'bounce' },
  { id: 'highlight', label: 'Highlight Generator', icon: '✨', description: 'Extract key points', animation: 'glow' },
  { id: 'vocab', label: 'Vocab Tool', icon: '📚', description: 'Deep dive vocabulary', animation: 'spin' },
]

const ENDPOINTS = {
  flashcard: 'flashcards',
  quiz: 'quiz',
  highlight: 'highlights',
  vocab: 'vocab'
}

const styles = `
  @keyframes flip {
    0%, 100% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    75% { transform: translateY(-5px); }
  }
  @keyframes glow-pulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
    50% { transform: scale(1.2); filter: drop-shadow(0 0 12px oklch(0.82 0.2 230 / 80%)); }
  }
  @keyframes spin-once {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    from { left: -100%; }
    to { left: 100%; }
  }
  .tool-card { position: relative; overflow: hidden; }
  .tool-card::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent);
    transition: left 0.5s;
  }
  .tool-card:hover::before { left: 100%; }
  .tool-card:hover .icon-flip { animation: flip 0.6s ease-in-out; }
  .tool-card:hover .icon-bounce { animation: bounce 0.6s ease-in-out; }
  .tool-card:hover .icon-glow { animation: glow-pulse 0.6s ease-in-out; }
  .tool-card:hover .icon-spin { animation: spin-once 0.6s ease-in-out; }
  .tool-output { animation: fadeSlideIn 0.3s ease; }
`

export default function RightSection({
  isGenerated, isExpanded, setIsExpanded,
  activeTool, onToolClick,
  flashcards, quizzes, highlights, vocabInsights,
  setFlashcards, setQuizzes, setHighlights, setVocabInsights,
  docId,isMobile,vocabList
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleToolClick = async (toolId) => {
    if (!isGenerated) return
    onToolClick(toolId)
    setIsExpanded(true) // auto-expand when tool clicked

    if (toolId === 'flashcard' && flashcards.length > 0) return
    if (toolId === 'quiz' && quizzes.length > 0) return
    if (toolId === 'highlight' && highlights.length > 0) return
    if (toolId === 'vocab' && vocabInsights.length > 0) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/${ENDPOINTS[toolId]}/${docId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
          body: toolId === 'vocab' 
    ? JSON.stringify({ words: vocabList }) 
    : undefined
      })
      const data = await response.json()
      if (data.success) {
        if (toolId === 'flashcard') setFlashcards(data.data.flashcards)
        if (toolId === 'quiz') setQuizzes(data.data.quiz)
        if (toolId === 'highlight') setHighlights(data.data.highlight)
        if (toolId === 'vocab') setVocabInsights(data.data.vocab)
      } else {
        setError(`Failed to generate ${toolId}`)
      }
      console.log('toolId:', toolId)
console.log('vocabList:', vocabList)
console.log('docId:', docId)
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToTools = () => {
    onToolClick(null)
    setIsExpanded(false)
  }

  const hasData = (toolId) => {
    if (toolId === 'flashcard') return flashcards.length > 0
    if (toolId === 'quiz') return quizzes.length > 0
    if (toolId === 'highlight') return highlights.length > 0
    if (toolId === 'vocab') return vocabInsights.length > 0
    return false
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="flex flex-col h-screen transition-all duration-300 overflow-hidden"
        style={{
          width: isMobile ? '100%' : (activeTool ? '55%' : '25%'),
          height: '100vh',
           minHeight: '100%',
            paddingBottom: isMobile ? '56px' : '0',
          minWidth: activeTool ? '300px' : '180px',
          borderLeft: '1px solid oklch(1 0 0 / 10%)',
          background: 'oklch(0.15 0.03 265)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: '1px solid oklch(1 0 0 / 10%)' }}
        >
          {activeTool ? (
            <button
              onClick={handleBackToTools}
              className="flex items-center gap-2 text-sm font-semibold transition-all hover:-translate-x-1"
              style={{ background: 'none', border: 'none', color: 'var(--neon)', cursor: 'pointer' }}
            >
              ← Back to Tools
            </button>
          ) : (
            <h2 className="font-display font-bold text-sm tracking-wide" style={{ color: 'var(--neon)', margin: 0 }}>
              Tools
            </h2>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Tool selector — show when no active tool */}
          {!activeTool && (
            <div className="p-4 flex flex-col gap-3">

              {/* Hint when not generated */}
              {!isGenerated && (
                <p className="text-xs text-center py-2" style={{ color: 'var(--muted-foreground)' }}>
                  Click "⚡ Generate Tools" to activate
                </p>
              )}

              {/* Error */}
              {error && (
                <div className="px-3 py-2 rounded-lg text-xs"
                  style={{ background: 'oklch(0.65 0.22 25 / 20%)', color: 'oklch(0.85 0.1 25)', border: '1px solid oklch(0.65 0.22 25 / 30%)' }}>
                  {error}
                </div>
              )}

              {/* Tool cards — vertical grid */}
              <div className="flex flex-col gap-2 h-full">
                {TOOLS.map((tool) => {
                  const generated = hasData(tool.id)
                  return (
                    <div
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="tool-card rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300"
                      style={{
                        background: generated
                          ? 'color-mix(in oklab, var(--neon) 8%, oklch(0.18 0.035 265))'
                          : 'linear-gradient(135deg, oklch(0.18 0.035 265), oklch(0.14 0.03 265))',
                        border: generated
                          ? '1px solid color-mix(in oklab, var(--neon) 40%, transparent)'
                          : '1px solid oklch(1 0 0 / 10%)',
                        cursor: isGenerated ? 'pointer' : 'not-allowed',
                        opacity: isGenerated ? 1 : 0.4,
                        minHeight: '22vh',
                        padding: '1.25rem 0.75rem',
                        transform: 'translateY(0)',
                        boxShadow: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={e => {
                        if (!isGenerated) return
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)'
                        e.currentTarget.style.boxShadow = '0 15px 35px color-mix(in oklab, var(--neon) 30%, transparent)'
                        e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--neon) 60%, transparent)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.borderColor = generated
                          ? 'color-mix(in oklab, var(--neon) 40%, transparent)'
                          : 'oklch(1 0 0 / 10%)'
                      }}
                    >
                      <span className={`text-3xl icon-${tool.animation}`}>{tool.icon}</span>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold" style={{ color: 'var(--foreground)', margin: 0 }}>
                          {tool.label}
                        </p>
                        <p className="text-xs" style={{ color: generated ? 'oklch(0.78 0.18 145)' : 'var(--muted-foreground)', margin: 0 }}>
                          {generated ? '✅ Generated' : tool.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="flex flex-col items-center gap-3 py-12">
              <div style={{
                width: '40px', height: '40px',
                border: '3px solid oklch(1 0 0 / 10%)',
                borderTopColor: 'var(--neon)',
                borderRadius: '50%',
                animation: 'spin-once 0.8s linear infinite'
              }} />
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Generating {activeTool}...
              </p>
              <style>{`@keyframes spin-once { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Tool output — full right section */}
          {activeTool && !loading && (
              <div className="tool-output p-4 ">
              {activeTool === 'flashcard' && (
                <FlashcardTool
                  flashcards={flashcards}
                  onUpdate={setFlashcards}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              )}
              {activeTool === 'quiz' && (
                <QuizTool
                  quizzes={quizzes}
                  onUpdate={setQuizzes}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              )}
              {activeTool === 'highlight' && (
                <HighlightTool
                  highlights={highlights}
                  onUpdate={setHighlights}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              )}
              {activeTool === 'vocab' && (
                <VocabTool
                  vocabInsights={vocabInsights}
                  onUpdate={setVocabInsights}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}