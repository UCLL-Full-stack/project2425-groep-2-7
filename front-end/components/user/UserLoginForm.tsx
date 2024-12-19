import React, { useState } from "react";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";

const LoginOverview = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string>("");

  const [emailError, setEmailError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const user = { email, password };
      const response = await UserService.loginUser(user);

      if (!response.ok) {
        setEmailError("Invalid email or password");
      } else {
        const data = await response.json();
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: data.token,
            email: data.email,
          })
        );

        router.push("/");
      }
    } catch (error) {
      setEmailError("An unexpected error occurred");
    }
  };

  return (
    <>
      <main className="flex items-center justify-center pt-12 min-h-screen bg-gray-800">
        <form
          className="bg-red-600 text-white rounded-lg shadow-lg p-8 w-full max-w-md"
          onSubmit={handleLogin}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            User login
          </h1>

          {status && (
            <div
              className={`mb-4 ${
                status.includes("error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {status}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-red-800 text-white py-2 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default LoginOverview;
