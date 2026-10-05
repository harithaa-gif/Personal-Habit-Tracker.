import React from 'react';

const SummaryCard = ({ title, value, badge, icon: Icon, iconBg = '#F3F1FF', iconColor = '#6C63FF' }) => {
  return (
    <div className="summary-card">
      <div
        className="summary-icon-box"
        style={{ backgroundColor: iconBg, color: iconColor }}
        aria-hidden="true"
      >
        {Icon && <Icon size={24} />}
      </div>
      <div className="summary-content">
        <span className="summary-title">{title}</span>
        <span className="summary-value">{value}</span>
        {badge && <span className="summary-badge">{badge}</span>}
      </div>
    </div>
  );
};

export default SummaryCard;
