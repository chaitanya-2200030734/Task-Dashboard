# Task Management Dashboard

A complete task management application built with React.js, Redux Toolkit, and Tailwind CSS.

## Features

- **Task Management**: Add, edit, delete, and toggle task status
- **Filtering**: View all, pending, or completed tasks
- **Search**: Case-insensitive search by task title
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Mobile-first layout
- **Mock API**: JSON Server for backend simulation

## Tech Stack

- React.js (JavaScript)
- Redux Toolkit for state management
- Tailwind CSS for styling
- JSON Server for mock API
- Create React App

## Setup Instructions

1. **Clone or navigate to the project directory**

2. **Install dependencies**

   ```
   npm install
   ```

3. **Start the mock API server** (in a separate terminal)

   ```
   npm run server
   ```

   This starts JSON Server on `http://localhost:3001`

4. **Start the React app**
   ```
   npm start
   ```
   The app will run on `http://localhost:3000`

## Usage

- Add new tasks using the form at the top
- Use filters to view specific task statuses
- Search tasks by typing in the search bar
- Edit tasks by clicking the Edit button
- Toggle task status with the Complete/Pending button
- Delete tasks with the Delete button
- Switch themes using the theme toggle button

## Project Structure

```
src/
 ├── app/
 │   ├── store.js          # Redux store configuration
 │   └── hooks.js          # Custom hooks for dispatch and selector
 ├── features/
 │   └── tasks/
 │       ├── taskSlice.js      # Redux slice for tasks
 │       ├── taskThunks.js     # Async thunks for API calls
 │       ├── taskSelectors.js  # Selectors for computed state
 │       └── taskAPI.js        # API functions
 ├── components/
 │   ├── TaskList.jsx      # Displays list of tasks
 │   ├── TaskItem.jsx      # Individual task component
 │   ├── TaskForm.jsx      # Form for adding tasks
 │   ├── Filters.jsx       # Filter buttons
 │   ├── SearchBar.jsx     # Search input
 │   └── ThemeToggle.jsx   # Theme switcher
 ├── pages/
 │   └── Dashboard.jsx     # Main dashboard page
 ├── App.js                # Root component with Redux Provider
 ├── index.js              # App entry point
 └── index.css             # Tailwind CSS imports
```

## API Endpoints

The mock API provides the following endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Add a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

Task data model:

```json
{
  "id": "string",
  "title": "string",
  "status": "pending" | "completed",
  "createdAt": "string"
}
```
