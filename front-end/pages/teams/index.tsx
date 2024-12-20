import TeamTableOverview from "@/components/team/TeamtableOverview";
import Link from "next/link";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const TeamOverview: React.FC = () => {
  return (
    <>
      <div className="bg-gray-800 pt-6 pl-6">
        <button className="px-7 py-2 text-xl text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition-colors duration-300">
          <Link href="/teams/register" className="w-full h-full">
            Create team
          </Link>
        </button>
      </div>
      <main className="bg-gray-800 min-h-screen">
        <TeamTableOverview />
      </main>
    </>
  );
};

export default TeamOverview;

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
