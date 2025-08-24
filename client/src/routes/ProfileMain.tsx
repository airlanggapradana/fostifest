import {useUserSessionContext} from "@/hooks/context.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {AlertCircle, CheckCircle, ChevronDown, ChevronUp, Trophy, XCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router";
import {Badge} from "@/components/ui/badge.tsx";
import {useGetUserDetails} from "@/utils/query.ts";
import {useState} from "react";
import DashboardLoading from "@/components/DashboardLoading.tsx";

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return CheckCircle;
    case 'PENDING':
      return AlertCircle;
    case 'CANCELED':
      return XCircle;
    default:
      return AlertCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProfileMain = () => {
  const navigate = useNavigate();
  const session = useUserSessionContext()
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (index: string) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const {data: user, isLoading, error} = useGetUserDetails(session.payload.id);
  if (isLoading) return <DashboardLoading/>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!user) return <div className="text-red-500">Error: User details not found</div>;

  const registrations = user.registrations;
  return (
    <div className="max-w-full mx-auto mt-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Welcome back, <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">{session.payload.name}</span>
        </h1>
        <p className="text-gray-300">Manage your competition registrations and profile</p>
      </div>

      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Total Registrations</p>
                  <p className="text-3xl font-bold text-yellow-300">{registrations?.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-blue-600"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Confirmed</p>
                  <p className="text-3xl font-bold text-emerald-300">
                    {registrations?.filter(r => r.status === 'CONFIRMED').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Pending</p>
                  <p className="text-3xl font-bold text-red-300">
                    {registrations?.filter(r => r.status === 'PENDING').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600"/>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registered Comps */}
        <Card className={'bg-teal-700 border-2 border-teal-500'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <h1 className={'text-base text-gray-100'}>Registered Competitions</h1>
              </CardTitle>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white"
              >
                <BiPlus className="w-4 h-4"/>
                Register for More
              </Button>
            </div>
            <CardDescription className={'text-gray-300'}>
              Here are the competitions you have registered for. Check your registration status and details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrations?.map(registration => {
                const StatusIcon = getStatusIcon(registration.status);
                const isOpen = openItems.includes(registration.registrationId);
                return (
                  <div
                    key={registration.registrationId}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 bg-teal-800 rounded-xl shadow transition hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
                        <Trophy className="w-6 h-6 text-white"/>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-100">{registration.competition.name}</h4>
                        <p className="text-sm text-gray-300 mb-3">
                          {new Date(registration.competition.startDate).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} - {new Date(registration.competition.endDate).toLocaleDateString("en-US", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        </p>
                        <Button
                          variant={'outline'}
                          onClick={() => toggleItem(registration.registrationId)}
                          className="w-full md:w-auto px-4 py-2 mt-1 border-teal-300 hover:text-gray-100 bg-transparent hover:bg-teal-700 text-white flex items-center justify-center gap-2 rounded transition"
                        >
                          {isOpen ? (
                            <>
                              <ChevronUp className="w-5 h-5 text-emerald-300"/>
                              <span>Hide Details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-5 h-5 text-gray-300"/>
                              <span>Show Details</span>
                            </>
                          )}
                        </Button>
                        {isOpen && (
                          <div className="w-full mt-3 bg-teal-900 rounded-lg p-4 border-2 border-teal-700 space-y-3">
                            <p className="text-xs text-gray-400">
                              <span
                                className={'text-teal-300'}>Order ID :</span> {registration.transaction.midtransOrderId}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              <span
                                className={'text-teal-300'}>Transaction Status :</span> {registration.transaction.status.toLowerCase()}
                            </p>
                            <p className="text-xs text-gray-400 uppercase">
                              <span
                                className={'text-teal-300 capitalize'}>Payment Type :</span> {registration.transaction.paymentType}
                            </p>
                            <p className="text-xs text-gray-400">
                              <span
                                className={'text-teal-300'}>Amount :</span> {registration.transaction.amount.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Badge
                      className={`${getStatusColor(registration.status)} font-semibold px-3 py-1 flex items-center`}>
                      <StatusIcon className="w-4 h-4 mr-2"/>
                      <span className="capitalize">{registration.status.toLowerCase()}</span>
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileMain;
