import "./Navbar.css";

function Navbar(props) {
  const { buttons } = props;
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Login Portal
          </a>
        </div>
        <div className="NavbarButtonContainer">
          {buttons.map((button,index) => {
            return <button className={"navButton "+button.className} onClick={button.onClick}>{button.title}</button>
          })}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
