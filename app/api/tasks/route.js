import { NextResponse } from "next/server";
import db from "../../database/db";

export async function POST(request) {
  try {
    const task = await request.json();

    const { title, description, due_date, topic, status } = task;

    const result = db
      .prepare(
        "INSERT INTO task (title, description, due_date, topic, status) VALUES (?, ?, ?, ?, ?)"
      )
      .run(title, description, due_date, topic, status);

    return NextResponse.json({
      message: "Task added successfully!"
    });

  } catch (error) {
    console.log("DATABASE ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to add task",
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}

export async function GET(){

    const tasks = db.prepare("SELECT * FROM task").all();

    return NextResponse.json(tasks);

}
    
