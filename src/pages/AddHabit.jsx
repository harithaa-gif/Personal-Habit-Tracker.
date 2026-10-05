import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../context/HabitContext';
import HabitForm from '../components/HabitForm';

const AddHabit = () => {
  const navigate = useNavigate();
  const { addHabit } = useHabits();

  const handleCreateHabit = (formData) => {
    addHabit(formData);
    // Redirect to /habits where new habit appears immediately
    navigate('/habits');
  };

  return (
    <div className="add-habit-page">
      <HabitForm
        title="Create New Habit"
        submitButtonText="Create Habit"
        onSubmit={handleCreateHabit}
      />
    </div>
  );
};

export default AddHabit;
