import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const findPerson = persons.find(person => person.name === newName)
    const findPersonName = findPerson ? findPerson.name : undefined

    if (newName === findPersonName){
      if (window.confirm(`${findPersonName} is already added to phonebook, replace the old number with a new one ?`)){
        personService.updatePerson(findPerson.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== findPerson.id ? person : personObject))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${newName}`)
          
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setMessage(
            `[ERROR] ${error.response.data.error}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          console.log(error.response.data)
        })
      }
    }else{
      personService.addPerson(personObject)
        .then(response => {
          //setPersons(persons.concat(personObject))
          
          personService.getAll()
          .then(response => {
            setPersons(response.data)
          })

          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setMessage(
            `[ERROR] ${error.response.data.error}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          console.log(error.response.data)
        })
      }
      
  } 

  const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .deletePerson(personId)
      console.log(`${personName} successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterText =  event.target.value
    setFilter(filterText)
    console.log(filterText)
    console.log(personsToShow)
  }

  
  const personsToShow = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}
export default App
