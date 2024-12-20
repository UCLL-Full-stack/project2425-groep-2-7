import UserTableOverview from "@/components/user/UserTableOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const UserOverview: React.FC = () => {
  return (
    <>
      <section>
        <title>Players</title>
      </section>
      <main className="bg-gray-800 min-h-screen">
        <UserTableOverview />
      </main>
    </>
  );
};

export default UserOverview;

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
