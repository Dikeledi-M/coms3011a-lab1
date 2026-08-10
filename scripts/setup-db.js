import Database from "better-sqlite3";

const db = new Database("./app/database/todo.db");

db.exec(`CREATE TABLE IF NOT EXISTS task(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT NOT NULL,
    topic TEXT NOT NULL,
    status TEXT NOT NULL,
    archived INTEGER NOT NULL DEFAULT 0
    );
    `);

db.close();

console.log("Database SetUp Complete!");