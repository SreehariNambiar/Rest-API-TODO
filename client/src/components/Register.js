import React,{useState} from 'react'
import {Link} from 'react-router-dom'
const Register = ({setAuth}) => {
    const [inputs,setInputs] = useState({
        email : "",
        password:"",
        name:""
    })

    const {name, email, password} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        try {
            const body = {name, email, password}

            const response = await fetch('http://localhost:3002/auth/register',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(body)
        })

        const parseRes = await response.json()
    
            localStorage.setItem('token', parseRes.token)
            setAuth(true)

        } catch (error) {
            console.error(error.message)
        }
    }
  return (
    <div>
    <h1>Register
    </h1>
    <form onSubmit = {onSubmit}>
        <input type='text' value={name} placeholder='name' name='name' onChange={(e) => onChange(e)}/>
        <input type='email' value={email} placeholder='email' name='email' onChange={(e) => onChange(e)}/>
        <input type='password' value={password} placeholder='password' name='password' onChange={(e) => onChange(e)}/>
        <button type='submit'>Submit</button>
    </form>
    <Link to='/login'>Login</Link>
    
    </div>
  )
}

export default Register