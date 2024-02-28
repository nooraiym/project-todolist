import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';



function App() {

let tasks1: Array<TaskType> = [
  {id: 1, title: "HTML & CSS", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 3, title: "React", isDone: false},
]

let tasks2 = [
  {id: 1, title: "Bananas", isDone: true},
  {id: 2, title: "Tomatoes", isDone: true},
  {id: 3, title: "Cheetos", isDone: false},
]

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="What to buy" tasks={tasks2} />
    </div>
  );
}

export default App;
