import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import HabitForm from '../components/HabitForm';

const EditHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHabitById, editHabit } = useHabits();

  const habit = getHabitById(id);

  if (!habit) {
    return (
      <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div className="modal-icon-wrap" style={{ margin: '0 auto 1rem' }}>
          <AlertCircle size={28} />
        </div>
        <h2 className="modal-title">Habit Not Found</h2>
        <p className="modal-text">
          The habit you are trying to edit does not exist or may have been deleted.
        </p>
        <Link to="/habits" className="btn btn-primary" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={16} />
          <span>Back to My Habits</span>
        </Link>
      </div>
    );
  }

  const handleUpdateHabit = (formData) => {
    editHabit(id, formData);
    navigate('/habits');
  };

  return (
    <div className="edit-habit-page">
      <HabitForm
        initialData={habit}
        title={`Edit Habit: ${habit.name}`}
        submitButtonText="Update Habit"
        onSubmit={handleUpdateHabit}
      />
    </div>
  );
};

export default EditHabit;
