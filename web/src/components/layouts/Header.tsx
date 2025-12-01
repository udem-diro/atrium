import logo from "../../assets/logo_atrium.svg";
import Button from "../widgets/Button.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../hooks/useStore.ts";
import { signOut } from "../../API/auth.ts";
import { getStore } from "../../utils/Store.ts";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isConnected = useStore((s) => s.auth.isAuthenticated);
  const connectedUser = useStore((s) => s.auth.connectedUser);

  // Detect if we are on a page where login/signup buttons should be hidden
  const authPages = ["/login", "/signup"];
  const hideAuthButtons = authPages.includes(location.pathname);

  async function handleSignOut() {
    try {
      console.log(`user :  ${connectedUser?.courriel}`);
      console.log(`user :  ${isConnected}`);
      console.log("signing out ...");
      await signOut();
      console.log("signed out!");
      getStore().setConnectedUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div className="mb-6">
      <div className="flex gap-6 justify-between align-center relative">
        <div
          className="align-center min-w-32 w-36 sm:w-36 md:w-42 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-full h-auto" src={logo} alt="logo"></img>
        </div>
        {!hideAuthButtons && (
          <div className="flex gap-2">
            {isConnected && (
              <Button
                buttonText="Log out"
                variant="view"
                size="responsive"
                onClick={handleSignOut}
              />
            )}

            {!isConnected && (
              <Button
                buttonText="Log in"
                variant="view"
                size="responsive"
                onClick={() => navigate("/login")}
              />
            )}

            {isConnected && (
              <Button
                buttonText="My profile"
                variant="primary"
                size="responsive"
                onClick={() => {
                  if (connectedUser?.role === "student") {
                    navigate(`/student/${connectedUser.id_etudiant}`);
                  } else if (connectedUser?.role === "professor") {
                    navigate(`/professor/${connectedUser.id_professeur}`);
                  }
                }}
              />
            )}
          </div>
        )}
      </div>

      <hr className="h-px border-0 bg-gray-200 w-screen mt-4 absolute left-0.5" />
    </div>
  );
}

export default Header;
