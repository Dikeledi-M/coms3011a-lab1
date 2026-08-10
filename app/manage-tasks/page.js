"use client";

import styles from "./page.module.css"

import { useEffect } from "react";

import { useState } from "react";

import Link from "next/link";

export default function TasksPage(){
    const [tasks, setTasks] = useState([]);
    const[filter, setFilter] = useState("active");
    const [sortBy, setSortBy] = useState("");

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

    const sortedTasks = [...tasks].sort((a,b)=>{
        if (sortBy === "topic"){
            return a.topic.localeCompare(b.topic);
        }
        else if (sortBy === "title"){
            return a.title.localeCompare(b.title);
        }
        else if (sortBy === "status"){
            const statusOrder = {
                "ToDo" : 1,
                "In-Progress": 2,
                "Complete": 3
            };

            return statusOrder[a.status] - statusOrder[b.status];
        }
        else if (sortBy === "due_date"){
            return a.due_date.localeCompare(b.due_date);
        }
        else{
            return 0;
        }
    })

   

    const taskList = sortedTasks.map((task)=>{
        const today = new Date();
        today.setHours(0,0,0,0);
        const dueDate = new Date(task.due_date +"T00:00:00");
        dueDate.setHours(0,0,0,0);
        const difference = dueDate - today;
        const days = difference / 86400000;

        let dueMessage = "";
        let dueClass = "";

        if (task.status != "Complete"){
            if (days < 0){
                dueMessage = `Overdue by ${Math.abs(days)} days`;
                dueClass = styles.overdue;
            }
            else if (days === 0){
                dueMessage = "Task Due Today";
                dueClass = styles.dueToday;
            }
            else if (days === 1){
                dueMessage = `Due in ${days} day`;
                dueClass = styles.dueSoon;
            }
            else if (days <= 7){
                dueMessage = `Due in ${days} days`;
                dueClass = styles.dueSoon;
            }
            else{
                dueMessage = "On Track";
                dueClass = styles.onTrack;
            }
        }

        return(
                <div className={styles.taskCard} key = {task.id}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Topic: {task.topic}</p>
                <p>Due Date: {task.due_date}</p>
                <p>Status: {task.status}</p>
                {dueMessage &&(
                    <p className = {dueClass}>{dueMessage}</p>
                )}

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
        )
       
    });

    let message;
    if (filter === "active"){
        message = "These are your active tasks.";
    }
    else if (filter === "archived"){
        message = "These are your archived tasks.";
    }
    else{
        message = "These are all your tasks.";
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
            <div className={styles.sortCard}>
                <label>
                    Sort By:
                    <select
                    value = {sortBy}
                    onChange = {(e)=> setSortBy(e.target.value)}
                    >
                        <option value="">No Sorting</option>
                        <option value = "title">Title</option>
                        <option value = "due_date">Due Date</option>
                        <option value = "topic">Topic</option>
                        <option value = "status">Status</option>
                        
                    </select>
                </label>

            </div>
            <p className={styles.taskMessage}>{message}</p>

            <div className={styles.taskList}>
                {taskList}
            </div>
        </main>
    )

}