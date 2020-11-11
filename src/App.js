import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo'
import db from './firebase'
import firebase from 'firebase'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState()
  const addTodo = (event) => {
    event.preventDefault()
    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input])
    setInput('')
  }
  useEffect(() => {
    // this code will run once olny when the App.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, task: doc.data().task})))
    })
  }, [])
  return (
    <div className="App">
      <h1 className="font__weight">Manage Your Tasks With Magic Todo ✌✌</h1>
      <form>
        <FormControl>
          <InputLabel>✔ Write your Tasks</InputLabel>
          <Input className="input__100"value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} variant="contained" type="submit" color="primary"onClick={addTodo}>Add Task</Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/> 
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
