import React, {useState} from 'react'

const InputTodo = ({setTodosChange}) => {
    const [description, setDescription] = useState("")

    const getTodo = async(e) => {
        e.preventDefault()
        if(e.target.value === ""){
          alert('Please enter value')
        }
        try {
            const body = {description}
            const myHeaders = new Headers()

            myHeaders.append("Content-Type","application/json")
            myHeaders.append("token",localStorage.token)
          const response = await fetch('http://localhost:3002/dashboard/todos',{
            method : 'POST',
            headers:myHeaders,
            body:JSON.stringify(body)
          }) 
          const parseRes = await response.json()
          console.log(parseRes)
          setTodosChange(true)
          setDescription("")

        } catch (error) {
            console.error(error.message)
        }

    }
  return (
    <div>
        <form onSubmit={getTodo}>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button type='submit'> Submit </button>
        </form>
    </div>
  )
}

export default InputTodo