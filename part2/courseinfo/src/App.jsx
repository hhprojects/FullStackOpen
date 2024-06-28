import { useState } from 'react'
import Course from './components/Course'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, {exercises}) => accumulator + exercises, 0 )
  console.log("Total: " , total)
  return <p><b>total of {total} exercises</b></p>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {

  return (
      parts.map((part) => {
        console.log("Part:", part);
        return (
          <Part
            key={part.id}
            part={part} 
          />
        )
      })      
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return courses.map(course => <Course course={course} />)
}

export default App
