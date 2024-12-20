import Link from "next/link";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation, UseTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2 ">
        <h1 className="text-3xl font-mono">{t("app.title")}</h1>
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Credentials</h2>
      <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Password</th>
            <th className="px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800 hover:bg-gray-600">
            <td className="px-4 py-2">Tester1</td>
            <td className="px-4 py-2">tester1</td>
            <td className="px-4 py-2">Player</td>
          </tr>
          <tr className="bg-gray-700 hover:bg-gray-600">
            <td className="px-4 py-2">Tester2</td>
            <td className="px-4 py-2">tester2</td>
            <td className="px-4 py-2">Coach</td>
          </tr>
          <tr className="bg-gray-800 hover:bg-gray-600">
            <td className="px-4 py-2">Tester3</td>
            <td className="px-4 py-2">tester3</td>
            <td className="px-4 py-2">Player</td>
          </tr>
          <tr className="bg-gray-700 hover:bg-gray-600">
            <td className="px-4 py-2">Tester4</td>
            <td className="px-4 py-2">tester4</td>
            <td className="px-4 py-2">Player</td>
          </tr>
        </tbody>
      </table>
    </div>
      </main>
    </>
  );
};

// Explicitly typing 'context' as GetServerSidePropsContext
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

export default Home;
