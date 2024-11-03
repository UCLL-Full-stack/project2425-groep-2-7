import RegisterForm from "@/components/register/registerForm";

const Register: React.FC = () => {
  return (
    <>
      <head>
        <title>Register</title>
      </head>
      <main>
        <h1>Register</h1>
        <section>
          <RegisterForm />
        </section>
      </main>
    </>
  );
};

export default Register;
