import {CompetitionsContext, useUserSessionContext} from "@/hooks/context.ts";
import {ChartBarMultiple} from "@/components/BarChart.tsx";
import {useGetCompsStats} from "@/utils/query.ts";
import {ChartPieLabel} from "@/components/PieChart.tsx";

const AdminDashboard = () => {
  const session = useUserSessionContext()
  const {data, isLoading, error} = useGetCompsStats()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div className={'text-red-500'}>Error: {error.message}</div>
  if (!data) return <div className={'text-red-500'}>No data available</div>
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

        <div className={'grid grid-cols-3 gap-4'}>
          <ChartBarMultiple/>
          <ChartPieLabel/>
        </div>
      </div>
    </CompetitionsContext.Provider>
  );
};

export default AdminDashboard;
