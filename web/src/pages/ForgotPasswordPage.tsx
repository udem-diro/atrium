import React, { useState } from "react";
import Button from "../components/widgets/Button";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../API/auth";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setSuccessMsg(
        "Password reset link sent! Check your email inbox (and spam folder)."
      );
      setLoading(false);
    } catch (error: any) {
      setErrorMsg(
        error.message || "Failed to send reset email. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24 mt-10">
      <div className="w-[90%] 2xl:w-[70%] mx-auto">
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-md text-gray-600">Reset your password</h3>
          <h2 className="text-3xl font-semibold my-1">Forgot Password?</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form className="my-4" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {errorMsg && (
              <p className="text-red-600 text-sm text-center">{errorMsg}</p>
            )}

            {successMsg && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p className="text-sm">{successMsg}</p>
              </div>
            )}
          </fieldset>

          <div className="text-center space-y-3">
            <Button
              buttonText={loading ? "Sending..." : "Send Reset Link"}
              variant="view"
              size="full"
              type="submit"
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
