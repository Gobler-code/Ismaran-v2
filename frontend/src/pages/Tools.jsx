import { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import LeftSection from '../components/LeftSection/LeftSection'
import RightSection from '../components/RightSection/RightSection'

function Tools() {
  const { docId } = useParams()
  const navigate = useNavigate()
  // Document state
  const [document, setDocument] = useState(null)
  const [editableContent, setEditableContent] = useState('')
  const [hasContent, setHasContent] = useState(false)
  
  // UI state
  const [isGenerated, setIsGenerated] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTool, setActiveTool] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Tool data
  const [flashcards, setFlashcards] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [highlights, setHighlights] = useState([])
  const [vocabInsights, setVocabInsights] = useState([])

  const [vocabList, setVocabList] = useState([])
  useEffect(() => {
    if (docId !== 'new') {
      // fetch document and all tools
      fetchDocument()
      fetchFlashcard()
      fetchQuiz()
      fetchHighlight()
      fetchVocab();
    }
  }, [docId])

  const fetchDocument = async () => {
     try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setDocument(data.data.singleDocument)
         setEditableContent(data.data.singleDocument.content) // add this
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
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setFlashcards(data.data.flashcards)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

   const fetchQuiz = async () => {
     try {
      const response = await fetch(`/api/ai/quiz/${docId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setQuizzes(data.data.quizs)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

   const fetchHighlight = async () => {
     try {
      const response = await fetch(`/api/ai/highlights/${docId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setHighlights(data.data.highlights)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  const fetchVocab = async () => {
     try {
      const response = await fetch(`/api/ai/vocab/${docId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setVocabInsights(data.data.vocabs)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
const handleGenerate = async ()=>{
     try {
      const response = await fetch(`/api/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({ title: 'My Note', content: editableContent })
      })
      const data = await response.json()
      if (data.success) {
        setDocument(data.data.document)
          setHasContent(true) 
          setIsGenerated(true)
          navigate(`/tools/${data.data.document._id}`)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
   
    }
}
 const handleToolClick = (toolName)=>{
  setActiveTool(toolName);
 }



  return (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    <LeftSection
      content={editableContent}
      setContent={setEditableContent}
      hasContent={hasContent}
      setHasContent = {setHasContent}
      onGenerate={handleGenerate}
      isGenerated={isGenerated}
      loading={loading}
      vocabList={vocabList}
      onAddToVocab={(word) => setVocabList(prev => [...prev, word])}
      onRemoveFromVocab={(word) => setVocabList(prev => prev.filter(w => w !== word))}
      onClearVocabList={() => setVocabList([])}
      onSendVocabBatchToTool={() => handleToolClick('vocab')}
      docId = {docId}
    />
  
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
/>
  </div>
)
}
export default Tools