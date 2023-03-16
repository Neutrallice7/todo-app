import "../styles/todolist.css";
import { useState, onClose} from "react";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase"
import { async } from "@firebase/util";

function TodoList({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */
  const handleCheckedChange= async(e)=>{
    e.preventDefault();
    const todoDocRef= doc(db,"tasks",id)
   try{
      await updateDoc(todoDocRef,{
        completed:checked,
      })
      onClose()
    }catch(err){
     alert(err)
    }
  }
  /* function to delete a document from firstore */
  const handledelete= async(e)=>{
    e.preventDefault();
    const todoDocRef= doc(db,"tasks",id)
   try{
      await deleteDoc(todoDocRef)
      onClose()
    }catch(err){
      alert(err)
    }
  }
  return (
    <div className={`todoList ${checked && "todoList--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          type="checkbox"
          onChange={handleCheckedChange}
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="todoList__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="todoList__buttons">
          <div className="todoList__deleteNedit">
            <button
              className="todoList__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button onClick={handledelete} className="todoList__deleteButton">Delete</button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <Todo
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTodo
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default TodoList;
