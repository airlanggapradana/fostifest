import {useGetUserDetailsAdmin} from "@/utils/query.ts";

const UserDetails = ({userId}: { userId: string }) => {
  const {data: user, isLoading, error} = useGetUserDetailsAdmin(userId)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user details.</div>;
  if (!user) return <div>No user data available.</div>;
  return (
    <div>
      {/* User Profile */}
      <div className="max-w-full mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-sm mt-2">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Institusi:</span> {user.institusi}
        </p>
      </div>

      {/* Registrations */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">Registrations</h2>
        {user.registrations.length > 0 ? user.registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-white shadow rounded-2xl p-5 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {reg.competition.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  reg.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {reg.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {reg.competition.description}
            </p>

            {/*Transaction */}
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              {reg.transaction ? (
                <>
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {reg.transaction.paymentType} -{" "}
                    <span
                      className={`font-bold ${
                        reg.transaction.status === "SUCCESS"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {reg.transaction.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> Rp{" "}
                    {reg.transaction.amount.toLocaleString("id-ID")}
                  </p>
                  <p>
                    <span className="font-semibold">Transaction Time:</span>{" "}
                    {new Date(reg.transaction.transactionTime).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-gray-400 italic">No transaction data available.</p>
              )}
            </div>

            {/* Team Info */}
            {reg.team && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Team: {reg.team.name}</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {reg.team.participants.map((p) => (
                    <li key={p.id}>
                      {p.name} ({p.email}) - {p.phoneNumber}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )) : (
          <p className="text-gray-500 italic">No registrations found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
