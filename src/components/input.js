function Input(props) {
  return (
    <input value={props.value} onChange={props.handleChange} className="App">{props.title}</input>
  );
}

export default Input;
