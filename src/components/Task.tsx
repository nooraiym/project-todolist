import { ChangeEvent, useCallback } from "react";
import React from "react";

import { EditableSpan } from "./EditableSpan";

import { getListItemSx } from "./todolist/Todolist.styles";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';

import { removeTaskTC, updateTaskTC } from "../middleware/tasks-reducer";
import { DomainTaskType, TaskStatuses } from "../api/todolists-api";
import { useAppDispatch } from "../hooks/hooks";

type TaskPropsType = {
    todoID: string
    task: DomainTaskType
};

export const Task = React.memo(({todoID, task}: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(todoID, task.id))
    }, [task.id, todoID])
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        debugger
        let newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(todoID, task.id, { status: newStatus }))
    }, [])
    const changeTaskTitleHandler = useCallback(( title: string ) => {
        dispatch(updateTaskTC(todoID, task.id, { title }))
    }, [])

    return (
    <ListItem 
        key={task.id} 
        sx={getListItemSx(task.status === TaskStatuses.Completed)}
    >
        <div>
            <Checkbox 
                onChange={changeStatusHandler} 
                checked={task.status === TaskStatuses.Completed}
                disabled={task.entityStatus === 'loading'}
            />
            <EditableSpan 
                value={task.title} 
                onChange={changeTaskTitleHandler}
                disabled={task.entityStatus === 'loading'}
            />
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    </ListItem>
)
})