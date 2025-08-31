import {useGetUserDetailsAdmin} from "@/utils/query.ts";
import {UserProfile} from "@/components/UserProfile.tsx";
import {StatsCard} from "@/components/StatsCard.tsx";
import {CheckCircle, CreditCard, DollarSign, Trophy} from "lucide-react";
import {RegistrationCard} from "@/components/RegistrationCard.tsx";

const UserDetails = ({userId}: { userId: string }) => {
  const {data: user, isLoading, error} = useGetUserDetailsAdmin(userId)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user details.</div>;
  if (!user) return <div>No user data available.</div>;

  const totalRegistrations = user.registrations.length;
  const confirmedRegistrations = user.registrations.filter(reg => reg.status === 'CONFIRMED').length;
  const successfulPayments = user.registrations.filter(reg => reg.transaction?.status === 'SUCCESS').length;
  const totalAmountPaid = user.registrations.reduce((sum, reg) => sum + (reg.transaction?.amount ?? 0), 0);

  const formatCurrency = (amount: number | undefined | null) => {
    if (!amount) return 'Rp0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };
  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserProfile user={user}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Registrations"
            value={totalRegistrations}
            icon={Trophy}
            color="bg-blue-500"
          />
          <StatsCard
            title="Confirmed"
            value={confirmedRegistrations}
            icon={CheckCircle}
            color="bg-green-500"
          />
          <StatsCard
            title="Successful Payments"
            value={successfulPayments}
            icon={CreditCard}
            color="bg-purple-500"
          />
          <StatsCard
            title="Total Paid"
            value={formatCurrency(totalAmountPaid)}
            icon={DollarSign}
            color="bg-emerald-500"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration History</h2>
          <p className="text-gray-600">View all your competition registrations and payment details</p>
        </div>

        <div className="space-y-6">
          {user.registrations.map((registration) => (
            <RegistrationCard key={registration.id} registration={registration}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
