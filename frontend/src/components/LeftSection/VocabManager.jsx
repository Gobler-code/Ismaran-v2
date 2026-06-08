import { useState } from 'react';

export default function VocabManager({
  vocabList,
  onRemove,
  onClearVocabList,
  onSendToVocabTool
}) {
  const [showModal, setShowModal] = useState(false);

  const MIN_VOCAB_COUNT = 5;
  const MAX_VOCAB_COUNT = 8;
  const canSendToTool = vocabList.length >= MIN_VOCAB_COUNT && vocabList.length <= MAX_VOCAB_COUNT;

  const handleSendBatch = () => {
    if (canSendToTool) {
      onSendToVocabTool(vocabList);
      setShowModal(false);
      onClearVocabList();
    }
  };

  return (
    <>
      {/* Badge button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
        style={{
          background: vocabList.length > 0
            ? 'linear-gradient(135deg, var(--neon), var(--violet))'
            : 'oklch(1 0 0 / 10%)',
          color: vocabList.length > 0 ? 'oklch(0.1 0.02 265)' : 'var(--muted-foreground)',
        }}
      >
        📚 Vocab ({vocabList.length})
      </button>

      {/* Modal overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'oklch(0 0 0 / 60%)' }}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl p-7 overflow-y-auto"
            style={{
              background: 'var(--card)',
              border: '1px solid color-mix(in oklab, var(--neon) 30%, transparent)',
              maxHeight: '80vh',
              boxShadow: '0 20px 60px oklch(0 0 0 / 50%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold" style={{ color: 'var(--neon)' }}>
                Vocabulary List
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl leading-none transition-opacity hover:opacity-70"
                style={{ color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            {/* Empty state */}
            {vocabList.length === 0 ? (
              <p className="text-sm text-center py-5" style={{ color: 'var(--muted-foreground)' }}>
                No words collected yet. Highlight text to add!
              </p>
            ) : (
              <ul className="flex flex-col gap-2 mb-4 p-0 list-none">
                {vocabList.map((word, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg"
                    style={{ background: 'oklch(1 0 0 / 5%)', border: '1px solid oklch(1 0 0 / 8%)' }}
                  >
                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>{word}</span>
                    <button
                      onClick={() => onRemove(word.toLowerCase())}
                      className="text-base leading-none transition-opacity hover:opacity-70"
                      style={{ background: 'none', border: 'none', color: 'oklch(0.65 0.22 25)', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Warnings */}
            {vocabList.length > MAX_VOCAB_COUNT && (
              <p className="text-xs mb-3" style={{ color: 'oklch(0.65 0.22 25)' }}>
                Maximum {MAX_VOCAB_COUNT} items allowed. Please remove some.
              </p>
            )}
            {vocabList.length > 0 && vocabList.length < MIN_VOCAB_COUNT && (
              <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>
                Collect at least {MIN_VOCAB_COUNT} words to send.
              </p>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 mt-2">
              {vocabList.length > 0 && (
                <button
                  onClick={onClearVocabList}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    background: 'oklch(1 0 0 / 8%)',
                    border: '1px solid oklch(1 0 0 / 12%)',
                    color: 'var(--muted-foreground)',
                    cursor: 'pointer'
                  }}
                >
                  Clear All
                </button>
              )}
              <button
                onClick={handleSendBatch}
                disabled={!canSendToTool}
                className="flex-[2] py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: canSendToTool
                    ? 'linear-gradient(135deg, var(--neon), var(--violet))'
                    : 'oklch(1 0 0 / 8%)',
                  color: canSendToTool ? 'oklch(0.1 0.02 265)' : 'oklch(0.5 0 0)',
                  cursor: canSendToTool ? 'pointer' : 'not-allowed',
                  border: 'none'
                }}
              >
                Send {vocabList.length >= MIN_VOCAB_COUNT ? vocabList.length : ''} Items to Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}