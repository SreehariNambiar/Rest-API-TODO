import React, {useState} from 'react'
import {Link} from 'react-router-dom'
const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email : "",
        password:""
    })

    const {email, password} = inputs

    const onChange = (e) => {
        console.log(e.target.value)
        setInputs({...inputs,[e.target.name] : e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        try {
            const body = {email, password}
            const response = await fetch('http://localhost:3002/auth/login',{
                method : 'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })

            const parseRes = await response.json()
            if(parseRes.token){
            localStorage.setItem("token", parseRes.token)
            setAuth(true)
            }
            else{
                setAuth(false)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
  return (
    <div>
    <h1>Login</h1>
    <form onSubmit={onSubmit}>
        <input type='email' name='email' value={email} placeholder='email' onChange={(e) => onChange(e)} />
        <input type='password' name='password' value={password} placeholder='password' onChange={(e) => onChange(e)} />
        <button type='submit'>Submit</button>
        </form>
        <Link to='/register'>Register</Link></div>
  )
}

export default Login