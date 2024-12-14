import TeamTableOverview from "@/components/team/TeamtableOverview";


const TeamOverview: React.FC = () => {
    return (
    <>
        <section>
            <title>Teams</title>  
        </section>
        <main className="bg-gray-800 min-h-screen">
            <TeamTableOverview/>
        </main>
    </>
    );
};

export default TeamOverview