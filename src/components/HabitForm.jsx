import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';

const CATEGORIES = [
  'Health',
  'Fitness',
  'Study',
  'Wellness',
  'Productivity',
  'Personal'
];

const UNITS = [
  'Minutes',
  'Hours',
  'Glasses',
  'Pages',
  'Times',
  'Steps'
];

const FREQUENCIES = [
  'Daily',
  'Weekdays',
  'Weekends'
];

const ICON_OPTIONS = [
  { emoji: '📚', label: 'Reading' },
  { emoji: '🏃', label: 'Exercise' },
  { emoji: '💧', label: 'Water' },
  { emoji: '🧘', label: 'Meditation' },
  { emoji: '💻', label: 'Coding' },
  { emoji: '✍️', label: 'Writing' },
  { emoji: '🥗', label: 'Healthy Eating' },
  { emoji: '🚶', label: 'Walking' },
  { emoji: '😴', label: 'Sleep' },
  { emoji: '🎯', label: 'Personal' }
];

const HabitForm = ({ initialData, onSubmit, title = 'Create New Habit', submitButtonText = 'Save Habit' }) => {
  const navigate = useNavigate();

  // Form state initialized with existing data (for Edit) or defaults (for Add)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    target: initialData?.target !== undefined ? initialData.target : '',
    unit: initialData?.unit || 'Minutes',
    frequency: initialData?.frequency || 'Daily',
    icon: initialData?.icon || '📚',
    description: initialData?.description || ''
  });

  // State-based validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Real-time validation helper
  const validate = (data) => {
    const errs = {};

    // Habit Name Validation
    if (!data.name || !data.name.trim()) {
      errs.name = 'Habit name is required.';
    } else if (data.name.trim().length < 3) {
      errs.name = 'Habit name must be at least 3 characters.';
    } else if (data.name.trim().length > 50) {
      errs.name = 'Habit name cannot exceed 50 characters.';
    }

    // Category Validation
    if (!data.category) {
      errs.category = 'Please select a category.';
    }

    // Target Validation
    if (data.target === '' || data.target === null || data.target === undefined) {
      errs.target = 'Target is required.';
    } else {
      const numTarget = Number(data.target);
      if (isNaN(numTarget) || numTarget <= 0) {
        errs.target = 'Target must be greater than 0.';
      }
    }

    // Unit Validation
    if (!data.unit) {
      errs.unit = 'Please select a unit.';
    }

    // Frequency Validation
    if (!data.frequency) {
      errs.frequency = 'Please select a frequency.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Clear error for field once user types valid value
      if (touched[name]) {
        const validationErrors = validate(updated);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validationErrors[name] || ''
        }));
      }
      return updated;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] || '' }));
  };

  const handleIconSelect = (emoji) => {
    setFormData((prev) => ({ ...prev, icon: emoji }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      name: true,
      category: true,
      target: true,
      unit: true,
      frequency: true
    });

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clean data before submitting
    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      target: Number(formData.target),
      description: formData.description.trim()
    };

    onSubmit(cleanedData);
  };

  return (
    <div className="form-card">
      <div className="page-header" style={{ marginBottom: '1.75rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '1.5rem' }}>{title}</h1>
          <p className="page-subtitle">Fill in the details below to configure your habit.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Habit Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Habit Name <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? 'has-error' : ''}`}
            placeholder="e.g. Reading, Morning Exercise, Drink Water"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={50}
          />
          {errors.name && (
            <span className="form-error">
              <AlertCircle size={14} />
              {errors.name}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category ? 'has-error' : ''}`}
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="form-error">
              <AlertCircle size={14} />
              {errors.category}
            </span>
          )}
        </div>

        {/* Target and Unit in two columns */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="target" className="form-label">
              Target Value <span className="required">*</span>
            </label>
            <input
              id="target"
              name="target"
              type="number"
              min="1"
              step="1"
              className={`form-input ${errors.target ? 'has-error' : ''}`}
              placeholder="e.g. 30"
              value={formData.target}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.target && (
              <span className="form-error">
                <AlertCircle size={14} />
                {errors.target}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="unit" className="form-label">
              Unit <span className="required">*</span>
            </label>
            <select
              id="unit"
              name="unit"
              className={`form-select ${errors.unit ? 'has-error' : ''}`}
              value={formData.unit}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors.unit && (
              <span className="form-error">
                <AlertCircle size={14} />
                {errors.unit}
              </span>
            )}
          </div>
        </div>

        {/* Frequency */}
        <div className="form-group">
          <label htmlFor="frequency" className="form-label">
            Frequency <span className="required">*</span>
          </label>
          <select
            id="frequency"
            name="frequency"
            className={`form-select ${errors.frequency ? 'has-error' : ''}`}
            value={formData.frequency}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {FREQUENCIES.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
          {errors.frequency && (
            <span className="form-error">
              <AlertCircle size={14} />
              {errors.frequency}
            </span>
          )}
        </div>

        {/* Icon Picker */}
        <div className="form-group">
          <label className="form-label">Choose an Icon</label>
          <div className="icon-picker-grid">
            {ICON_OPTIONS.map((item) => {
              const isSelected = formData.icon === item.emoji;
              return (
                <button
                  type="button"
                  key={item.label}
                  className={`icon-choice-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleIconSelect(item.emoji)}
                  aria-pressed={isSelected}
                >
                  <span className="emoji">{item.emoji}</span>
                  <span className="label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description (Optional) */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="form-textarea"
            placeholder="Add any helpful notes, routine schedule, or motivation..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/habits')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Check size={18} />
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
