import React from 'react'
import Service from '../services/phonebook'

const Person = ({ id, name, number, deletePerson }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={() => deletePerson(id)}>delete</button></td>
    </tr>
  )
}


export default Person;