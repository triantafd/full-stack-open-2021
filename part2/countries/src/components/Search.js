const Search = (props) => {
  const { searchName, setSearchName } = props

  const changeHandler = (event) => {
    let value = ''
    if (event.target.value.length > 0) {
      value = event.target.value
    }

    setSearchName(value)
  }

  return (
    <div>
      find countries  <input value={searchName} onChange={changeHandler} />
    </div>
  )
}

export default Search