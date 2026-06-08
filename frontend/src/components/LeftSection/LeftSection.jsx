import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useFileProcessor } from './useFileProcessor'
import logo from '../../assets/ismaran.png'
import EditableDocument from './EditableDocument'

export default function LeftSection({ 
  content, setContent, hasContent, setHasContent, onGenerate, isGenerated, loading,
  vocabList, onAddToVocab, onRemoveFromVocab, onClearVocabList, onSendVocabBatchToTool,docId
}) {
  const [inputText, setInputText] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [showError, setShowError] = useState(null)
  
  const fileInputRef = useRef(null)
  const { processFiles, isProcessing, error } = useFileProcessor()

  const canSubmit = inputText.trim().length > 0

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleEditableContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const result = await processFiles(files)
    
    if (result.success && result.text) {
      setContent(result.text)
      setUploadedFileName(result.fileName)
      setHasContent(true)
      setInputText('')
      
      if (result.failedFiles.length > 0) {
        const failedNames = result.failedFiles.map(f => f.fileName).join(', ')
        setShowError(`Some files couldn't be processed: ${failedNames}`)
        setTimeout(() => setShowError(null), 5000)
      }
    } else {
      setShowError(result.error || 'Failed to process files')
      setTimeout(() => setShowError(null), 5000)
    }
    
    e.target.value = ''
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  const handleSearchSubmit = () => {
    const trimmedText = inputText.trim()
    if (trimmedText) {
      setContent(trimmedText)
      setUploadedFileName('Pasted Content')
      setHasContent(true)
      setInputText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  const handleClearContent = () => {
    setContent('')
    setHasContent(false)
    setUploadedFileName('')
    setInputText('')
    setShowError(null)
  }

  const handleSendToTools = () => {
    if (content.trim()) {
      onGenerate()
    }
  }

  return (
    <div style={{
      width: '75%',
      height: '100vh',
      borderRight: '1px solid oklch(1 0 0 / 10%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      overflow: 'hidden',
      gap: '16px'
    }}>

      {/* Logo */}
      <Link to="/dashboard" style={{ display: 'inline-block', width: 'fit-content' }}>
        <img 
          src={logo} 
          alt="Ismaran Logo" 
          style={{ height: hasContent ? '32px' : '48px', width: 'auto', transition: 'all 0.3s' }}
        />
      </Link>

      {/* Hidden file input */}
      {docId === 'new' && (
           <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.bmp,.doc,.docx"
        multiple
        style={{ display: 'none' }}
        aria-label="Upload file"
      />
      )}
       
       {/* Error notification */}
      {(showError || error) && (
        <div style={{
          background: 'oklch(0.65 0.22 25 / 20%)',
          border: '1px solid oklch(0.65 0.22 25 / 50%)',
          borderRadius: '8px',
          padding: '10px 16px',
          color: 'oklch(0.85 0.1 25)',
          fontSize: '14px'
        }}>
          {showError || error}
        </div>
      )}

      {/* Search bar */}
      {docId === 'new' && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'oklch(1 0 0 / 8%)',
        border: '1px solid oklch(1 0 0 / 12%)',
        borderRadius: '12px',
        padding: '8px 12px',
      }}>
        <button
          onClick={handlePlusClick}
          disabled={isProcessing}
          style={{
            background: 'none',
            border: 'none',
            color: 'oklch(0.82 0.2 230)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 4px',
            lineHeight: 1
          }}
          title="Upload file"
        >
          +
        </button>
        <input
          type="text"
          placeholder={hasContent ? 'Add more content...' : 'Enter notes or upload a file'}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'oklch(0.98 0.005 250)',
            fontSize: '15px',
          }}
        />
        <button
          onClick={handleSearchSubmit}
          disabled={isProcessing || !canSubmit}
          style={{
            background: canSubmit ? 'linear-gradient(135deg, oklch(0.82 0.2 230), oklch(0.65 0.25 295))' : 'oklch(1 0 0 / 10%)',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 10px',
            color: canSubmit ? 'oklch(0.1 0.02 265)' : 'oklch(0.5 0 0)',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          ⬆
        </button>
      </div>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <div style={{
          color: 'oklch(0.72 0.03 250)',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ 
            display: 'inline-block',
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'oklch(0.82 0.2 230)',
            animation: 'pulse 1s infinite'
          }}/>
          Processing files...
        </div>
      )}

      {/* EditableDocument — only when hasContent */}
      {hasContent && (
        <EditableDocument
          content={content}
          onChange={handleEditableContentChange}
          fileName={uploadedFileName}
          onGenerateTools={handleSendToTools}
          onClear={handleClearContent}
          isGenerated={isGenerated}
          loading={loading}
          vocabList={vocabList}
          onAddToVocab={onAddToVocab}
          onRemoveFromVocab={onRemoveFromVocab}
          onClearVocabList={onClearVocabList}
          onSendVocabBatchToTool={onSendVocabBatchToTool}
        />
      )}

    </div>
  )
}