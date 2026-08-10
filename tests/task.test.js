import {describe, test, expect} from "vitest";
import Database from "better-sqlite3";

function createThrowAwayDatabase(){
    const db = new Database(":memory:");

    db.exec(`CREATE TABLE task(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT NOT NULL,
        topic TEXT NOT NULL,
        status TEXT NOT NULL,
        archived INTEGER NOT NULL DEFAULT 0
        );
    `);

    return db;

}

describe("Task database behaviour", ()=>{
    test("creates a task with all required fields", ()=>{
        const db = createThrowAwayDatabase();

        db.prepare(`INSERT INTO task (title,description,due_date,topic,status) VALUES (?,?,?,?,?)`).run("Study COMS3011A", "Finish testing", "2026-08-20", "University", "ToDo");

        const task = db.prepare("SELECT * FROM task WHERE title = ?").get("Study COMS3011A");

        expect(task.title).toBe("Study COMS3011A");
        expect(task.description).toBe("Finish testing");
        expect(task.due_date).toBe("2026-08-20");
        expect(task.topic).toBe("University");
        expect(task.status).toBe("ToDo");
        expect(task.archived).toBe(0);

        db.close();
    })

    test("archives a task without deleting it", ()=>{
        const db =  createThrowAwayDatabase();

        db.prepare(`INSERT INTO task (title, description, due_date, topic, status) VALUES (?,?,?,?,?)`).run("Archived Test", "Testing archive", "2026-08-11", "Testing", "ToDo");

        const task = db.prepare("SELECT *FROM task WHERE title = ?").get("Archived Test");

        db.prepare("UPDATE task SET archived = 1 WHERE id = ?").run(task.id);

        const archivedTask = db.prepare("SELECT * FROM task WHERE id = ?").get(task.id);

        expect(archivedTask).toBeDefined();
        expect(archivedTask.archived).toBe(1);

        db.close();
    })

    test("updates an existing task", ()=> {
        const db = createThrowAwayDatabase();

        db.prepare(`
            INSERT INTO task
            (title, description, due_date, topic, status)
            VALUES (?,?,?,?,?)
        `).run(
            "Old Title",
            "Old description",
            "2026-08-20",
            "University",
            "ToDo"
        );


        const task = db.prepare(
            "SELECT * FROM task WHERE title = ?"
        ).get("Old Title");


        db.prepare(`
            UPDATE task
            SET title = ?, status = ?
            WHERE id = ?
        `).run(
            "Updated Title",
            "Complete",
            task.id
        );


        const updatedTask = db.prepare(
            "SELECT * FROM task WHERE id = ?"
        ).get(task.id);


        expect(updatedTask.title).toBe("Updated Title");
        expect(updatedTask.status).toBe("Complete");


        db.close();
    });

    test("identifies overdue tasks", () => {
        const db = createThrowAwayDatabase();

        db.prepare(`
            INSERT INTO task 
            (title, description, due_date, topic, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            "Overdue Task",
            "Past deadline",
            "2026-08-01",
            "University",
            "ToDo"
        );


        const task = db.prepare(
            "SELECT * FROM task WHERE title = ?"
        ).get("Overdue Task");


        const today = new Date("2026-08-11");
        const dueDate = new Date(task.due_date);

        const days = (dueDate - today) / 86400000;


        expect(days).toBeLessThan(0);


        db.close();
    });
})