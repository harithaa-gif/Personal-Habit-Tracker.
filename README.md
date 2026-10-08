# HabitFlow – Personal Habit Tracker

## Project Description

HabitFlow is a ReactJS-based personal habit tracking application that helps users create, manage, and monitor daily habits such as reading, exercise, water intake, and meditation. Designed with a clean, calm wellness aesthetic and modern dashboard components, HabitFlow enables students and professionals to build consistency through interactive daily completions, visual progress indicators, and multi-day streak calculations.

---

## Features

- **Add Habits**: Create custom habits with targets, units, frequencies, custom icons, and optional descriptions.
- **Edit Habits**: Seamlessly update existing habit parameters while retaining completion history.
- **Delete Habits**: Safely remove habits with an interactive confirmation modal dialog.
- **Daily Habit Completion**: One-click toggling between pending and completed states with instant visual feedback.
- **Search**: Live instant search across habit names and categories.
- **Category Filtering**: Filter habits across Health, Fitness, Study, Wellness, Productivity, and Personal categories.
- **Completion Filtering**: Filter habits based on current day status (All, Completed Today, Pending Today).
- **Daily Progress**: Real-time KPI summary cards and dynamic progress bars displaying exact completion percentages.
- **Weekly Progress**: Custom CSS 7-day bar chart showing habit consistency for each day of the current week (Monday to Sunday).
- **Habit Streaks**: Consecutive day streak calculation algorithm that motivates users to maintain momentum.
- **LocalStorage Persistence**: Zero-backend architecture with reliable LocalStorage state synchronization.

---

## Technologies Used

- **ReactJS**: Component-based UI library (functional components and hooks).
- **JavaScript (ES6+)**: Array manipulation methods (`map`, `filter`, `find`, `reduce`), modules, object destructuring.
- **HTML5**: Semantic web markup (`header`, `main`, `footer`, `nav`, `section`, `aside`).
- **CSS3**: Modern responsive styling, custom CSS bar chart, smooth micro-animations, flexbox, and grid layouts.
- **React Router (v6)**: Client-side routing with clean declarative URL paths (`/`, `/habits`, `/add-habit`, `/edit-habit/:id`, `/progress`).
- **LocalStorage API**: Browser-native persistence ensuring data survives page reloads without a server.
- **Vite**: Next-generation, lightning-fast frontend build tool and dev server.

---

## React Concepts Used

- **Functional Components**: Clean, modern component architecture.
- **JSX**: Declarative syntax combining HTML structure with JavaScript expressions.
- **Props**: Passing data, callback actions, and configuration flags across parent and child components.
- **useState**: Managing local UI state (form inputs, validation errors, active filter pills, search queries, modals, mobile menu).
- **useEffect**: Loading data from `localStorage` on initial mount, auto-saving habit changes, and controlling toast dismiss timers.
- **Conditional Rendering**: Displaying completion status checkmarks, empty state cards, validation alerts, and delete confirmation dialogs.
- **Event Handling**: Form submissions, button clicks, keyboard shortcuts (e.g. Escape to close modal), and input change events.
- **Form Handling & Validation**: Controlled form inputs with inline error messaging preventing invalid submissions.
- **Array Methods**:
  - `map()`: Rendering habit lists, filter buttons, icon selectors, and weekly chart bars.
  - `filter()`: Filtering habits by search query, category, and today's completion status.
  - `find()`: Locating specific habits for editing via URL route parameters.
  - `reduce()`: Calculating weekly total completions and completion aggregates.

---

## Installation & Running Locally

1. Clone or download this project folder.
2. Open a terminal inside the project directory:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` (or the URL shown in your terminal).

---

## Application Workflow

```text
Dashboard
    ↓
View Today's Habits
    ↓
Mark Habit Complete
    ↓
Progress Updates (Percentage & Stats Recalculate Instantly)
    ↓
My Habits (Search & Filter Habits)
    ↓
Add / Edit / Delete Habit (Validation & Modal Confirmation)
    ↓
Progress Page (7-Day CSS Bar Chart & Streak Analytics)
    ↓
Weekly Summary Insights
```

---

## Project Structure

```text
skillbox/
├── index.html                   # HTML entry point with Google Fonts & favicon
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite development and build configuration
├── README.md                    # Project documentation
│
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application routes & layout wrapper
    │
    ├── components/              # Modular, reusable UI components
    │   ├── Navbar.jsx           # Responsive navigation bar with mobile menu
    │   ├── Footer.jsx           # Application footer with branding and author credit
    │   ├── HabitCard.jsx        # Habit card with completion toggle and actions
    │   ├── HabitForm.jsx        # Reusable habit creation and edit form
    │   ├── ProgressBar.jsx      # Animated accessible progress bar
    │   ├── SummaryCard.jsx      # Metric KPI summary card
    │   ├── SearchBar.jsx        # Dynamic live search input with clear button
    │   ├── CategoryFilter.jsx   # Category & completion status filter pills
    │   ├── ConfirmModal.jsx     # Accessible modal for deletion confirmation
    │   ├── EmptyState.jsx       # Illustrated empty states with call-to-actions
    │   └── Toast.jsx            # Action feedback notification banner
    │
    ├── context/
    │   └── HabitContext.jsx     # Global Habit context and LocalStorage manager
    │
    ├── data/
    │   └── defaultHabits.js     # 6 sample habits pre-loaded for immediate evaluation
    │
    ├── pages/                   # Application route pages
    │   ├── Dashboard.jsx        # Today's overview, progress card, and quick habits
    │   ├── Habits.jsx           # Full habit management with search and filters
    │   ├── AddHabit.jsx         # New habit creation page
    │   ├── EditHabit.jsx        # Existing habit editing page
    │   └── Progress.jsx         # 7-day consistency chart and weekly analytics
    │
    ├── styles/
    │   └── global.css           # Design system, CSS variables, and responsive layout
    │
    └── utils/
        └── habitUtils.js        # Streak calculation, date formatting, and metrics
```

---

## Screenshots

> *Add application screenshots below for assignment documentation and submission:*

1. **Dashboard View**
   *Displays greeting, today's KPI summary cards, interactive progress bar, and today's habit list.*
   `[Screenshot Placeholder: Dashboard Page]`

2. **My Habits & Filter View**
   *Demonstrates live search, category pills, completion filters, and habit management cards.*
   `[Screenshot Placeholder: My Habits Page with Search & Filters]`

3. **Add & Edit Habit Form**
   *Shows controlled form inputs, icon picker, target values, and inline validation messages.*
   `[Screenshot Placeholder: Habit Form & Validation]`

4. **Delete Confirmation Dialog**
   *Illustrates the interactive modal confirming permanent deletion.*
   `[Screenshot Placeholder: Delete Modal]`

5. **Progress & Weekly Bar Chart**
   *Visualizes weekly consistency across Monday to Sunday and active habit streaks.*
   `[Screenshot Placeholder: Weekly Progress Chart]`

---

## Author

**Haritha D**  
**Register Number:** RA2411003050144  
*Full Stack Web Development Individual Assignment*
