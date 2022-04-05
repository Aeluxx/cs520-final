import React, { useState } from 'react'
import axios from 'axios'

export default function ExampleComponent() {
  const [resValue, setResValue] = useState('No value yet...')

  const makeRequest = () => {
    axios.get('/').then(res => {
      if(res.status !== 200) return
      setResValue(res.data) 
    })
  }

  return (
    <div>
      <button onClick={makeRequest}>Click me to make a request!</button>
      <span>Result: {resValue}</span>
    </div>
  )
}
