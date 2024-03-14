import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed"


function App() {

let [tasks, setTasks] = useState<Array<TaskType>>([
  {id: v1(), title: "HTML & CSS", isDone: true},
  {id: v1(), title: "JS", isDone: true},
  {id: v1(), title: "React", isDone: false},
]);

let [filter, setFilter] = useState<FilterValuesType>("all");

function changeFilter(value: FilterValuesType ) {
  setFilter(value);
}

let filteredTasks = tasks;
if ( filter === "completed") {
  filteredTasks = tasks.filter( t => t.isDone === true)
}
if ( filter === "active") {
  filteredTasks = tasks.filter( t => t.isDone === false)
}

function removeTask(id: string) {
  let resultTasks = tasks.filter( t => t.id !== id);
  setTasks(resultTasks);
}

function addTask (title: string) {
  let newTask = {id: v1(), title, isDone: false};
  let newTasks = [newTask, ...tasks];
  setTasks(newTasks);
}


  return (
    <div className="App">
      <Todolist 
        title="What to learn" 
        tasks={filteredTasks} 
        removeTask={removeTask} 
        functionForButton={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
