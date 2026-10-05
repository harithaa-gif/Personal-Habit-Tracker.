/**
 * Utility functions for HabitFlow
 * Handles date formatting, streak calculation, and progress metrics.
 */

// Helper to format a Date object into YYYY-MM-DD (local time)
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Returns today's date formatted as YYYY-MM-DD
export const getTodayDateString = () => {
  return formatDate(new Date());
};

// Checks if a habit was completed on a given date string (YYYY-MM-DD)
export const isHabitCompletedOnDate = (habit, dateStr) => {
  if (!habit || !Array.isArray(habit.completionHistory)) return false;
  return habit.completionHistory.includes(dateStr);
};

// Checks if a habit is completed today
export const isHabitCompletedToday = (habit) => {
  return isHabitCompletedOnDate(habit, getTodayDateString());
};

/**
 * Calculates current streak (consecutive days of completion).
 * If completed today, counts backwards from today.
 * If not completed today, checks if completed yesterday to keep active streak.
 */
export const calculateStreak = (habit) => {
  if (!habit || !Array.isArray(habit.completionHistory) || habit.completionHistory.length === 0) {
    return 0;
  }

  const historySet = new Set(habit.completionHistory);
  const todayStr = getTodayDateString();

  let checkDate = new Date();
  const completedToday = historySet.has(todayStr);

  if (!completedToday) {
    // If not completed today, see if yesterday was completed
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = formatDate(checkDate);
    if (!historySet.has(yesterdayStr)) {
      return 0; // Streak broken
    }
  }

  let streak = 0;
  // Count consecutive days backward
  while (true) {
    const dateStr = formatDate(checkDate);
    if (historySet.has(dateStr)) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Calculates today's summary metrics:
 * - totalHabits
 * - completedHabits
 * - remainingHabits
 * - completionPercentage
 */
export const getTodaySummary = (habits = []) => {
  const total = habits.length;
  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      remaining: 0,
      percentage: 0
    };
  }

  const completed = habits.filter((habit) => isHabitCompletedToday(habit)).length;
  const remaining = total - completed;
  const percentage = Math.round((completed / total) * 100);

  return {
    total,
    completed,
    remaining,
    percentage
  };
};

/**
 * Generates data for the 7 days of the current week (Monday through Sunday).
 */
export const getWeeklyChartData = (habits = []) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const todayStr = getTodayDateString();

  // Find Monday of the current week (JavaScript getDay: 0 is Sun, 1 is Mon... 6 is Sat)
  const currentDayOfWeek = today.getDay(); // 0-6
  // Distance from Monday: Sunday(0) -> 6 days back, Mon(1) -> 0 days, Tue(2) -> 1 day, etc.
  const distanceToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday);

  const totalHabits = habits.length;

  return dayNames.map((dayName, index) => {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + index);
    const dateStr = formatDate(dayDate);

    // Number of habits completed on this specific day
    const completedCount = habits.filter((habit) =>
      isHabitCompletedOnDate(habit, dateStr)
    ).length;

    const percentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

    return {
      day: dayName,
      date: dateStr,
      displayDate: `${dayDate.getDate()} ${dayDate.toLocaleString('default', { month: 'short' })}`,
      completedCount,
      totalHabits,
      percentage,
      isToday: dateStr === todayStr
    };
  });
};

/**
 * Computes weekly overview summary metrics:
 * - Habits completed this week
 * - Average weekly completion percentage
 * - Longest active streak
 * - Most consistent habit name
 */
export const getWeeklyOverview = (habits = []) => {
  if (habits.length === 0) {
    return {
      habitsCompletedThisWeek: 0,
      weeklyPercentage: 0,
      longestStreak: 0,
      mostConsistentHabit: 'None'
    };
  }

  const weeklyData = getWeeklyChartData(habits);
  const totalCompletionsThisWeek = weeklyData.reduce(
    (sum, item) => sum + item.completedCount,
    0
  );

  // Maximum possible completions for the week so far (up to 7 days * habits)
  const possibleCompletions = habits.length * 7;
  const weeklyPercentage = Math.round((totalCompletionsThisWeek / possibleCompletions) * 100);

  // Find longest active streak
  let longestStreak = 0;
  let mostConsistentHabit = habits[0].name;
  let highestCompletionsForHabit = -1;

  // Track week dates
  const weekDates = new Set(weeklyData.map((d) => d.date));

  habits.forEach((habit) => {
    const streak = calculateStreak(habit);
    if (streak > longestStreak) {
      longestStreak = streak;
    }

    // Count how many times this habit was done this week
    const thisWeekCompletions = (habit.completionHistory || []).filter((d) =>
      weekDates.has(d)
    ).length;

    if (thisWeekCompletions > highestCompletionsForHabit) {
      highestCompletionsForHabit = thisWeekCompletions;
      mostConsistentHabit = habit.name;
    }
  });

  return {
    habitsCompletedThisWeek: totalCompletionsThisWeek,
    weeklyPercentage,
    longestStreak,
    mostConsistentHabit
  };
};
