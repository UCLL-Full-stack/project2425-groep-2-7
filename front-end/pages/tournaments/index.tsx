import { useState, useEffect } from "react";
import useSWR from "swr";
import TournamentTableOverview from "@/components/tournament/TournamentTableOverview";
import Filter from "@/components/tournament/TournamentFilters";
import TournamentService from "@/services/TournamentService";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const TournamentOverview: React.FC = () => {
  const [filter, setFilter] = useState(""); // Store the filter text

  const fetchTournaments = async () => {
    const responses = await Promise.all([
      TournamentService.getAllTournaments(),
    ]);
    const [tournaments] = responses;

    return { tournaments };
  };

  const { data, isLoading, error } = useSWR("tournaments", fetchTournaments);

  const filteredTournaments = data?.tournaments.filter(
    (tournament: any) =>
      tournament.location.toLowerCase().includes(filter.toLowerCase()) ||
      tournament.game.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <header className="bg-gray-800 p-4 text-center text-white">
        <h1 className="text-2xl font-bold">Tournaments</h1>
      </header>
      <main className="bg-gray-800 min-h-screen">
        <>
          <div className="flex items-center space-x-4">
            <button className="px-9 py-2 ml-20 text-xl text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition-colors duration-300">
              <Link href="/tournaments/register" className="w-full h-full">
                Create tournament
              </Link>
            </button>

            {error && <div className="text-red-800">{error.message}</div>}
            {isLoading && <p>loading...</p>}

            <div className="w-full px-4 py-2">
              <Filter
                onFilterChange={(filterValue) => setFilter(filterValue)}
              />
            </div>
          </div>

          {data && (
            <TournamentTableOverview
              tournaments={filteredTournaments || []} // Pass filtered tournaments
            />
          )}
        </>
      </main>
    </>
  );
};

export default TournamentOverview;

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
