import CustomButton from "../button/CustomButton";
import "./ListItem.css";

function ListItem(props) {
  const { name, mobile, state, id } = props;
  const { buttons } = props;
  return (
    <div className={"ListItem "+props.className}>
      <div className="individualContainer">
        <div className="individual">
          <p>Name: {name}</p>
        </div>
        <div className="individual">
          <p>Mobile: {mobile}</p>
        </div>
        <div className="individual">
          <p>State: {state}</p>
        </div>
      </div>
      <div className="individual buttonsIndividual">
        {buttons.map((button, index) => (
          <CustomButton
            className="buttonindi"
            key={index}
            onClick={() => {
              button.onClick(id);
            }}
          >
            {button.title}
          </CustomButton>
        ))}
      </div>
    </div>
  );
}

export default ListItem;
