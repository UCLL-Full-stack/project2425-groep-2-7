import UserService from "@/services/UserService";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../header";

const RegisterForm: React.FC = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("Admin");
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

  return (
    <>
      <Head>
        <title>User Registration</title>
      </Head>
      <Header />
      <main className="flex items-center justify-center">
        <form className="p-6" onSubmit={handleSubmit}>
          <h1 className="text-center mb-2">User Registration</h1>

          {status && <div className="text-red-500">{status}</div>}

          <label htmlFor="age" className="block">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="w-full p-2 mb-2 border border-black rounded-2xl
             focus:outline-none"
            onChange={(e) => setAge(parseInt(e.target.value))}
          ></input>
          {emailError && <p className="text-red-500">{emailError}</p>}

          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 mb-2 border border-black rounded-2xl focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          ></input>
          {nameError && <p className="text-red-500">{nameError}</p>}

          <label htmlFor="country" className="block">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="w-full p-2 mb-2 border border-black rounded-2xl focus:outline-none"
            onChange={(e) => setCountry(e.target.value)}
          ></input>
          {countryError && <p className="text-red-500">{countryError}</p>}

          <label htmlFor="description" className="block">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full p-2 mb-2 border border-black rounded-2xl focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}

          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2 mb-2 border border-black rounded-2xl focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {emailError && <p className="text-red-500">{emailError}</p>}

          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="pass"
            className="w-full p-2 mb-2 border border-black rounded-2xl focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <label htmlFor="role" className="block">
            Role
          </label>
          <select
            id="role"
            defaultValue="default"
            className="w-full p-2 mb-2 border border-black rounded-2xl"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="default" disabled hidden>
              Select Role
            </option>
            <option value="department1">Role1</option>
            <option value="department2">Role2</option>
            <option value="department3">Role3</option>
          </select>
          {roleError && <p className="text-red-500">{roleError}</p>}

          <button
            type="submit"
            className="w-full p-2 mt-2 border border-black rounded-2xl hover:bg-gray-200 text-lg"
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisterForm;
