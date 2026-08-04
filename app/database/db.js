import Database from "better-sqlite3";

const db = new Database("./app/database/todo.db");

export default db;