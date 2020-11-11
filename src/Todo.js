import { List, ListItemText, ListItem} from '@material-ui/core';
import React, {useState} from 'react'
import './Todo.css';
import db from './firebase'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 40;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [input, setInput] = useState('')
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () =>{
    db.collection('todos').doc(props.todo.id).set({
      task: input
    }, {merge: true})
    setOpen(false)
  }
  return (
    <div>
      <>
      <Modal
        open={open}
        onClose={e => setOpen(false)}
      >
        <div style={modalStyle}className={classes.paper}>
          <h1 className="font__weight">Hello I welcome you here to Update our Update section Task/Todo</h1>
          <hr />
          <FormControl>
          <InputLabel>✔ Update your Tasks</InputLabel>
          <Input placeholder={props.todo.task} value={input} onChange={event => setInput(event.target.value)}className="input__100"/>
        </FormControl><br/><br/><br />
        <Button onClick={updateTodo}variant="contained" type="submit" color="primary">Update Task</Button>&nbsp;&nbsp;
        <Button onClick={e => setOpen(false)}variant="contained" type="submit" color="default">Cancel</Button>
        </div>
      </Modal>
        <List>
          <ListItem className="todo__list">
            <ListItemText primary={props.todo.task} secondary="" />
            <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="secondary">Delete</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={e => setOpen(true)}variant="contained" color="priamry">Edit</Button>
          </ListItem>
        </List>
      </>
    </div>
  )
}

export default Todo
