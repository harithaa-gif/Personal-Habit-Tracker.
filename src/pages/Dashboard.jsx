import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, CheckCircle2, Clock, CalendarDays, TrendingUp } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { getTodaySummary } from '../utils/habitUtils';
import SummaryCard from '../components/SummaryCard';
import ProgressBar from '../components/ProgressBar';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const navigate = useNavigate();
  const { habits, toggleHabitCompletion } = useHabits();

  // Dynamic calculations for Today's progress
  const summary = getTodaySummary(habits);

  return (
    <div className="dashboard-page">
      {/* Header and Quick Add Button */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Good Day!</h1>
          <p className="page-subtitle">Stay consistent and complete your habits for today.</p>
        </div>
        <Link to="/add-habit" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>+ Add New Habit</span>
        </Link>
      </div>

      {/* 4 Summary Cards */}
      <div className="summary-grid">
        <SummaryCard
          title="Today's Habits"
          value={summary.total}
          badge="Total planned"
          icon={CalendarDays}
          iconBg="#EEECFE"
          iconColor="#6C63FF"
        />
        <SummaryCard
          title="Completed"
          value={summary.completed}
          badge="Done so far"
          icon={CheckCircle2}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />
        <SummaryCard
          title="Remaining"
          value={summary.remaining}
          badge="Awaiting action"
          icon={Clock}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />
        <SummaryCard
          title="Completion Rate"
          value={`${summary.percentage}%`}
          badge={summary.percentage === 100 ? 'All done!' : 'Keep going!'}
          icon={TrendingUp}
          iconBg="#F3E8FF"
          iconColor="#8B5CF6"
        />
      </div>

      {/* Today's Progress Card */}
      <section className="progress-hero-card" aria-label="Today's Progress Tracker">
        <div className="progress-hero-header">
          <h2 className="progress-hero-title">Today's Progress</h2>
          <span className="progress-hero-fraction">
            {summary.completed} of {summary.total} habits completed
          </span>
        </div>

        <ProgressBar percentage={summary.percentage} height={14} />

        <div className="progress-hero-meta">
          <span>
            {summary.total === 0
              ? 'No habits added yet'
              : summary.completed === summary.total
              ? 'Awesome! You achieved 100% of your daily goals today! 🎉'
              : `${summary.remaining} ${summary.remaining === 1 ? 'habit' : 'habits'} left to finish`}
          </span>
          <span className="progress-hero-percent">{summary.percentage}%</span>
        </div>
      </section>

      {/* Today's Habits Section */}
      <section aria-labelledby="todays-habits-title">
        <div className="section-title-wrap">
          <h2 id="todays-habits-title" className="section-title">Today's Habits</h2>
          {habits.length > 0 && (
            <Link to="/habits" className="btn btn-outline btn-sm">
              Manage All Habits
            </Link>
          )}
        </div>

        {habits.length === 0 ? (
          <EmptyState
            title="No habits yet."
            subtext="Create your first habit and start building consistency."
            actionButtonText="Create Habit"
            onActionClick={() => navigate('/add-habit')}
          />
        ) : (
          <div className="habits-grid">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleComplete={toggleHabitCompletion}
                showActions={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
