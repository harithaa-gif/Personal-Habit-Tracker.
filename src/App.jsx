import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider, useHabits } from './context/HabitContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import AddHabit from './pages/AddHabit';
import EditHabit from './pages/EditHabit';
import Progress from './pages/Progress';

// Inner component to access Toast from HabitContext
const AppContent = () => {
  const { toast, closeToast } = useHabits();

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/add-habit" element={<AddHabit />} />
          <Route path="/edit-habit/:id" element={<EditHabit />} />
          <Route path="/progress" element={<Progress />} />
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
};

function App() {
  return (
    <HabitProvider>
      <Router>
        <AppContent />
      </Router>
    </HabitProvider>
  );
}

export default App;
