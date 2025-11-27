import React, { useState } from "react";
import Button from "../components/widgets/Button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../API/supabaseClient";
import { getStore } from "../utils/Store";
import type { User } from "../models/User";

function LoginPage() {
  const navigate = useNavigate();
  const store = React.useMemo(() => getStore(), []);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // UI state
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // 1. Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // 2. Check email verification (disabled in supabase settings)
    //if (!data.user?.email_confirmed_at) {
     // setErrorMsg("Please confirm your email before logging in.");
    //  return;
    //}

    // 3. Redirect to student dashboard or home
    const supabaseUser = data.user;

    const connectedUser: User = {
      id: supabaseUser?.user_metadata?.etudiantId || "", // Use the etudiantId instead of supabaseUser?.id
      email: supabaseUser?.email || "",
      firstName: supabaseUser?.user_metadata?.firstName || "",
      lastName: supabaseUser?.user_metadata?.lastName || "",
      role: supabaseUser?.user_metadata?.role || "",
      createdAt: supabaseUser?.created_at || "",
    };

    store.setState(
      {
        auth: {
          connectedUser,
          isAuthenticated: true,
          token: data.session?.access_token || null,
        },
      },
      "login"
    );

    navigate("/");
  }


  return (
    <div className="flex flex-col  w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24  mt-10">
      <div className=" w-[90%] 2xl:w-[70%] mx-auto">
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-md text-gray-600">Please enter your details</h3>
          <h2 className="text-3xl font-semibold my-1">Welcome Back</h2>
        </div>

        <form className="my-4" onSubmit={handleLogin}>
          <fieldset className="flex flex-col gap-4 mb-4">
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

            <div className="flex justify-between mb-6 text-sm lg:text-md">
              <div>
                {" "}
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe"> Remember for 30 days</label>
              </div>

              <h3 className="underline cursor-pointer text-primary font-semibold text-sm lg:text-md">
                Forgot password?
              </h3>
            </div>

            {errorMsg && (
              <p className="text-red-600 text-sm mb-4 text-center">
                {errorMsg}
              </p>
            )}
          </fieldset>

          <div className="text-center">
            <Button
              buttonText={loading ? "Signing in..." : "Sign in"}
              variant="view"
              size="full"
              type="submit"
              disabled={loading}
              onClick={() => navigate("/")}
            />
          </div>
        </form>
        <h3 className="text-center">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer text-primary font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </h3>
      </div>
    </div>
  );
}

export default LoginPage;
