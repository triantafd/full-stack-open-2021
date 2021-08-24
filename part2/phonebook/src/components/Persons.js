import Person from './Person'

const Persons = (props) => {
  const { matchPersons, deletePerson } = props
  console.log(matchPersons)

  return (
    <div>
      <table>
        <tbody>
          {matchPersons.map((p) => {
            return (
              <Person
                key={p.id}
                id={p.id}
                name={p.name}
                number={p.number}
                deletePerson={deletePerson}
              />
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Persons