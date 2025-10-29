import logo from "../assets/logo_atrium.svg"; // adjust the path as needed
import Button from "./Button.tsx";

function Header() {
  return (
    <div className="flex gap-6 justify-between align-center">
      <div className="align-center min-w-32 w-36 sm:w-36 md:w-42">
        <img className="w-full h-auto" src={logo} alt="logo"></img>
      </div>

      <Button buttonText="My profile" variant="primary" size="responsive" />
    </div>
  );
}

export default Header;
