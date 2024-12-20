import UserService from "@/services/UserService";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Role } from "@/types";
import { useTranslation, UseTranslation } from "next-i18next";

const RegisterForm: React.FC = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Admin");
  const [status, setStatus] = useState<string>("");

  const [ageError, setAgeError] = useState<string | null>();
  const [nameError, setNameError] = useState<string | null>();
  const [countryError, setCountryError] = useState<string | null>();
  const [descriptionError, setDescriptionError] = useState<string | null>();
  const [emailError, setEmailError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const [roleError, setRoleError] = useState<string | null>();
  const router = useRouter();

  const clearErrors = () => {
    setAgeError(null);
    setNameError(null);
    setCountryError(null);
    setDescriptionError(null);
    setEmailError(null);
    setPasswordError(null);
    setRoleError(null);
  };

  const validate = (): boolean => {
    let result = true;
    if (!age === null) {
      setAgeError("age can not be empty");
      result = false;
    }
    if (!name && name.trim() === "") {
      setNameError("name can not be empty");
      result = false;
    }

    if (!country && country.trim() === "") {
      setCountryError("country can not be empty");
      result = false;
    }

    if (!description && description.trim() === "") {
      setDescriptionError("name can not be empty");
      result = false;
    }

    if (!email && email.trim() === "") {
      setEmailError("email can not be empty");
      result = false;
    } else {
      let emailregex = new RegExp("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$");
      let emailresult: boolean = emailregex.test(email);
      if (emailresult == false) {
        setEmailError("email must be of format name@email.com");
        result = false;
      }
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password can not be empty");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (validate()) {
      const user = { age, name, country, description, email, password, role };
      const response = await UserService.registerUser(user);
      if (response.ok) {
        setStatus("User successfully registered");
        router.push("/");
      } else {
        setStatus("User registration failed" + response.statusText);
      }
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <main className="flex items-center justify-center pt-12 min-h-screen bg-gray-800">
        <form
          className="bg-red-600 text-white rounded-lg shadow-lg p-8 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            {t("registerForm.title")}
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
            <label htmlFor="age" className="block mb-1">
              {t("registerForm.labels.age")}
            </label>
            <input
              type="number"
              id="age"
              className="w-full p-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            {ageError && <p className="text-red-500">{ageError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              {t("registerForm.labels.name")}
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block mb-1">
              {t("registerForm.labels.country")}
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setCountry(e.target.value)}
            />
            {countryError && <p className="text-red-500">{countryError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              {t("registerForm.labels.description")}
            </label>
            <input
              type="text"
              id="description"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <p className="text-red-500">{descriptionError}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              {t("registerForm.labels.email")}
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
              {t("registerForm.labels.password")}
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block mb-1">
              {t("registerForm.labels.role")}
            </label>
            <select
              id="role"
              value={role} // Use `value` instead of `defaultValue`
              className="w-full p-1 mb-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setRole(e.target.value as Role)} // Cast to Role
            >
              <option value="Player">Player</option>
              <option value="Admin">Admin</option>
              <option value="Coach">Coach</option>
            </select>
            {roleError && <p className="text-red-500">{roleError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-red-800 text-white py-2 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisterForm;
