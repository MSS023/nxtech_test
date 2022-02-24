import { useState } from "react";
import "./CustomTextInput.css";

function CustomTextInput(props) {
  const [state, setState] = useState("");
  const [valid, setIsValid] = useState(true);
  const { validation } = props;
  function handleChange(e) {
    if (validation) {
      if (validation(e.target.value)) {
        setIsValid(true);
      } else setIsValid(false);
    } else setIsValid(true);
    setState(e.target.value);
    props.onChange(e.target.value);
  }

  return (
    <div className={"CustomTextInput " + props.className}>
      <input
        className={"textInput "+(!valid?"notValid":"")}
        type={props.type}
        placeholder={props.placeholder}
        value={state}
        onChange={handleChange}
      />
      {!valid?<p className="errorText">{props.errorText}</p>:""}
    </div>
  );
}

export default CustomTextInput;
