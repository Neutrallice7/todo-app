import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState } from "react";
import {useEffect} from 'react';
import { db } from '../firebase';
import {collection, query, orderBy, onSnapshot, querySnapshot} from "firebase/firestore";

import Dashboard from "./Dashboard";

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([])
  /* function to get all tasks from firestore in realtime */
  useEffect(() =>{
    const q = query(collection(db, 'tasks'), orderBy('created','desc'));
    onSnapshot(q,(querySnapshot)=>{
      setTasks(querySnapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data()
      })))
    })
  })
  return (
    <div className="title">
      <header>Todo App</header>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="title">
          {tasks.map((task)=>(
            <TodoList
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title}
              description={task.data.description}
            />  
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
      <Dashboard />
    </div>
  );
}

export default Title;
