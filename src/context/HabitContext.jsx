import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_HABITS } from '../data/defaultHabits';
import { getTodayDateString } from '../utils/habitUtils';

const STORAGE_KEY = 'habitflow_habits';

const HabitContext = createContext(null);

export const HabitProvider = ({ children }) => {
  // Load habits from LocalStorage or fall back to DEFAULT_HABITS
  const [habits, setHabits] = useState(() => {
    try {
      const savedHabits = localStorage.getItem(STORAGE_KEY);
      if (savedHabits) {
        const parsed = JSON.parse(savedHabits);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load habits from LocalStorage:', err);
    }
    return DEFAULT_HABITS;
  });

  // Toast feedback state for actions (Add, Edit, Delete)
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Sync to LocalStorage whenever habits state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (err) {
      console.error('Failed to save habits to LocalStorage:', err);
    }
  }, [habits]);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Add a new habit
  const addHabit = (habitData) => {
    const newHabit = {
      ...habitData,
      id: `habit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: getTodayDateString(),
      completionHistory: []
    };

    setHabits((prev) => [newHabit, ...prev]);
    showToast('Habit created successfully!', 'success');
    return newHabit;
  };

  // Edit an existing habit
  const editHabit = (id, updatedData) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            ...updatedData,
            // Preserve creation date and completion history
            id: habit.id,
            createdAt: habit.createdAt,
            completionHistory: habit.completionHistory || []
          };
        }
        return habit;
      })
    );
    showToast('Habit updated successfully!', 'success');
  };

  // Delete a habit
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    showToast('Habit deleted successfully!', 'info');
  };

  // Toggle habit completion for a specific date (defaults to today)
  const toggleHabitCompletion = (id, targetDate = getTodayDateString()) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const history = Array.isArray(habit.completionHistory) ? habit.completionHistory : [];
        const isCompleted = history.includes(targetDate);

        const updatedHistory = isCompleted
          ? history.filter((d) => d !== targetDate) // uncheck
          : [...history, targetDate]; // check

        return {
          ...habit,
          completionHistory: updatedHistory
        };
      })
    );
  };

  // Reset to default sample habits (useful for evaluation / testing)
  const resetToDefaultHabits = () => {
    setHabits(DEFAULT_HABITS);
    showToast('Sample habits restored!', 'info');
  };

  // Find a single habit by ID
  const getHabitById = (id) => {
    return habits.find((h) => h.id === id);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        editHabit,
        deleteHabit,
        toggleHabitCompletion,
        resetToDefaultHabits,
        getHabitById,
        toast,
        showToast,
        closeToast
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

// Custom hook for consuming HabitContext
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
