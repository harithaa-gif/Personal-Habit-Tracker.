import { formatDate } from '../utils/habitUtils';

// Helper to get past date string (n days ago)
const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

// Generate relative dates for sample streaks and realistic weekly progress
const todayStr = getPastDate(0);
const yesterdayStr = getPastDate(1);
const day2Str = getPastDate(2);
const day3Str = getPastDate(3);
const day4Str = getPastDate(4);
const day5Str = getPastDate(5);
const day6Str = getPastDate(6);

export const DEFAULT_HABITS = [
  {
    id: 'habit-1',
    name: 'Reading',
    category: 'Study',
    target: 30,
    unit: 'Minutes',
    frequency: 'Daily',
    icon: '📚',
    description: 'Read educational or fiction books every evening before bed.',
    createdAt: day6Str,
    // 5 day streak prior to today (yesterday and earlier completed, pending today)
    completionHistory: [yesterdayStr, day2Str, day3Str, day4Str, day5Str]
  },
  {
    id: 'habit-2',
    name: 'Morning Exercise',
    category: 'Fitness',
    target: 30,
    unit: 'Minutes',
    frequency: 'Daily',
    icon: '🏃',
    description: 'Quick cardio, stretching, and bodyweight workout to kickstart the day.',
    createdAt: day6Str,
    // 3 day streak prior to today (pending today)
    completionHistory: [yesterdayStr, day2Str, day3Str]
  },
  {
    id: 'habit-3',
    name: 'Drink Water',
    category: 'Health',
    target: 8,
    unit: 'Glasses',
    frequency: 'Daily',
    icon: '💧',
    description: 'Stay hydrated throughout the day with regular water intake.',
    createdAt: day6Str,
    // 7 day streak including today (already completed today)
    completionHistory: [todayStr, yesterdayStr, day2Str, day3Str, day4Str, day5Str, day6Str]
  },
  {
    id: 'habit-4',
    name: 'Meditation',
    category: 'Wellness',
    target: 10,
    unit: 'Minutes',
    frequency: 'Daily',
    icon: '🧘',
    description: 'Mindfulness breathing and mental relaxation session.',
    createdAt: day6Str,
    // 4 day streak including today (already completed today)
    completionHistory: [todayStr, yesterdayStr, day2Str, day3Str]
  },
  {
    id: 'habit-5',
    name: 'Coding Practice',
    category: 'Productivity',
    target: 1,
    unit: 'Hours',
    frequency: 'Daily',
    icon: '💻',
    description: 'Solve DSA questions or contribute to personal web development projects.',
    createdAt: day6Str,
    // 2 day streak prior to today (pending today)
    completionHistory: [yesterdayStr, day2Str]
  },
  {
    id: 'habit-6',
    name: 'Walking',
    category: 'Fitness',
    target: 6000,
    unit: 'Steps',
    frequency: 'Daily',
    icon: '🚶',
    description: 'Evening brisk walk around campus or neighborhood.',
    createdAt: day6Str,
    // 4 day streak prior to today (pending today)
    completionHistory: [yesterdayStr, day2Str, day3Str, day4Str]
  }
];
