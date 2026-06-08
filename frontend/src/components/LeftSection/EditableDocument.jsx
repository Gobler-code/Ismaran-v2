import { useRef, useMemo } from 'react'
import VocabManager from './VocabManager'
import VocabSelection from './VocabSelection'

export default function EditableDocument({ 
  content, onChange, fileName, onGenerateTools, onClear,
  isGenerated, loading,
  vocabList, onAddToVocab, onRemoveFromVocab, onClearVocabList, onSendVocabBatchToTool
}) {
  const textareaRef = useRef(null)

  const stats = useMemo(() => {
    const charCount = content.length
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
    return { charCount, wordCount }
  }, [content])

  return (
    <div className="flex flex-col flex-1 overflow-hidden rounded-xl gap-2"
      style={{ border: '1px solid oklch(1 0 0 / 10%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-2"
        style={{ borderBottom: '1px solid oklch(1 0 0 / 8%)', background: 'oklch(1 0 0 / 3%)' }}
      >
        <span className="text-sm font-medium truncate max-w-xs"
          style={{ color: 'var(--muted-foreground)' }}
          title={fileName}
        >
          📄 {fileName}
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Generate button — hide when already generated */}
          {!isGenerated && (
            <button
              onClick={onGenerateTools}
              disabled={!content.trim() || loading}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                background: 'linear-gradient(135deg, var(--neon), var(--violet))',
                color: 'oklch(0.1 0.02 265)',
                boxShadow: '0 0 20px color-mix(in oklab, var(--neon) 40%, transparent)'
              }}
            >
              {loading ? 'Saving...' : '⚡ Generate Tools'}
            </button>
          )}

          {/* Clear button */}
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
            style={{
              background: 'oklch(1 0 0 / 8%)',
              border: '1px solid oklch(1 0 0 / 12%)',
              color: 'var(--muted-foreground)',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>

          {/* Vocab manager */}
          <VocabManager
            vocabList={vocabList}
            onRemove={onRemoveFromVocab}
            onClearVocabList={onClearVocabList}
            onSendToVocabTool={onSendVocabBatchToTool}
          />
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={onChange}
        placeholder="Your content will appear here. You can edit it directly..."
        className="flex-1 w-full resize-none outline-none p-4 text-sm leading-relaxed"
        style={{
          background: 'transparent',
          color: 'var(--foreground)',
          fontFamily: 'Inter, system-ui, sans-serif',
          minHeight: '200px'
        }}
        aria-label="Editable document content"
      />

      {/* Vocab selection popup */}
      <VocabSelection onAddToVocab={onAddToVocab} />

      {/* Footer */}
      <div className="flex items-center justify-end gap-4 px-4 py-2"
        style={{ borderTop: '1px solid oklch(1 0 0 / 8%)', background: 'oklch(1 0 0 / 3%)' }}
      >
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {stats.wordCount.toLocaleString()} words
        </span>
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {stats.charCount.toLocaleString()} characters
        </span>
      </div>
    </div>
  )
}