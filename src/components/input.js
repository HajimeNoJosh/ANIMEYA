function Input(props) {
  return (
    <input
      value={props.value}
      onChange={props.handleChange}
      className="App"
      required={props.required}
    >
      {props.title}
    </input>
  );
}

export default Input;
