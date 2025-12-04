import React, { useState, useEffect } from "react";
import Button from "../components/widgets/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword } from "../API/auth";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validToken, setValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for hash fragments in URL (Supabase sends token this way)
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const type = hashParams.get("type");

    console.log("Hash params:", { accessToken, type }); // Debug log

    if (type === "recovery" && accessToken) {
      setValidToken(true);
    }
  }, [location]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await updatePassword(newPassword);
      setLoading(false);
      alert("Password updated successfully!");
      navigate("/login");
    } catch (error: any) {
      setErrorMsg(
        error.message || "Failed to update password. Please try again."
      );
      setLoading(false);
    }
  }

  // Show loading while checking token
  if (validToken === null) {
    return (
      <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24 mt-10">
        <div className="w-[90%] 2xl:w-[70%] mx-auto text-center">
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24 mt-10">
        <div className="w-[90%] 2xl:w-[70%] mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Invalid or Expired Link
          </h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Button
            buttonText="Go to Forgot Password"
            variant="view"
            size="full"
            onClick={() => navigate("/forgot-password")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] 2xl:w-[40%] mx-auto bg-[#EFF8FF] border border-gray-400 rounded-lg shadow-md px-2 md:px-8 lg:px-12 2xl:px-4 py-16 lg:py-24 mt-10">
      <div className="w-[90%] 2xl:w-[70%] mx-auto">
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-md text-gray-600">Create a new password</h3>
          <h2 className="text-3xl font-semibold my-1">Reset Password</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your new password below.
          </p>
        </div>

        <form className="my-4" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4 mb-4">
            <input
              type="password"
              placeholder="New Password"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="p-2 border border-gray-400 bg-white rounded-lg shadow-md text-sm lg:text-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {errorMsg && (
              <p className="text-red-600 text-sm text-center">{errorMsg}</p>
            )}
          </fieldset>

          <div className="text-center">
            <Button
              buttonText={loading ? "Updating..." : "Update Password"}
              variant="view"
              size="full"
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
