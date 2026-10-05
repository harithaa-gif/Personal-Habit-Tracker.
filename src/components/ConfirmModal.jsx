import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({
  isOpen,
  title = 'Delete Habit?',
  message = 'Are you sure you want to delete this habit? This action cannot be undone.',
  confirmText = 'Delete Habit',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-wrap" aria-hidden="true">
          <AlertTriangle size={24} />
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-text">{message}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
