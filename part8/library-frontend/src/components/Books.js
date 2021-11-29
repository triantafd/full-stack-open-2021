import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from '../services/queries'

const Books = (props) => {
  const genres = useQuery(ALL_GENRES)
  const [filter, setFilter] = useState('')
  const client = useApolloClient()
  const [getBooks, result] = useLazyQuery(ALL_BOOKS,
    { variables: { genre: filter } })

  //console.log('To result einai', result)
  //console.log('Ta genres einai', genres)
  useEffect(() => {
    getBooks()
    //console.log("books rendered with appropriate filter")
  }, [filter])

  /* useEffect(() => {
    if (result.data) {
      setAllbooks(result.data.allBooks)
    }
  }, [result]) */

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })
    console.log('SDFSFD',dataInStore.allBooks, addedBook)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log("writing new book ")
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: '' },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("New Book to be added", subscriptionData.data)
      const newBook = subscriptionData.data.bookAdded
      console.log("SUBSCR: book added", newBook)
      updateCacheWith(newBook)
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {filter}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setFilter('')}>ALL</button>
      {genres.data.allGenres.map(
        genre =>
          <button key={genre} onClick={() => setFilter(genre)} >
            {genre}
          </button>
      )}
    </div>
  )
}

export default Books