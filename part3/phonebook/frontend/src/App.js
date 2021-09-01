import React, { useState, useEffect } from 'react'

import Title from './components/Title'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import Service from './services/phonebook'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')
  const matchPersons =
    persons.filter(p => p.name.toUpperCase().includes(filterStr.toUpperCase()))

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const timer = 3000
  console.log(filterStr, setFilterStr)
  useEffect(() => {
    Service.getAll().then(data => setPersons(data))
    console.log('Persons have been fetced')
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()


    const newObject = {
      'name': newName,
      'number': newNumber,
    }
    console.log('Save have been pressed in order to add/ modify person', newObject)


    const isUniqName = persons.map(p => p.name).includes(newName)

    if (isUniqName) {
      const existedPerson = persons.filter(p => p.name === newName)[0];
      /* const { id, name } = existedPerson[0]; */
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        Service.
          update(existedPerson.id, newObject).
          then((updatedPerson) => {
            console.log('A  PERSON HAVE BEEN modified', updatedPerson)
            setPersons(persons.map(p => p.id !== existedPerson.id ? p : updatedPerson))
            /* Service.getAll().then(data => setPersons(data)) */
            setMessage(`Added ${newName}`)
            setTimeout(() => setMessage(''), timer)
          }).catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => setErrorMessage(''), timer)
          })
      }
    } else {
      Service
        .create(newObject)
        .then((newPerson) => {
          console.log('A NEW PERSON HAVE BEEN ADDED', newPerson)
          /* Service.getAll().then(data => setPersons(data)) */
          setMessage(`Added ${newName}`)
          setTimeout(() => setMessage(null), timer)
          setPersons(persons.concat(newPerson))
        }).catch(error => {
          console.log('SOMETHING HAPPENED', error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), timer)
        })
    }


    setNewName('')
    setNewNumber('')
  }


  const deletePerson = (id) => {
    const deletedPerson = persons.filter(p => p.id === id);
    const isDelete = window.confirm(`delete ${deletedPerson[0].name}?`);

    if (isDelete) {
      Service
        .delete(id)
        .then(() => {
          setErrorMessage(`deleted ${deletedPerson[0].name}`)
          setTimeout(() => setMessage(null), timer)
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), timer)
        })
    }
  }

  console.log(errorMessage)
  return (
    <div>
      <Title name={'Phonebook'} />
      {
        message &&
        <Notification message={message} />
      }
      {
        errorMessage &&
        <Notification message={errorMessage} error={true} />
      }
      <div>
        <Filter searchName={filterStr} setSearchName={setFilterStr} />
      </div>
      <div>
        <Title name={'Add a new'} />
        <PersonForm
          handleSubmit={handleSubmit}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber}
        />
      </div>
      <div>
        <Title name={'Numbers'} />
        <Persons matchPersons={matchPersons} deletePerson={deletePerson} />
      </div>
    </div>
  )
}

export default App