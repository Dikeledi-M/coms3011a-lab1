import { NextResponse } from "next/server";
import db from "../../../database/db"

export async function GET(request, {params}){
    const {id} = await params;

    const task = db.prepare("SELECT * FROM task WHERE id = ?").get(id);

    if (task){
        return NextResponse.json(task);
    }
    else{
        return NextResponse.json(
            {message: "Task Not Found!"},
            {status: 404}
        );
    }
}

export async function PUT(request, {params}) {
    const {id} = await params;
    const task = await request.json();

    const {title,description, due_date,topic,status} = task;
    const result = db.prepare('UPDATE task SET title = ?, description = ?, due_date = ?, topic = ?, status = ? WHERE id = ?').run(title,description,due_date,topic,status,id);
    
    if (result.changes === 1){
        return NextResponse.json({
            message: "Task updated successfully!"
        });
    }else{
        return NextResponse.json(
            {
                message: "Task update failed!"
            },
            {
                status: 404
            }
        );
    }
    
}

export async function PATCH(request, {params}){
    const {id} = await params;
    const {action} = await request.json();

    let result;

    if (action === "archive"){
        result = db.prepare("UPDATE task SET archived = 1 WHERE id = ?").run(id);

    }
    else if (action === "unarchive"){
        result = db.prepare("UPDATE task SET archived = 0 WHERE id = ?").run(id);
    }
    else{
        return NextResponse.json(
            {message: "Invalid request!"},
            {status: 400}
        );
    }

    if (result.changes === 1){
        return NextResponse.json({
            message: `Task ${action}d successfully!`
        });
    }
    else{
        return NextResponse.json(
            {message: "Task Not Found!"},
            {status: 404}
        );
    }
    
}