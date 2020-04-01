import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const BestAnecdote = ({votes, anecdotes}) => {
  const sum = votes.reduce((partial_sum, a) => partial_sum + a,0);
  console.log('Sum',sum);
  if(sum === 0) { return (<div><h2>No votes in the anecdotes yet</h2></div>)}

  const best = Math.max.apply(Math, votes)
  console.log('Best', best)

  const indexBest = votes.indexOf(best)
  console.log('IndexBest', indexBest)

  return(
    <div>
      <h2>Best Anecdote of the Day</h2>
      <p>{anecdotes[indexBest]}</p>
      <p>with {best} votes</p>

    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleRandomClick = () => {
    let ranNum = Math.floor(Math.random() * 6)
    console.log(ranNum)
    setSelected(ranNum)
  }

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log(copyVotes)
    setVotes(copyVotes)
  }

  return (
    <div>
      <h1>Anecdotes of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleRandomClick}>Next Random Anecdote</button>

      <BestAnecdote votes={votes} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
