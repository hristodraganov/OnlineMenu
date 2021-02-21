import React, { useState } from 'react'
import '../styles/Login.css'
import Orders from './Orders'
const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    
    const handleChange = (e) => {
        e.preventDefault()
        switch (e.target.type) {
            case 'text':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (username !== '' && password !== '') {
            setLogged(true)
        }
    }

    return (
        logged ?
            <Orders username={username} password={password} />
            :
            <div className='login-box'>
                <div className='spacer'></div>
                <input type='text' onChange={handleChange} placeholder='username' className='login-un'></input>
                <input type='password' placeholder='password' onChange={handleChange} className='login-pw'></input>
                <button className='login-submit' onClick={handleSubmit}>Login</button>
            </div>
    )
}

export default Login