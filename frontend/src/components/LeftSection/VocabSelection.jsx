import { useState, useEffect, useRef } from "react";

export default function VocabSelection({ onAddToVocab }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");
  const popupRef = useRef(null);

  const isWholeWordSelection = (text, selection) => {
    if (!selection || selection.rangeCount === 0) return false;
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (container.nodeType === Node.TEXT_NODE) {
      const parentText = container.textContent;
      const startIndex = range.startOffset;
      const endIndex = range.endOffset;
      const charBefore = startIndex > 0 ? parentText[startIndex - 1] : "";
      const charAfter = endIndex < parentText.length ? parentText[endIndex] : "";
      const isAlpha = (c) => /[a-zA-Z0-9]/.test(c);
      if (isAlpha(charBefore) && isAlpha(text[0])) return false;
      if (isAlpha(charAfter) && isAlpha(text[text.length - 1])) return false;
    }
    return true;
  };

  useEffect(() => {
    const handleSelection = (e) => {
  const selection = window.getSelection();
  const rawText = selection.toString();
  const trimmedText = rawText.trim();

  if (!trimmedText || trimmedText.length <= 2) {
    setShowPopup(false);
    return;
  }

 // Get position from touch or mouse
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

  setSelectedText(trimmedText);
  setPopupPosition({
    top: e.clientY - 44,  // use mouse Y position
    left: e.clientX       // use mouse X position
  });
  setShowPopup(true);
};

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };

  window.addEventListener("mouseup", handleSelection);
  window.addEventListener("touchend", handleSelection) 
  window.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("touchstart", handleClickOutside) 
    return () => {
        window.removeEventListener("mouseup", handleSelection);
    window.removeEventListener("touchend", handleSelection) 
    window.removeEventListener("mousedown", handleClickOutside);
    window.removeEventListener("touchstart", handleClickOutside)  
    };
  }, []);

  const handleAddVocab = () => {
    if (selectedText && onAddToVocab) onAddToVocab(selectedText);
    setShowPopup(false);
  };



  return (
    <>
      {showPopup && (
        <div
          ref={popupRef}
          className="fixed z-50"
          style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
          <button
            onClick={handleAddVocab}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--neon), var(--violet))',
              color: 'oklch(0.1 0.02 265)',
            }}
          >
            ➕ Add "{selectedText}"
          </button>
        </div>
      )}
    </>
  );
}