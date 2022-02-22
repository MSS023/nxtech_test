import "./CustomButton.css";

function CustomButton(props) {
    return <div className={"CustomButton " + props.className}>
        <button className="buttn">{props.children}</button>
    </div>
}

export default CustomButton;