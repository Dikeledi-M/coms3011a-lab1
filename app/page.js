import styles from "./page.module.css"

export default function Home(){
  return(
    <main className={styles.page}> 
      <div className={styles.todoApp}>
        <h1 className={styles.appTitle}>ToDo App</h1>
        <p className={styles.welcomeMessage}>Stay Organised, One task at a time.</p>

        <h2 className={styles.actionMessage}> Add A Task </h2>

        <form className={styles.taskForm}>
          <div className= {styles.inputField}>
            <label>
            Title: <input type = "text" placeholder="Please add the title of your task" />
            </label>

          </div>

          <div className={styles.inputField}>
            <label>
            Description: <textarea placeholder="Please add the description of your task" />
            </label>
          </div>

          <div className={styles.inputField}>
            <label>
            Due Date: <input type="date" placeholder="Please add the due date of your task"/>
            </label>
          </div>


          <div className={styles.inputField}>
            <label>
            Topic: <input type="text" placeholder="Please add the topic related to your task eg. ComSci (Analysis of Algorithms), Arts (Film and Television) etc"/>
            </label>
          </div>


          <div className={styles.inputField}>
            
          <label>
            Status:
            <select>
              <option>Select the status of your task</option>
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