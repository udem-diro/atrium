import logo from "../../assets/logo_atrium.svg";
import Button from "../widgets/Button.tsx";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex gap-6 justify-between align-center relative">
        <div
          className="align-center min-w-32 w-36 sm:w-36 md:w-42 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-full h-auto" src={logo} alt="logo"></img>
        </div>
        <div className="flex gap-2">
          <Button
            buttonText="Log in"
            variant="view"
            size="responsive"
            onClick={() => navigate("/login")}
          />

          <Button
            buttonText="My profile"
            variant="primary"
            size="responsive"
            onClick={() => navigate("/student")}
          />
        </div>
      </div>

      <hr className="h-px border-0 bg-gray-200 w-screen mt-4 absolute left-0.5" />
    </div>
  );
}

export default Header;
