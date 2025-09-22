import {CompetitionsContext, useUserSessionContext} from "@/hooks/context.ts";
import {ChartBarMultiple} from "@/components/BarChart.tsx";
import {useGetCompsStats, useGetSummaryStats} from "@/utils/query.ts";
import {ChartPieLabel} from "@/components/PieChart.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {AlertCircle, CheckCircle} from "lucide-react";
import {BiUser} from "react-icons/bi";
import {GoPeople} from "react-icons/go";
import AdminDashboardLoading from "@/components/AdminDashboardLoading.tsx";
import {useNavigate} from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate()
  const session = useUserSessionContext()
  const {data, isLoading, error} = useGetCompsStats()
  const {data: summary, isLoading: isLoadingSummary, error: isErrorSummary} = useGetSummaryStats()

  if (!session || session.payload.role !== 'ADMIN') {
    navigate('/auth/login', {replace: true})
  }
  if (isLoading || isLoadingSummary) return <AdminDashboardLoading/>
  if (error || isErrorSummary) return <div
    className={'text-red-500'}>Error: {error?.message || isErrorSummary?.message}</div>
  if (!data || !summary) return <div className={'text-red-500'}>No data available</div>
  return (
    <CompetitionsContext.Provider value={data}>
      <div className="max-w-full mx-auto mt-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Welcome back, <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">{session.payload.name}</span>
          </h1>
          <p className="text-gray-300">Manage everything.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Total Users</p>
                  <p className="text-3xl font-bold text-yellow-300">{summary.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BiUser className="w-6 h-6 text-blue-600"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Registrations Confirmed</p>
                  <p className="text-3xl font-bold text-emerald-300">
                    {summary.registrations.confirmed}
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
                    {summary.registrations.pending}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={'bg-teal-700 border-2 border-teal-300'}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={'space-y-3'}>
                  <p className="text-sm text-gray-100 font-semibold">Total Teams</p>
                  <p className="text-3xl font-bold text-red-300">
                    {summary.totalTeams}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <GoPeople className="w-6 h-6 text-yellow-600"/>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={'grid grid-cols-3 gap-4'}>
          <ChartBarMultiple/>
          <ChartPieLabel/>
        </div>
      </div>
    </CompetitionsContext.Provider>
  );
};

export default AdminDashboard;
