import TournamentTableOverview from "@/components/tournament/TournamentTableOverview";


const TournamentOverview: React.FC = () => {
    return (
    <>
        <section>
            <title>Tournaments</title>  
        </section>
        <main className="bg-gray-800 min-h-screen">
            <TournamentTableOverview/>
        </main>
    </>
    );
};

export default TournamentOverview