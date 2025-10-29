# Task Management App

## Overview
The Task Management App is a simple web application that allows users to manage daily tasks efficiently. we can add tasks,  them, Update tasks, update overdue tasks, and remove  tasks also.
## tools
* HTML
* CSS
* JavaScript
* localStorage to store data across sessions.

## Features

* Add New Task: Users can input task name, category, status, and deadline.

* Edit Task Status: Update the status of a task inline.

* Delete Task: Remove a task completely from the list and localStorage.

* Filter Tasks: Filter tasks by category or status.

* Overdue Update: Tasks with a past deadline are marked as "Overdue".

* LocalStorageTasks remain saved even after refreshing the page.

* Add notifications for overdue tasks.
## Reflection
  ### Challenges
  Initially, handling clicks on tasks for both editing and deleting caused conflicts.
  ### How I Approached Solving These Challenges
   Detect which task was clicked and show an inline input for updating its status.
   Ask for confirmation and remove the correct task from both the array and the display.
   Use the event handler logic to check deadlines and set the status to "Overdue" when appropriate.
  ### Future Improvements
    Display the local stored data automaticl after each session.
    Add priority levels for tasks.
