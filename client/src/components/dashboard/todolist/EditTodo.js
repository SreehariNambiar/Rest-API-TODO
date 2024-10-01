import React, {useState} from 'react'

const EditTodo = ({todo, setTodosChange}) => {
  console.log(todo)
  const [show,setShow] = useState(false)
  const [description,setDescription] = useState(todo.description)


  const reset = () =>{
    setShow(false) 
    setDescription(todo.description)
  }
  //editText
  const editText = async(id) => {
    try {
      const body = {description}
      const myHeaders = new Headers()
      myHeaders.append("Content-Type","application/json")
      myHeaders.append("token",localStorage.token)
      const res = await fetch(`http://localhost:3002/dashboard/todos/${id}`, {
        method : "PUT",
        headers : myHeaders,
        body: JSON.stringify(body)
      })
      setTodosChange(true)
    //  window.location = "/"
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div>
    <button onClick = {() => setShow(true)} data-target={`id${todo.todo_id}`}>
      Edit todo
    </button>
    {show && <form id={`id${todo.todo_id}`} className='modal' style={{"background":"#00bbff","width":"auto","position":"fixed","top":"50%","left":"50%","width":"300px","text-align":"center"}}>
    <div className='head' style={{"display":"flex","justifyContent":"space-around","cursor":"pointer"}}>
      <h2>Edit todo</h2>
      <h1 onClick = {()=>reset()}>X</h1>
      </div>
      <div>
      <input style={{"color":"#000"}} type='text' value={description} onChange={e => setDescription(e.target.value)}/>
      </div>
      <div className='base'>
      <button type='submit' onClick={()=> editText(todo.todo_id)}>submit</button>
      </div>
    </form>}
    </div>
  ) 
}

export default EditTodo