import React, { useState } from 'react'
import Button from './components/Button'
import Title from './components/Title'
import Statistics from './components/Statistics'

//import { Title } from './components/Title'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Title name={'give feedback'} />
      <Button func={setGood} value={good} text="good" />
      <Button func={setNeutral} value={neutral} text="neutral" />
      <Button func={setBad} value={bad} text="bad" />
      <Statistics name={'statistics'} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App