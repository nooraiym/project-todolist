import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  functionForButton: (value: FilterValuesType ) => void
  addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // functions for events
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if( e.ctrlKey && e.key === "Enter") { 
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
  }}

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle ("");
  }

  const onAllClickHandler = () => props.functionForButton("all");
  const onActiveClickHandler = () => props.functionForButton("active");
  const onCompletedClickHandler = () => props.functionForButton("completed");


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input 
          value={newTaskTitle} 
          onChange={onNewTitleChangeHandler} 
          onKeyDown={onKeyDownHandler} />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map( t => {
          const removeTaskHandler = () => props.removeTask(t.id);

          return <li key={t.id}>
          <input type="checkbox" checked={t.isDone} />
          <span>{t.title}</span>
          <button onClick={removeTaskHandler}>x</button>
        </li>
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler} >All</button>
        <button onClick={onActiveClickHandler} >Active</button>
        <button onClick={onCompletedClickHandler} >Completed</button>
      </div>
    </div>
  );
}