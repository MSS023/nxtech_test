import "./CustomTextInput.css";

function CustomTextInput(props) {
    return <div className={"CustomTextInput "+props.className}>
        <input className="textInput" type={props.type} placeholder={props.placeholder} />
    </div>
}

export default CustomTextInput;