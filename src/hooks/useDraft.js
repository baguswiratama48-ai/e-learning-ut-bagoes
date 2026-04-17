import { useState, useEffect } from 'react';

/**
 * useDraft hook for persisting form data in localStorage
 * @param {string} key - Unique key for the draft (e.g., studentEmail_classId_meetingId_sectionName)
 * @param {any} initialValue - Initial value if no draft exists
 */
export const useDraft = (key, initialValue = "") => {
  // Get existing draft from localStorage on mount
  const [draft, setDraft] = useState(() => {
    try {
      const saved = localStorage.getItem(`draft_${key}`);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (e) {
      console.warn("Failed to load draft from localStorage", e);
      return initialValue;
    }
  });

  // Update localStorage whenever draft changes
  useEffect(() => {
    try {
      if (draft !== undefined && draft !== null) {
        localStorage.setItem(`draft_${key}`, JSON.stringify(draft));
      }
    } catch (e) {
      console.warn("Failed to save draft to localStorage", e);
    }
  }, [key, draft]);

  // Function to clear draft after successful submission
  const clearDraft = () => {
    try {
      localStorage.removeItem(`draft_${key}`);
      setDraft(initialValue);
    } catch (e) {
      console.warn("Failed to clear draft from localStorage", e);
    }
  };

  return [draft, setDraft, clearDraft];
};
