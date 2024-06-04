import { ChangeEvent, useCallback } from "react";
import React from "react";

import { EditableSpan } from "./EditableSpan";

import { getListItemSx } from "./todolist/Todolist.styles";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';

import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../state/tasks-reducer";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskType } from "../api/todolists-api";

type TaskPropsType = {
    todolistID: string
    task: TaskType
};

export const Task = React.memo(({todolistID, task}: TaskPropsType) => {
    const dispatch = useDispatch();
    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistID))
    }, [task.id, todolistID])
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(changeTaskStatusAC(task.id, newStatus, todolistID))
    }, [task.id, todolistID])
    const changeTaskTitleHandler = useCallback(( title: string ) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistID))
    }, [task.id, todolistID])

    return (
    <ListItem 
    key={task.id} 
    sx={getListItemSx(task.status === TaskStatuses.Completed)}
    >
        <div>
            <Checkbox 
            onChange={changeStatusHandler} 
            checked={task.status === TaskStatuses.Completed} />
            <EditableSpan 
            value={task.title} 
            onChange={changeTaskTitleHandler}/>
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    </ListItem>
)
})