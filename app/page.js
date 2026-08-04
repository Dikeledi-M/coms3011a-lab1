"use client";

import {useState} from "react";

import styles from "./page.module.css"


export default function Home(){

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  function handleTitleChange(e){
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value);
  }

  function handleTopicChange(e){
    setTopic(e.target.value);
  }

  function handleDueDateChange(e){
    setDueDate(e.target.value);
  }

  function handleStatusChange(e){
    setStatus(e.target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();

    const task = {
      title: title,
      description: description,
      due_date: due_date,
      topic: topic,
      status: status
    };

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();

    if (response.ok){
      alert(data.message);
      window.location.reload();
    }
    else{
      alert("Failed to add task!");
    }
  }



  return(
    <main className={styles.page}> 
      <div className={styles.todoApp}>
        <h1 className={styles.appTitle}>ToDo App</h1>
        <p className={styles.welcomeMessage}>Stay Organised, One task at a time.</p>

        <h2 className={styles.actionMessage}> Add A Task </h2>

        <form 
          className={styles.taskForm}
          onSubmit={handleSubmit}
        
        >
          <div className= {styles.inputField}>
            <label>
            Title: 
            <input 
              type = "text" 
              placeholder="Please add the title of your task" 
              value = {title}
              onChange = {handleTitleChange}
            />
            </label>

          </div>

          <div className={styles.inputField}>
            <label>
            Description: 
            <textarea 
              placeholder="Please add the description of your task" 
              value = {description}
              onChange={handleDescriptionChange}
            />

            </label>
          </div>

          <div className={styles.inputField}>
            <label>
            Due Date: 
            <input 
              type="date" 
              placeholder="Please add the due date of your task"
              value = {due_date}
              onChange={handleDueDateChange}  
            />
            </label>
          </div>


          <div className={styles.inputField}>
            <label>
            Topic: 
            <input 
              type="text" 
              placeholder="Please add the topic related to your task eg. ComSci (Analysis of Algorithms), Arts (Film and Television) etc"
              value={topic}
              onChange={handleTopicChange}  
            />
            </label>
          </div>


          <div className={styles.inputField}>
            
          <label>
            Status:
            <select
              value = {status}
              onChange = {handleStatusChange}
            >
              <option>Select the status of your task </option>
              <option>Todo</option>
              <option>In Progress</option>
              <option>Complete</option>
            </select>
          </label>

          </div>

       

          <button type = "submit" className={styles.addBtn}>
            Add Task
          </button>

        </form>

      </div>
    </main>
  );
}


