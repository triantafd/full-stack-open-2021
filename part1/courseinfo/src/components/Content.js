import Part from './Part'

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {parts.map(element => (
        <Part
          key={Math.random()}
          part={element.name}
          exercises={element.exercises}
        />
      ))}
    </div>
  )
}

export { Content }
