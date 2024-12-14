import UserTableOverview from "@/components/user/UserTableOverview";

const UserOverview: React.FC = () => {
    return (
    <>
        <section>
            <title>Players</title>  
        </section>
        <main className="bg-gray-800 min-h-screen">
            <UserTableOverview/>
        </main>
    </>
    );
};

export default UserOverview;

