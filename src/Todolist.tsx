import React from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  callBack: (id: number) => void
  functionForButton: (value: FilterValuesType ) => void
}

export function Todolist(props: TodolistPropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map( i => <li key={i.id}>
            <input type="checkbox" checked={i.isDone} />
            <span>{i.title}</span>
            <button onClick={ () => { props.callBack(i.id) } }>x</button>
          </li>)}
      </ul>
      <div>
        <button onClick={ () => { props.functionForButton("all")}} >All</button>
        <button onClick={ () => { props.functionForButton("active")}} >Active</button>
        <button onClick={ () => { props.functionForButton("completed")}} >Completed</button>
      </div>
    </div>
  );
}


// Смысл useState и перерисовка согласно данным
// 1. Добавляем onClick на кнопку
// 2. Создаем функцию callBack в месте, где лежат данные, для onClick
// 3. Передаем эту функцию ферез пропсы к месту, гд ележит кнопка. Не забываем передать ей данные
// 4. Cоздаем useState для того, чтобы следить за нашими данными
// 5. Ложим setTasks-функцию в нашу функцию для onClick, чтобы наши данные менялись
// ТО ЕСТЬ: у нас есть функция useState, которая следит за данными в нашей искомой большой компоненте и передается в другую функцию в подкомпоненте, которая уже вызывается при определенном событии в JSX-разметке (эту функцию мы передаем туда с помощью пропсов). И все эти данные не забываем типизировать. Исходя из события, происходит изменение данных, что приводит к новой отрисовке JSX на странице. Так и меняются компоненты. Это как цикл, круговорот выполнения функций.


// Меняем данные по нажатию на кнопку
// 1. Сначала делаем данные в исходной большой компоненте
// 2. Создаем useState привязанный к значениям наших кнопок
// 3. Создаем filter на разные значения
// 4. Передаем конечный массив данных в нашу JSX разметку через пропсы по обработчику событий
// 5. Проверяем нашу отрисовку в зависимости от данных
// Не забываем типизировать наши пропсы и данные, чтобы избежать ошибок