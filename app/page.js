import styles from "./page.module.css"

export default function Home(){
  return(
    <main className={styles.page}> 
      <div className={styles.todoApp}>
        <h1 className={styles.appTitle}>ToDo App</h1>
      </div>
    </main>
  );
}