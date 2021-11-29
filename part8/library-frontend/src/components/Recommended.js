import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client';
import { ALL_BOOKS, FAVORITE_GENRE } from '../services/queries'

const Recommended = (props) => {
  const favGenre = useQuery(FAVORITE_GENRE)
  let favGenreString = 'fa'

  if (!favGenre.loading && favGenre.data) {
    favGenreString = favGenre.data.favoriteGenre
    //favGenreString = 'ga'
  } 

  const getBooks = useQuery(ALL_BOOKS, { variables: { genre: favGenreString } })

  if (!props.show) {
    return null
  }

  if (/* favGenre.loading || */ getBooks.loading) {
    return <div>Loading</div>
  }

  console.log(getBooks.data)
  if (!props.show) {
    return null
  }

  const BookTable = () => {
    return (
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
          {getBooks.data.allBooks.map(a =>
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    )
  }



  return (
    <div>
      <h2>Books in your favorite genre: {favGenreString} </h2>
      {BookTable()}
    </div>
  )
}

export default Recommended