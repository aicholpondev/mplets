import { useState,useEffect,useRef } from "react";
import {ITodo} from "../types/data";
import {TodoList} from './TodoList'

const App: React.FC =() =>{
 const [value,setValue] = useState('');
 const [add,setAdd] = useState <ITodo[]>([]);

 const inputRef = useRef<HTMLInputElement>(null);

 const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
    setValue(e.target.value);
 }
 const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement>=(e) =>{
    if(e.key === 'Enter')
    addTodo()

 }
 const addTodo = () =>{
   if(value){
    setAdd([...add,{
        id:Date.now(),
        title:value,
        complete:false,
    }])
    setValue ('')
   }

 }

 useEffect(() =>{
    if(inputRef.current)inputRef.current.focus();
 },[])


    return <>
    <div>
        <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}  />
        <button onClick={addTodo}>Add</button>
    </div>
    <TodoList items={add}/>
    </>
  }
  export {App}