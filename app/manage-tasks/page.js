"use client";

import styles from "./page.module.css"

import { useEffect } from "react";

import { useState } from "react";

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

    const taskList = tasks.map((task)=>(
        <div className={styles.taskCard} key = {task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Topic: {task.topic}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.status}</p>
            
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