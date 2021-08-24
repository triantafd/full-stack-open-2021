import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Result from './components/Result'
import Country from './components/Country'

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [countryShow, setShow] = useState({})

  /* const url = `https://restcountries.eu/rest/v2/name/${searchName}` */
  const url = 'https://restcountries.eu/rest/v2/name/all';

  useEffect(() => {
    axios.get(url).then(response => {
      console.log('Data is ', response.data)
      setCountries(response.data)
    })
  }, [url])

  /*  useEffect(() => {
     let changeShow = {}
     countries.forEach(e => changeShow[e.name] = false)
     setShow(changeShow)
   }, [countries]) */


  return (
    <div>
      <Search searchName={searchName} setSearchName={setSearchName} />
      <Result countries={countries} setCountries={setCountries}
        searchName={searchName} countryShow={countryShow} setShow={setShow} />
    </div>
  )
}

export default App;
