import logo from "../assets/logo_atrium.svg"; // adjust the path as needed

function Header() {
  return (
    <div className="flex justify-between align-center">
      <img src={logo} alt="logo"></img>
      <button>My profile</button>
    </div>
  );
}

export default Header;
