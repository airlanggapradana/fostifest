import {Skeleton} from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="max-w-full mx-auto mt-3">
      <div className="mb-8">
        <Skeleton className="w-[600px] h-8 mb-3"/>
        <Skeleton className="w-[300px] h-6"/>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Skeleton className="w-full h-32"/>
          <Skeleton className="w-full h-32"/>
          <Skeleton className="w-full h-32"/>
        </div>

        <Skeleton className="w-full h-[25rem]"/>
      </div>
    </div>
  );
};

export default DashboardLoading;