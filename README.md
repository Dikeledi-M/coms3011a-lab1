# COMS3011A Lab 1 - Todo Application

A local-first todo application built using Next.js and SQLite. The application allows a single user to create, edit, archive, view, and organise tasks. All task information is stored locally using SQLite and remains available after restarting the application.

---

## Third-Party Code

### Next.js
Next.js was used as the web application framework because it provides the structure for building the application, including routing and server-side functionality.

### React
React was used to build the user interface and manage interactive elements such as task forms, filters, and sorting options.

### better-sqlite3
better-sqlite3 was used to connect the application to SQLite. It provides a simple way to perform database operations using Node.js while keeping the application local-first.

### Vitest
Vitest was used for automated testing because it provides a lightweight testing framework for JavaScript applications and allows the task functionality to be tested using a temporary database.

---

## Database Design

The application uses a SQLite database with one table called `task`.

### Task Table

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Unique identifier for each task and primary key |
| title | TEXT | The name/title of the task |
| description | TEXT | Additional details about the task |
| due_date | TEXT | The deadline of the task |
| topic | TEXT | The category or topic of the task |
| status | TEXT | The current status of the task (`Todo`, `In-Progress`, or `Complete`) |
| archived | INTEGER | Indicates whether a task is archived (`0` for active and `1` for archived) |

The application only requires one table because tasks do not have relationships with other entities.

Tasks are not deleted when archived. Instead, the `archived` column is updated, allowing archived tasks to remain available for viewing.

Overdue tasks are not stored as a separate field or status. They are calculated dynamically using the task due date and current date.

---

## Running It

### Requirements

- Node.js v24.13.1

### Clone the Repository

```bash
git clone https://github.com/Dikeledi-M/coms3011a-lab1.git
cd coms3011a-lab1

```

### Install Dependencies
Install all required packages by running: 

```bash
npm install

```

### Setup Database
Create the SQLite database using the setup script:

```bash
npm run setup-db

```

### Run the Application
Start the development server:

```bash
npm run dev

```
The application will be available at

```bash
http://localhost:3000

```

### Run Tests
Run the automated tests using:

```bash
npm test

```
The tests use a temporary/throwaway in-memory SQLite database, so they do not depend on existing database data.

## Features
The application supports:
- Creating tasks with:
  - Title
  - Description
  - Due date
  - Topic
  -  Status

- Editing existing tasks

- Archiving tasks without deleting them

- Viewing:
  - Active Tasks
  - Archived Tasks
  - All tasks

- Sorting tasks by:
  - Title
  - Topic
  - Status
  - Due date

- Indicating overdue tasks while keeping overdue separate from task statuses.
- Persistent storage using SQLite
  
