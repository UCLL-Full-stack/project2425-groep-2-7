import CreateTournament from "@/components/tournament/CreateTournament";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Register: React.FC = () => {
  return (
    <>
      <main className="bg-gray-800 min-h-screen">
        <CreateTournament />
      </main>
    </>
  );
};

export default Register;

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
