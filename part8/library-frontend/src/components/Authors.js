import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../services/queries'
import Select from 'react-select';

const Authors = (props) => {
  let authors = []
  const authorsFetchData = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authorsFetchData.data && authorsFetchData.data.allAuthors) {
    authors = [...authorsFetchData.data.allAuthors]
  }

  if (!props.show) {
    return null
  }


  if (authors.loading) {
    return <div>Loading</div>
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedOption.value, setBornTo: Number(born) } })
    //setSelectedOption(null)
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <h2>Set birthyear</h2>
      <select value={selectedOption} onChange={({ target }) => setSelectedOption(target.value)}>
        {authors.map(a =>
          <option key={a.name} value={a.name}>{a.name}</option>
        )}
      </select>
      <div>
        <input type="number" value={born} onChange={(event) => setBorn(event.target.value)} />
      </div>
      <button onClick={handleSubmit}>update author</button>  */}


      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors.map(a => ({ value: a.name, label: a.name }))}
        />
        <div>
          <span>born</span><input value={born} onChange={({ target }) => setBorn(target.value)} type="number" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
