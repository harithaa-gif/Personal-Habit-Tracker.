import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Flame, Award, Calendar, RotateCcw } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import {
  getTodaySummary,
  getWeeklyChartData,
  getWeeklyOverview
} from '../utils/habitUtils';
import SummaryCard from '../components/SummaryCard';
import EmptyState from '../components/EmptyState';

const Progress = () => {
  const { habits, resetToDefaultHabits } = useHabits();

  // Dynamic calculations
  const todaySummary = getTodaySummary(habits);
  const weeklyData = getWeeklyChartData(habits);
  const weeklyOverview = getWeeklyOverview(habits);

  return (
    <div className="progress-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Your Progress</h1>
          <p className="page-subtitle">See how consistent you've been this week.</p>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={resetToDefaultHabits}
          title="Restore sample habits and mock completion history"
        >
          <RotateCcw size={15} />
          <span>Reset Sample Data</span>
        </button>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          title="No habits to track yet."
          subtext="Add habits and begin marking them complete to view your progress analytics."
          actionButtonText="Create a Habit"
          onActionClick={() => window.location.assign('/add-habit')}
        />
      ) : (
        <>
          {/* 4 KPI Summary Cards */}
          <div className="summary-grid">
            <SummaryCard
              title="Total Habits"
              value={todaySummary.total}
              badge="Active tracking"
              icon={Target}
              iconBg="#EEECFE"
              iconColor="#6C63FF"
            />
            <SummaryCard
              title="Today's Completion"
              value={`${todaySummary.percentage}%`}
              badge={`${todaySummary.completed} of ${todaySummary.total} done`}
              icon={CheckCircle2}
              iconBg="#DCFCE7"
              iconColor="#16A34A"
            />
            <SummaryCard
              title="Current Best Streak"
              value={`${weeklyOverview.longestStreak} ${weeklyOverview.longestStreak === 1 ? 'Day' : 'Days'}`}
              badge="Highest active run"
              icon={Flame}
              iconBg="#FEF3C7"
              iconColor="#D97706"
            />
            <SummaryCard
              title="Weekly Completion"
              value={`${weeklyOverview.weeklyPercentage}%`}
              badge="Overall 7-day rate"
              icon={Award}
              iconBg="#F3E8FF"
              iconColor="#8B5CF6"
            />
          </div>

          {/* Weekly Progress Bar Chart (Custom CSS) */}
          <section className="chart-card" aria-label="Weekly completion bar chart">
            <div className="chart-header">
              <h2 className="chart-title">Weekly Habit Consistency</h2>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Current Week (Mon – Sun)
              </span>
            </div>

            {/* Custom CSS Bar Chart */}
            <div className="bar-chart-container">
              {weeklyData.map((item) => (
                <div
                  key={item.day}
                  className={`bar-column ${item.isToday ? 'is-today' : ''}`}
                >
                  <span className="bar-tooltip-percent">{item.percentage}%</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${item.percentage}%` }}
                      title={`${item.day} (${item.displayDate}): ${item.completedCount} of ${item.totalHabits} completed (${item.percentage}%)`}
                    />
                  </div>
                  <div className="bar-label-group">
                    <span className="bar-day-name">{item.day}</span>
                    <div className="bar-date-sub">{item.displayDate}</div>
                    {item.isToday && <span className="today-tag">Today</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Summary Insights */}
          <section className="chart-card" aria-label="Weekly Summary Statistics">
            <div className="chart-header">
              <h2 className="chart-title">Weekly Summary</h2>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Based on active completion history
              </span>
            </div>

            <div className="weekly-insights-grid">
              <div className="insight-item">
                <span className="insight-label">Habits Completed This Week</span>
                <span className="insight-val">{weeklyOverview.habitsCompletedThisWeek}</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Weekly Completion Rate</span>
                <span className="insight-val">{weeklyOverview.weeklyPercentage}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Longest Active Streak</span>
                <span className="insight-val">
                  {weeklyOverview.longestStreak} {weeklyOverview.longestStreak === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Most Consistent Habit</span>
                <span className="insight-val" style={{ fontSize: '1.25rem' }}>
                  {weeklyOverview.mostConsistentHabit}
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Progress;
