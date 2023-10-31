import React, { useState,useEffect } from 'react';
import './App.css';
import {Task} from './Task';
import icon from "../src/images/icon.png";
import Empty from '../src/images/empty.svg'

function App() {
  const [list,setList] = useState(()=>{
    const savedList = localStorage.getItem('list');
    if(savedList){
      return JSON.parse(savedList);
    }
    else{return [];}
  });
  const [newTask, setNewTask] = useState();
  const [isEmpty,setIsEmpty] = useState(false); 
   
  const [editMode,setEditMode] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list));
  },[list]);
  useEffect(()=>{ 
    list.length===0 ? setIsEmpty(true) : setIsEmpty(false);
  },[list.length]);
  const inputChange = (event) => {
    setNewTask(event.target.value);
  };
  const addTask = () => {
    if(!newTask){

    }
    else{
      const task={
        id: list.length===0 ? 1 : list[list.length-1].id + 1,
        taskName: newTask,
        completed: false,
      };
      setList([...list, task]);
      setNewTask('');
      setIsEmpty(false);
    }
    
  };
  const deleteTask = (id) => {
    setList(list.filter((task) => task.id !== id));
    if(list.filter(item => item !== null).length === 0){setIsEmpty(true);}
  };
  const editItem = (id) => {
    let newEditItem = list.find((task)=>{
      return task.id === id;
    });
    console.log(newEditItem);
    setEditMode(true);
    setNewTask(newEditItem.taskName);
    setUpdateTask(id);
  }; 
  const updateList = () => {
    setList(
      list.map((task)=>{
        if(task.id === updateTask){
          return{ ...task, taskName: newTask} 
        }
        return task;
      })
    );
    setEditMode(false);  
    setNewTask('');
    setUpdateTask(null);
  }
  const doneTask = (id) => {
    setList(list.map(task => task.id === id ? {...task, completed:!task.completed} : task));
  };
   
  return (
    <div className="App">
      <div className='main'>
        <h2>To-Do List <img src={icon} alt="icon"/></h2>
        <div className='addTask'>
          <input type='text' onChange={inputChange} value={newTask} placeholder='Add Task'/>
          {
            editMode ? <button onClick={updateList}>Update</button> : <button onClick={addTask}>Add</button>
          }
        
        </div>
        <div className='list'>
          {
          isEmpty ? 
          <div className='emptyList'>
            <img src={Empty}/>
            <h3>Empty...</h3>
          </div>
          :
          list.map((task) => {
            return (
            <div>
              <Task 
              taskName = {task.taskName}
              id = {task.id}
              completed = {task.completed}
              deleteTask = {deleteTask}
              editItem = {editItem}
              doneTask = {doneTask}
              />
              
              
            
              
              
            </div>)
          })
          }
        </div>

      </div>
      
        
    </div>
  );
}

export default App;
