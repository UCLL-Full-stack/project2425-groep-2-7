import UserLoginForm from "@/components/user/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Login: React.FC = () => {
  return (
    <>
      <main>
        <UserLoginForm />
      </main>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
