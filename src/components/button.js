function Button(props) {
  return (
    <button onClick={props.onClick} className="App">{props.title}</button>
  )
}
  
export default Button;
