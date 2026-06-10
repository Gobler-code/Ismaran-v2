import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LeftSection from '../components/LeftSection/LeftSection'
import RightSection from '../components/RightSection/RightSection'
import { useTheme } from '../context/ThemeContext'

function Tools() {
  const { docId } = useParams()
  const navigate = useNavigate()

  const [document, setDocument] = useState(null)
  const [editableContent, setEditableContent] = useState('')
  const [hasContent, setHasContent] = useState(false)

  const [isGenerated, setIsGenerated] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTool, setActiveTool] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [flashcards, setFlashcards] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [highlights, setHighlights] = useState([])
  const [vocabInsights, setVocabInsights] = useState([])
  const [vocabList, setVocabList] = useState([])

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState('doc')

  const { darkMode } = useTheme()

const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

  useEffect(() => {
    if (docId !== 'new') {
      fetchDocument()
      fetchFlashcard()
      fetchQuiz()
      fetchHighlight()
      fetchVocab()
    }
  }, [docId])

  // Auto switch to tools tab on existing notes
  useEffect(() => {
    if (docId !== 'new') {
      setMobileTab('tools')
    }
  }, [docId])

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()
      if (data.success) {
        setDocument(data.data.singleDocument)
        setEditableContent(data.data.singleDocument.content)
        setHasContent(true)
        setIsGenerated(true)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchFlashcard = async () => {
    try {
      const response = await fetch(`/api/ai/flashcards/${docId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()
      if (data.success) setFlashcards(data.data.flashcards)
    } catch (err) { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/ai/quiz/${docId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()
      if (data.success) setQuizzes(data.data.quizs)
    } catch (err) { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const fetchHighlight = async () => {
    try {
      const response = await fetch(`/api/ai/highlights/${docId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()
      if (data.success) setHighlights(data.data.highlights)
    } catch (err) { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const fetchVocab = async () => {
    try {
      const response = await fetch(`/api/ai/vocab/${docId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await response.json()
      if (data.success) setVocabInsights(data.data.vocabs)
    } catch (err) { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'My Note', content: editableContent })
      })
      const data = await response.json()
      if (data.success) {
        setDocument(data.data.document)
        setHasContent(true)
        setIsGenerated(true)
        setMobileTab('tools') // ← auto switch to tools on mobile
        navigate(`/tools/${data.data.document._id}`)
      } else {
        setError('Failed to save note')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleToolClick = (toolName) => {
    setActiveTool(toolName)
  }

  const handleVocabGenerate = async (words) => {
  setActiveTool('vocab')
  setMobileTab('tools')
  try {
    const response = await fetch(`/api/ai/vocab/${docId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ words })
    })
    const data = await response.json()
    if (data.success) setVocabInsights(data.data.vocab)
  } catch (err) {
    setError('Failed to generate vocab')
  }
}

  const sharedProps = {
    background: darkMode
      ? 'radial-gradient(ellipse at top, oklch(0.18 0.05 265) 0%, oklch(0.08 0.025 265) 60%, oklch(0.05 0.02 265) 100%)'
      : 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
    color: darkMode ? 'oklch(0.98 0.005 250)' : '#1a1a2e',
  }

  const leftSection = (
    <LeftSection
      content={editableContent}
      setContent={setEditableContent}
      hasContent={hasContent}
      setHasContent={setHasContent}
      onGenerate={handleGenerate}
      isGenerated={isGenerated}
      loading={loading}
      vocabList={vocabList}
      onAddToVocab={(word) => setVocabList(prev => [...prev, word])}
      onRemoveFromVocab={(word) => setVocabList(prev => prev.filter(w => w !== word))}
      onClearVocabList={() => setVocabList([])}
      onSendVocabBatchToTool={(words) => handleVocabGenerate(words)}
      docId={docId}
      isMobile = {isMobile}
    />
  )

  const rightSection = (
    <RightSection
      isGenerated={isGenerated}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      activeTool={activeTool}
      onToolClick={handleToolClick}
      flashcards={flashcards}
      quizzes={quizzes}
      highlights={highlights}
      vocabInsights={vocabInsights}
      docId={docId}
      setFlashcards={setFlashcards}
      setQuizzes={setQuizzes}
      setHighlights={setHighlights}
      setVocabInsights={setVocabInsights}
      isMobile = {isMobile}
      vocabList = {vocabList}
    />
  )

  return (
    <div style={{ ...sharedProps, minHeight: '100vh', transition: 'all 0.3s ease' }}>

      {/* ── DESKTOP layout (md and above) ── */}
      <div
        className="hidden md:flex"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {leftSection}
        {rightSection}
      </div>

      {/* ── MOBILE layout (below md) ── */}
      <div
        className="flex flex-col md:hidden"
        style={{ height: '100vh' }}
      >
        {/* Content area */}
        <div className="flex-1 overflow-hidden" style={{ paddingBottom: '56px' }}>
          {mobileTab === 'doc' ? (
            <div style={{ height: '100%', width: '100%' }}>
              {leftSection}
            </div>
          ) : (
            <div style={{ height: '100%', width: '100%' }}>
              {rightSection}
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <div
          className="flex shrink-0"
          style={{
            borderTop: '1px solid oklch(1 0 0 / 10%)',
            background: 'oklch(0.14 0.03 265)',
            height: '56px'
          }}
        >
          <button
            onClick={() => setMobileTab('doc')}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: mobileTab === 'doc' ? 'var(--neon)' : 'var(--muted-foreground)',
              borderTop: mobileTab === 'doc' ? '2px solid var(--neon)' : '2px solid transparent'
            }}
          >
            <span className="text-lg">📄</span>
            <span className="text-xs font-semibold">Document</span>
          </button>

          <button
            onClick={() => setMobileTab('tools')}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: mobileTab === 'tools' ? 'var(--neon)' : 'var(--muted-foreground)',
              borderTop: mobileTab === 'tools' ? '2px solid var(--neon)' : '2px solid transparent'
            }}
          >
            <span className="text-lg">🛠️</span>
            <span className="text-xs font-semibold">Tools</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tools