import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  removeTodolist: (todolistId: string) => void
  removeTask: (todolistID: string, id: string) => void
  functionForButton: (todolistID:string, value: FilterValuesType ) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  // functions for events
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if( e.ctrlKey && e.key === "Enter") { 
      props.addTask(props.todolistID, newTaskTitle);
      setNewTaskTitle("");
  }}
  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(props.todolistID, newTaskTitle.trim());
      setNewTaskTitle ("")
    } else {
      setError("Title is required");
    }
    ;
  }

  const onAllClickHandler = () => props.functionForButton(props.todolistID, "all");
  const onActiveClickHandler = () => props.functionForButton(props.todolistID, "active");
  const onCompletedClickHandler = () => props.functionForButton(props.todolistID, "completed");


  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={removeTodolistHandler}>x</button>
      <div>
        <input 
          value={newTaskTitle} 
          onChange={onNewTitleChangeHandler} 
          onKeyDown={onKeyDownHandler}
          className={error ? 'error' : ''} />
        <button onClick={addTaskHandler}>+</button>
        { error && <div className='error-message'>Title is required</div>}
      </div>
      <ul>
        {props.tasks.map( t => {
          const removeTaskHandler = () => props.removeTask(props.todolistID, t.id);
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked )
          }

          return <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
          <input type="checkbox" onChange={changeStatusHandler} checked={t.isDone} />
          <span>{t.title}</span>
          <button onClick={removeTaskHandler}>x</button>
        </li>
        })}
      </ul>
      <div>
        <button className={ props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler} >All</button>
        <button className={ props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler} >Active</button>
        <button className={ props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler} >Completed</button>
      </div>
    </div>
  );
}