import { useState } from "react";
import Button from "../components/widgets/Button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../API/supabaseClient";

function SignupPage() { 
  const navigate = useNavigate();

    // form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [etudiantId, setEtudiantId] = useState("");

    // error message state
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSignup(e: any) {
      e.preventDefault();
      setErrorMsg("");

      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      //Create Supabase Auth user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      //If signup worked, get user ID (UUID)
      const userId = data.user?.id;
      if (!userId) {
        setErrorMsg("Unexpected error: no user ID returned.");
        return;
      }

      // 4. Insert into your Etudiants table
      // Make sure the primary key is correct: id_etudiant (your school ID)
      const { error: insertError } = await supabase
        .from("etudiants")
        .insert([
          {
            id_etudiant: Number(etudiantId), // Class ID from school
            courriel: email,
            nom: email.split("@")[0],
            programme_id: 5544, // exemple de programme id
          },
        ]);

      if (insertError) {
        setErrorMsg("Student account created, but profile insert failed: " + insertError.message);
        return;
      }

      // 5. Redirect to login
      navigate("/login");
    }

  return (
    <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24 mt-10">
      <div className="w-[90%] 2xl:w-[70%] mx-auto">
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-md text-gray-600">Please enter your details</h3>
          <h2 className="text-3xl font-semibold my-1">Create your account</h2>
        </div>

        <form className="my-4" onSubmit={handleSignup}>
          <fieldset className="flex flex-col gap-4 mb-10 lg:mb-14">

            <input
              type="text"
              placeholder="School Student ID (ex: 20257343)"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              onChange={(e) => setEtudiantId(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Email Address"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </fieldset>

          {errorMsg && (
            <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
          )}

          <div className="text-center">
            <Button buttonText="Sign up" variant="view" size="full" />
          </div>
        </form>

        <h3 className="text-center">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer text-primary font-semibold"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </h3>
      </div>
    </div>
  );
}

export default SignupPage;
