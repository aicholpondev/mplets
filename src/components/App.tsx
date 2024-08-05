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
 const removeTodo = (id:number): void => {
   setAdd(add.filter(add=>add.id !== id))
 }

 const toggleTodo =(id:number): void =>{
   setAdd(add.map(add =>{
   if(add.id !== id) return add;
    return{
      ...add,
      complete: !add.complete
    }
   }))
 }

 useEffect(() =>{
    if(inputRef.current)inputRef.current.focus();
 },[])


    return <>
    <div>
        <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}  />
        <button onClick={addTodo}>Add</button>
    </div>
    <TodoList items={add} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
    </>
  }
  export {App}