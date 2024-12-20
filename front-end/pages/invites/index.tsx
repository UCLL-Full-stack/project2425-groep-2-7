import InviteTableOverview from "@/components/invite/InviteTableOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Invites: React.FC = () => {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <main className="pt-6 pl-6">
          <InviteTableOverview />
        </main>
      </div>
    </>
  );
};

export default Invites;

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
