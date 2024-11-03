import { useState, useEffect } from "react";
import registerForm from "@components/register/registerForm";

const Register: React.FC = () => {
  return (
    <>
      <head>
        <title>Register</title>
      </head>
      <header />
      <main>
        <h1>Register</h1>
        <section>
          <registerForm />
        </section>
      </main>
    </>
  );
};

export default Register;
