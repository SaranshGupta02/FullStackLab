# Lab 7 - ToDo List using useReducer

This project implements a ToDo List application using React's `useReducer` hook for state management.

## Features

- **useReducer Hook**: All state management is handled using the `useReducer` hook
- **Add Tasks**: Add new tasks through a text input with an Add button
- **Display in Table**: Tasks are displayed in a structured table format
- **Edit Tasks**: Edit existing tasks inline
- **Complete Tasks**: Mark tasks as complete or undo completion
- **Delete Tasks**: Remove tasks from the list
- **Serial Numbers**: Automatic numbering of tasks

## Table Structure

The tasks are displayed in a table with the following columns:

1. **S.No (Serial Number)**: Auto-incremented serial number for each task
2. **Task**: The task description
3. **Edit**: Button to edit the task (disabled when task is completed)
4. **Actions**: Contains two buttons:
   - **Complete/Undo**: Toggle task completion status
   - **Delete**: Remove the task from the list

## State Management

The application uses `useReducer` with the following action types:

- `ADD_TASK`: Add a new task to the list
- `EDIT_TASK`: Enable editing mode for a task
- `UPDATE_TASK`: Save the edited task
- `CANCEL_EDIT`: Cancel editing without saving
- `COMPLETE_TASK`: Toggle the completion status of a task
- `DELETE_TASK`: Remove a task from the list

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## How to Use

1. **Add a Task**: 
   - Type your task in the input field
   - Click "Add Task" button or press Enter

2. **Edit a Task**:
   - Click the "Edit" button in the Edit column
   - Modify the task in the input field that appears
   - Click "Save" to update or "Cancel" to discard changes

3. **Complete a Task**:
   - Click the "Complete" button in the Actions column
   - The task will be marked as completed (strikethrough style)
   - Click "Undo" to mark it as incomplete again

4. **Delete a Task**:
   - Click the "Delete" button in the Actions column
   - The task will be permanently removed from the list

## Implementation Details

- Each task has a unique ID (timestamp-based)
- Completed tasks are visually distinguished with strikethrough and reduced opacity
- Edit mode is disabled for completed tasks
- The table is fully responsive for mobile devices
- All state changes go through the reducer function for predictable state management

## Technologies Used

- React 18.2.0
- useReducer Hook
- CSS3 for styling
- Modern ES6+ JavaScript
