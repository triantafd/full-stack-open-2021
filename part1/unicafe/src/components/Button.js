const setToValue = (func, newValue) => () => {
  func(newValue)
}
 const Button = (props) => (
  <button onClick={setToValue(props.func, props.value + 1)}>
    {props.text}
  </button>
) 

/* const setToValue = (func, newValue) => {
  func(newValue)
}

const Button = (props) => {
  return (
    <button onClick={() => setToValue(props.func, props.value + 1)}>
      {props.text}
    </button>
  )
} */

export default Button
