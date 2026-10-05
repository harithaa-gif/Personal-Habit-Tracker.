import React from 'react';
import { PlusCircle, SearchX, Sparkles } from 'lucide-react';

const EmptyState = ({
  icon: CustomIcon,
  title,
  subtext,
  actionButtonText,
  onActionClick,
  variant = 'default'
}) => {
  const Icon = CustomIcon || (variant === 'search' ? SearchX : Sparkles);

  return (
    <div className="empty-state">
      <div className="empty-icon-wrap" aria-hidden="true">
        <Icon size={32} />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-subtext">{subtext}</p>
      {actionButtonText && onActionClick && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onActionClick}
        >
          {variant !== 'search' && <PlusCircle size={18} />}
          {actionButtonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
