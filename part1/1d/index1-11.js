import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  //console.log(props)
  const {onClick, text} = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = (props) => {
  const {text, value} = props
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = (props) => {
  if(props.good + props.neutral + props.bad === 0) {
    return (<div><h2>No Feedback given yet</h2><p></p></div>)
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text='Good' value={props.good} />
          <Statistic text='Neutral' value={props.neutral} />
          <Statistic text='Bad' value={props.bad} />
          <Statistic text='All' value={props.good + props.neutral + props.bad} />
          <Statistic text='Average' value={(props.good + props.neutral + props.bad) / 3} />
          <Statistic text='Positive' value={((props.good * 100) / (props.good + props.neutral + props.bad))+'%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
