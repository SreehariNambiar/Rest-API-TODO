import React, {useEffect, useState,} from 'react'

//components

import InputTodo from './todolist/InputTodo'
import Listtodo from './todolist/ListTodo'
const Dasboard = ({setAuth}) => {
    const [name, setName] = useState("")
    const [allTodos, setAllTodos] = useState([])
    const [todosChange, setTodosChange] = useState(false)// this is for not refreshing the page while adding the data or else we have to manually refresh the page to see any change.
    const getName = async() => {
        try {
            const response = await fetch('http://localhost:3002/dashboard',{
                method : 'GET',
                headers : {token:localStorage.token}
            })
            const parseRes = await response.json()
            setAllTodos(parseRes)
            setName(parseRes[0].user_name)


        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
       getName()  
       setTodosChange(false)   
    },[todosChange])

    const logout = (e) => {
        e.preventDefault()

        localStorage.removeItem("token")
        setAuth(false)
    }
  return (
    <div>
    <h1>{name}'s Todo list</h1>
    <button onClick={(e)=> logout(e)}>Logout</button>
    <InputTodo setTodosChange={setTodosChange}/>
    <Listtodo allTodos={allTodos} setTodosChange={setTodosChange}/>
    </div>

  )
}

export default Dasboard