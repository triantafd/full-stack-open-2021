const Total = (props) => {
  const exercises = props.exercises
  console.log('Array of exercise number of parts array', exercises)
  return (
    <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
  )
}

export default Total