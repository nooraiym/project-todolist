import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}


function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()
  
  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])
  
  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })


const removeTodolist = (todolistID:string) => {
  const newTodolists = todolists.filter(tl => tl.id !== todolistID);
  setTodolists(newTodolists);
  delete tasks[todolistID];
  setTasks({ ...tasks });
}

const changeFilter = (todolistID:string,newFilter: FilterValuesType) => {
  // const curentTodolist=todolists.find(el=>el.id===todolistID)
  // if(curentTodolist){
  //     curentTodolist.filter=newFilter
  //     setTodolists([...todolists])//345
  // }

  setTodolists(todolists.map(el => el.id === todolistID
    ? {...el, filter: newFilter}
    : el)
)
}

const removeTask = (todolistID: string, taskId: string) => {
  setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el=>el.id!==taskId)})
}

const addTask = (todolistID: string, title: string) => {
  const newTask = {id: v1(), title: title, isDone: false}
  setTasks((prevState)=>({...prevState, [todolistID]: [newTask,...prevState[todolistID]]}))
}

const changeStatus = (todolistID: string,taskId: string, taskStatus: boolean) => {
  setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ?{...el,isDone:taskStatus} :el)})
  // методом find
  // let task = tasks.find( t => t.id === taskId );
  // if (task) {
  //   task.isDone = taskStatus;
  // }
  // setTasks([...tasks]);

  // методом map
  // const newState = tasks.map( t => (t.id === taskId ? {...t, isDone: taskStatus} : t));
  // setTasks(newState);
}


  return (
    <div className="App">

    {todolists.map(el => {

      let filteredTasks = tasks[el.id];
      if ( el.filter === "completed") {
        filteredTasks = tasks[el.id].filter( t => t.isDone === true)
      }
      if ( el.filter === "active") {
        filteredTasks = tasks[el.id].filter( t => t.isDone === false)
      }

      return (
        <Todolist 
          key={el.id}
          todolistID={el.id}
          title={el.title} 
          tasks={filteredTasks} 
          removeTodolist={removeTodolist}
          removeTask={removeTask} 
          functionForButton={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={el.filter}
      />
      )
  })}
    </div>
  );
}

export default App;
