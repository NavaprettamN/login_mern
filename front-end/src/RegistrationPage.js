import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const RegistrationPage = () => {

  const [registrationData, setRgistrationData] = useState({
    username:'',
    password:''
  })

  const handleRegistrationChange = (e) =>{
    const {name,value} = e.target;
    setRgistrationData((prevData)=>({
      ...prevData,
      [name] : value,
    }))
  }

  const handleRegistrationSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/register',registrationData);
      console.log(response.data);
    }
    catch(error){
      console.log(error);
    }
    setRgistrationData({
      username:'',
      password:''
    })
  }
  return (
    <div>
      <h1>Register here</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={registrationData.username}
        onChange={handleRegistrationChange}
        required
        />

<input
        type='password'
        name='password'
        placeholder='Password'
        value={registrationData.password}
        onChange={handleRegistrationChange}
        required
        />

        <button type='submit'>register</button>
        <p>already registered? <Link to='/login'>login</Link></p>
      </form>
    </div>
  )
}

export default RegistrationPage