import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ismaranLogo from '../assets/ismaran.png'
import { useTheme } from '../context/ThemeContext'

function Dashboard() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { darkMode, setDarkMode } = useTheme()

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const data = await response.json()
      if (data.success) {
        setDocuments(data.data.documents)
      } else {
        setError('Failed to load notes')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleNewNote = () => {
    navigate('/tools/new')
  }

  const handleOpenNote = (docId) => {
    navigate(`/tools/${docId}`)
  }
const handleDeleteNote = async (docId) => {
  const confirmed = window.confirm('Are you sure you want to delete this note?')
  if (!confirmed) return

  try {
    const response = await fetch(`/api/documents/${docId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    const data = await response.json()
    if (data.success) {
      setDocuments(prev => prev.filter(doc => doc._id !== docId))
    } else {
      setError('Failed to delete note')
    }
  } catch (error) {
    setError('Failed to delete note')
  }
}
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const filteredDocs = documents.filter(doc =>
    doc.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'} style={{
      minHeight: '100vh',
      background: darkMode
        ? 'radial-gradient(ellipse at top, oklch(0.18 0.05 265) 0%, oklch(0.08 0.025 265) 60%, oklch(0.05 0.02 265) 100%)'
        : 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
      color: darkMode ? 'oklch(0.98 0.005 250)' : '#1a1a2e',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: darkMode ? '1px solid oklch(1 0 0 / 10%)' : '1px solid #e0e0f0',
        background: darkMode ? 'oklch(0.14 0.03 265 / 80%)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={ismaranLogo} alt="Ismaran" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
          <span style={{
            fontFamily: 'Space Grotesk, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: darkMode ? 'oklch(0.82 0.2 230)' : '#4f46e5'
          }}></span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Dark mode toggle */}
       
          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: darkMode ? '1px solid oklch(1 0 0 / 15%)' : '1px solid #d0d0e8',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: darkMode ? 'oklch(0.72 0.03 250)' : '#666',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Space Grotesk, system-ui, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              margin: 0,
              color: darkMode ? 'oklch(0.82 0.2 230)' : '#4f46e5'
            }}>My Notes</h1>
            <p style={{
              margin: '4px 0 0',
              color: darkMode ? 'oklch(0.72 0.03 250)' : '#888',
              fontSize: '14px'
            }}>
              {documents.length} {documents.length === 1 ? 'note' : 'notes'} saved
            </p>
          </div>

          {/* Search + Create */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: darkMode ? 'oklch(1 0 0 / 8%)' : '#fff',
                border: darkMode ? '1px solid oklch(1 0 0 / 12%)' : '1px solid #e0e0f0',
                borderRadius: '10px',
                padding: '10px 16px',
                color: darkMode ? 'white' : '#1a1a2e',
                fontSize: '14px',
                outline: 'none',
                width: '220px'
              }}
            />
            <button
              onClick={handleNewNote}
              style={{
                background: 'linear-gradient(135deg, oklch(0.82 0.2 230), oklch(0.65 0.25 295))',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'oklch(0.1 0.02 265)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 0 20px oklch(0.82 0.2 230 / 40%)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              + Create New
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#ff6b6b', marginBottom: '16px' }}>{error}</p>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: darkMode ? 'oklch(0.72 0.03 250)' : '#888' }}>
            Loading your notes...
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredDocs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: darkMode ? 'oklch(0.72 0.03 250)' : '#888'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>No notes yet</p>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>Create your first note to get started</p>
            <button
              onClick={handleNewNote}
              style={{
                background: 'linear-gradient(135deg, oklch(0.82 0.2 230), oklch(0.65 0.25 295))',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                color: 'oklch(0.1 0.02 265)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Create First Note
            </button>
          </div>
        )}

        {/* Notes grid */}
        {!loading && filteredDocs.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                onClick={() => handleOpenNote(doc._id)}
                style={{
                  background: darkMode
                    ? 'color-mix(in oklab, oklch(0.18 0.035 265) 40%, transparent)'
                    : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: darkMode
                    ? '1px solid oklch(0.82 0.2 230 / 20%)'
                    : '1px solid #e0e0f0',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: darkMode
                    ? '0 4px 20px oklch(0.82 0.2 230 / 10%)'
                    : '0 4px 20px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = darkMode
                    ? '0 8px 40px oklch(0.82 0.2 230 / 25%)'
                    : '0 8px 40px rgba(79,70,229,0.15)'
                  e.currentTarget.style.borderColor = darkMode
                    ? 'oklch(0.82 0.2 230 / 50%)'
                    : '#a5b4fc'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = darkMode
                    ? '0 4px 20px oklch(0.82 0.2 230 / 10%)'
                    : '0 4px 20px rgba(0,0,0,0.05)'
                  e.currentTarget.style.borderColor = darkMode
                    ? 'oklch(0.82 0.2 230 / 20%)'
                    : '#e0e0f0'
                }}
              >
                {/* Card header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, oklch(0.82 0.2 230 / 20%), oklch(0.65 0.25 295 / 20%))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px'
                  }}>📄</div>
                  
                  <span style={{
                    fontSize: '11px',
                    color: darkMode ? 'oklch(0.72 0.03 250)' : '#999',
                    fontFamily: 'monospace'
                  }}>
                    {formatDate(doc.createdAt)}
                  </span>
                  <button
                 onClick={(e) => {
                      e.stopPropagation()
                        handleDeleteNote(doc._id)
                   }}
                        className="px-2 py-1 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                          style={{
                                background: 'oklch(0.65 0.22 25 / 20%)',
                                color: 'oklch(0.65 0.22 25)',
                                border: '1px solid oklch(0.65 0.22 25 / 30%)',
                                cursor: 'pointer'
                                 }}
                             >
                          🗑️
                      </button>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Space Grotesk, system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  margin: '0 0 8px',
                  color: darkMode ? 'oklch(0.98 0.005 250)' : '#1a1a2e',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {doc.title || 'Untitled'}
                </h3>

                {/* Preview */}
                <p style={{
                  fontSize: '13px',
                  color: darkMode ? 'oklch(0.72 0.03 250)' : '#777',
                  margin: 0,
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {doc.content?.substring(0, 120) || 'No content'}
                </p>

                {/* Footer */}
                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: darkMode ? '1px solid oklch(1 0 0 / 8%)' : '1px solid #f0f0f8',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: darkMode ? 'oklch(0.82 0.2 230)' : '#4f46e5',
                    fontWeight: 500
                  }}>
                    Open →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard