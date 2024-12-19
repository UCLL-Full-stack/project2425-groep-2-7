import InviteTableOverview from "@/components/invite/InviteTableOverview";

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
