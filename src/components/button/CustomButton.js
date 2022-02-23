import "./CustomButton.css";

function CustomButton(props) {
    return <div className={"CustomButton " + props.className}>
        <button className="buttn" onClick={props.onClick}>{props.children}</button>
    </div>
}

export default CustomButton;