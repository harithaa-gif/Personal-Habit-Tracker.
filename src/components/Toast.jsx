import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <aside className="toast-container" aria-label="Notification message">
      <div className={`toast ${isSuccess ? 'success' : 'info'}`} role="status">
        {isSuccess ? <CheckCircle2 size={18} /> : <Info size={18} />}
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          style={{ marginLeft: '0.75rem', color: '#fff', opacity: 0.8 }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Toast;
