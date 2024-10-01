import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo'
const Listtodo = ({allTodos, setTodosChange}) => {
    console.log(allTodos)
    const [todo,setTodo] = useState([])

    const getList = async() => {
        try {
            const newTodo = await fetch('http://localhost:3002/dashboard/todos')
            const news = await newTodo.json()
            setTodo(news)
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteList = async(aid) => {
        try {
         
            const todos = await fetch(`http://localhost:3002/dashboard/todos/${aid}`,{
                method:'DELETE',
                headers:{token:localStorage.token}
            })
            console.log(todos)
            setTodo(
                todo.filter(to => (
                    to.todo_id !== aid
                ))
            )
            console.log(todo)
        
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        setTodo(allTodos)
    },[allTodos]) // what this does is it keeps track of changes made to alltODOS AND ONCE A CHANGE IS MADE IT PUTS THE CHANGE IN THE SETtODOS IF NO CHANGE IS MADE THIS DOESENT WORK
  return (
    <div>
        <table>
            <thead>
                <th>description</th>
                <th>edit</th>
                <th>delete</th>
            </thead>
            <tbody>
                {
                   todo.length!==0 && todo[0].todo_id!==null && todo.map((to) => {// why we are doing this is we get a bug when a user has no todos so to fix it we do this
                        return(
                            <tr key={to.todo_id}>
                                <td>{to.description}</td>
                                <button onClick = {() => deleteList(to.todo_id)}>Delete</button>
                                <EditTodo todo={to} setTodosChange={setTodosChange}/>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Listtodo