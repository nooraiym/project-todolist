import * as React from 'react';
import { AddItemForm } from '../AddItemForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Todolist } from './Todolist';

import { TodolistDomainType, addTodolistTC} from '../../middleware/todolist-reducer';
import { AppRootStateType } from '../../middleware/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useCallback } from 'react';

type TodolistListPropsType = {
  demo?: boolean
};

export const TodolistList = ({ demo = false } : TodolistListPropsType) => {
  const todolists = useAppSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  const dispatch = useAppDispatch()

  const addTodolist = useCallback((title: string) => dispatch(addTodolistTC(title)), [])
  const mappedTodolists = todolists.map(el => {
    return (
      <Grid key={el.id}>
        <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: '20px' }}>
          <Todolist
            todolist={el}
            demo = {demo}
          />
        </Paper>
      </Grid>
    )});

  return (
    <>
      <Grid container sx={{ mb: '50px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4} sx={{ gap: '20px', flexWrap: 'wrap' }}>
        { mappedTodolists }
      </Grid>
    </>
  );
};