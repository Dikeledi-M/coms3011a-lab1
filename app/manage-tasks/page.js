"use client";

import styles from "./page.module.css"

import { useEffect } from "react";

import { useState } from "react";

import Link from "next/link";

export default function TasksPage(){
    const [tasks, setTasks] = useState([]);
    const[filter, setFilter] = useState("active");

    useEffect(() =>{
        async function fetchTasks(){
            const response = await fetch(`/api/tasks?filter=${filter}`);
            const data = await response.json();

            setTasks(data);
        }

        fetchTasks();


    }, [filter])

    async function  handleArchive(id) {
        const response = await fetch(`/api/tasks/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "archive"
            })
        });

        const data = await response.json();

        if (response.ok){
            alert(data.message);
            window.location.reload();
        }else{
            alert("Failed to archive task!");
        } 
    }

    async function handleUnarchive(id){
        const response = await fetch(`/api/tasks/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                action: "unarchive"
            })
        });

        const data = await response.json();
        if(response.ok){
            alert(data.message);
            window.location.reload();

        }else{
            alert("Failed to unarchive task!")
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
                {task.archived == 0 && (
                <>
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
                
                </>
            )}

            {task.archived === 1 &&(
                <button
                    className={styles.archiveBtn}
                    onClick={()=>handleUnarchive(task.id)}
                >
                    Unarchive

                </button>
            )}
                

            </div>
            
        </div>
    ));

    let message;
    if (filter === "active"){
        message = "These are your active tasks";
    }
    else if (filter === "archived"){
        message = "These are your archived tasks";
    }
    else{
        message = "These are all your tasks";
    }

    return(
        <main className={styles.page}>
            <h1 className={styles.title}>My Tasks</h1>
            <p className={styles.pageMessage}>Manage And Keep Track Of Your Tasks. </p>
             <div className={styles.filters}>

                <button 
                    onClick={() => setFilter("active")}>
                    Active Tasks
                </button>

                <button onClick={() => setFilter("archived")}>
                    Archived Tasks
                </button>

                <button onClick={() => setFilter("all")}>
                    All Tasks
                </button>

            </div>
            <p className={styles.taskMessage}>{message}</p>

            <div className={styles.taskList}>
                {taskList}
            </div>
        </main>
    )

}