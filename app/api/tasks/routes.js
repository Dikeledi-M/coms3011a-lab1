import { NextResponse } from "next/server";
import db from "../../database/db"


export async function POST(request){

    const task = await request.json();

    const{title,description,due_date,topic,status} = task;

    const result = db.prepare('INSERT INTO task (title, description, due_date, topic, status) VALUES (?,?,?,?,?)').run(title, description, due_date,topic,status);

    if (result.changes === 1){
        return NextResponse.json({
            message: "Task added successfully!"
        });
    }
    else{
        return NextResponse.json({
            message: "Failed to add task!"
        })
    }
}