"use client";

import styles from "./page.module.css"

import { useEffect } from "react";

import { useState } from "react";

import Link from "next/link";

export default function TasksPage(){
    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        async function fetchTasks(){
            const response = await fetch('/api/tasks');
            const data = await response.json();

            setTasks(data);
        }

        fetchTasks();


    }, [])

    async function  handleArchive(id) {
        const response = await fetch(`/api/tasks/${id}`,{
            method: "PATCH"
        });

        const data = await response.json();

        if (response.ok){
            alert(data.message);
            window.location.reload();
        }else{
            alert("Failed to archive task!");
        } 
    }

    const taskList = tasks.map((task)=>(
        <div className={styles.taskCard} key = {task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Topic: {task.topic}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.status}</p>

            <div className={styles.taskActions}>
                <Link 
                    href={`/manage-tasks/edit/${task.id}`}
                    className={styles.editBtn}
                >
                    Edit
                </Link>

                <button
                    className={styles.archiveBtn}
                    onClick={()=> handleArchive(task.id)}
                >
                Archive

                </button>

            </div>
            
        </div>
    ));

    return(
        <main className={styles.page}>
            <h1 className={styles.title}>My Tasks</h1>
            <div className={styles.taskList}>
                {taskList}
            </div>
        </main>
    )

}