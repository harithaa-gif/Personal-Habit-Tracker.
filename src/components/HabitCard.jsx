import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Edit3, Trash2, Flame } from 'lucide-react';
import { calculateStreak, isHabitCompletedToday } from '../utils/habitUtils';

const HabitCard = ({
  habit,
  onToggleComplete,
  onDeleteRequest,
  showActions = true
}) => {
  const isCompleted = isHabitCompletedToday(habit);
  const streak = calculateStreak(habit);

  return (
    <div className={`habit-card ${isCompleted ? 'is-completed' : ''}`}>
      {/* Header: Icon, Title, Category and Streak */}
      <div className="habit-card-header">
        <div className="habit-identity">
          <div className="habit-icon" aria-hidden="true">
            {habit.icon || '🎯'}
          </div>
          <div className="habit-details">
            <h3 className="habit-title">{habit.name}</h3>
            <span className="habit-category-pill">{habit.category}</span>
          </div>
        </div>

        {/* Streak badge */}
        <div className="habit-streak-badge" title={`${streak} consecutive days completed`}>
          <Flame size={16} fill="#F59E0B" color="#F59E0B" />
          <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
        </div>
      </div>

      {/* Target & Frequency metadata */}
      <div className="habit-meta-row">
        <span>Target: <strong className="habit-target-val">{habit.target} {habit.unit}</strong></span>
        <span>Frequency: <strong>{habit.frequency || 'Daily'}</strong></span>
      </div>

      {/* Description if provided */}
      {habit.description && (
        <p className="habit-desc">{habit.description}</p>
      )}

      {/* Action Footer: Status & Buttons */}
      <div className="habit-actions-row">
        {/* Toggle Completion Button */}
        <button
          className={`complete-btn ${isCompleted ? 'is-completed' : ''}`}
          onClick={() => onToggleComplete(habit.id)}
          aria-label={isCompleted ? `Mark ${habit.name} as pending` : `Mark ${habit.name} as completed`}
        >
          {isCompleted ? (
            <>
              <Check size={16} strokeWidth={3} />
              <span>Completed &#10003;</span>
            </>
          ) : (
            <span>Complete</span>
          )}
        </button>

        {/* Optional Edit & Delete Actions (for My Habits page) */}
        {showActions && (
          <div className="habit-manage-btns">
            <Link
              to={`/edit-habit/${habit.id}`}
              className="action-icon-btn"
              title="Edit habit"
              aria-label={`Edit habit ${habit.name}`}
            >
              <Edit3 size={15} />
            </Link>
            <button
              className="action-icon-btn delete-btn"
              onClick={() => onDeleteRequest(habit)}
              title="Delete habit"
              aria-label={`Delete habit ${habit.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
