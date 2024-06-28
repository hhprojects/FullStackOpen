import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Winner = ({anecdotes, allVotes}) => {
  const highestVoteCount = Math.max(...allVotes)
  const winnerIndex = allVotes.indexOf(highestVoteCount)
  const winner = anecdotes[winnerIndex]
  if (highestVoteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  }

  return (
    <div>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0,0,0,0,0,0,0,0])

  const [highest, setHighest] = useState({
    anecdote: anecdotes[0],
    points: points[0]
  })

  const handleAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8)
    console.log(randomNumber)
    setSelected(randomNumber)
  }
  
  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1

    setPoints(copy)

    if (copy[selected] > copy[points]){
      setHighest({
        anecdote: anecdotes[selected],
        points: points[selected]
      })
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p> 
      <div>
        <Button handleClick={handlePoints} text='vote' />
        <Button handleClick={handleAnecdote} text='next anecdote'/>
      </div>
      <h1>Anecdote with most votes</h1>
      <Winner anecdotes={anecdotes} allVotes={points} />
    </div>
  )
}

export default App