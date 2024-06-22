import { ChangeEvent, useCallback } from "react";
import React from "react";

import { EditableSpan } from "./EditableSpan";

import { getListItemSx } from "./todolist/Todolist.styles";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';

import { changeTaskStatusTC, changeTaskTitleTC, removeTaskTC } from "../middleware/tasks-reducer";
import { TaskStatuses, TaskType } from "../api/todolists-api";
import { useAppDispatch } from "../hooks/hooks";

type TaskPropsType = {
    todolistID: string
    task: TaskType
};

export const Task = React.memo(({todolistID, task}: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistID, task.id))
    }, [task.id, todolistID])
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(changeTaskStatusTC(todolistID, task.id, newStatus))
    }, [task.id, todolistID])
    const changeTaskTitleHandler = useCallback(( title: string ) => {
        dispatch(changeTaskTitleTC(todolistID, task.id, title))
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