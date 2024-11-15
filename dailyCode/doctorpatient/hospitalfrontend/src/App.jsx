import React, { useState } from 'react'

const App = () => {
  const[fname,setFname] =useState('My Fname is Aman');
  const[lname,setLname] = useState('My Lname is Singh');
  const handleFname=()=>{
    setFname(Math.random());
  }
  const handleLname=()=>{
    setLname(Math.random());
  }
  return (
    <div>
      <button onClick={handleLname}>Change my Last Name</button>
      <button onClick={handleFname}>Change my First Name</button>
      <p>{fname}</p>
      <p>{lname}</p>
    </div>
  )
}



export default App