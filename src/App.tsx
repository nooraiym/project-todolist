import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';


export type FilterValuesType = "all" | "active" | "completed"


function App() {

let [tasks, setTasks] = useState<Array<TaskType>>([
  {id: 1, title: "HTML & CSS", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 3, title: "React", isDone: false},
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

function removeTask(id: number) {
  let resultTasks = tasks.filter( t => t.id !== id);
  setTasks(resultTasks);
}



  return (
    <div className="App">
      <Todolist title="What to learn" tasks={filteredTasks} callBack={removeTask} functionForButton={changeFilter} />
    </div>
  );
}

export default App;
