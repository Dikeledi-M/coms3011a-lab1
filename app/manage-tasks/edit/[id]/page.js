"use client";
import {useState, useEffect, use} from "react";
import styles from "./page.module.css";

export default function EditTaskPage({params}){
    const {id} = use(params);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");
    const [due_date, setDueDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(()=>{
        async function fetchTask(){
            const response = await fetch(`/api/tasks/${id}`);

            if(!response.ok){
                alert("Task Not Found!")
                return;
            }
            const task = await response.json();

            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.due_date);
            setStatus(task.status);
            setTopic(task.topic);
        }

        fetchTask();

    },[id]);

    async function handleSubmit(e){
        e.preventDefault();

        const task = {
            title,description,due_date,topic,status
        };

        const response = await fetch(`/api/tasks/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            window.location.reload();
        }else{
            alert("Failed to update task!");
        }
    }

    return(
        <main className={styles.page}>
            <div className={styles.todoApp}>
                <h1>Edit Task</h1>
                <form onSubmit={handleSubmit} className={styles.taskForm}>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <input
                        type="date"
                        value={due_date}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Complete</option>
                    </select>

                    <button  type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </main>
    )

}