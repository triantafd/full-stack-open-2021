import { handleChange } from '../utils'

const PersonForm = (props) => {
  const { handleSubmit, newName, setNewName, newNumber, setNewNumber } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name : <input
          value={newName}
          onChange={(event) => { setNewName(event.target.value) }}
        />
      </div>
      <div>
        number : <input
          value={newNumber}
          onChange={(event) => { setNewNumber(event.target.value) }}
        />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form >
  )
}

export default PersonForm