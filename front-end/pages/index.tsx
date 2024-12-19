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
