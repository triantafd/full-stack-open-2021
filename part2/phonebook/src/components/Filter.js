import { handleChange } from '../utils'


const Filter = (props) => {
  const { searchName, setSearchName } = props
  return (
    <div>
      Filter shown with: <input value={searchName} onChange={handleChange(setSearchName)} />
    </div>
  )
}

export default Filter