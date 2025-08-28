import {Skeleton} from "@/components/ui/skeleton"

const AdminDashboardLoading = () => {
  return (
    <div className={'max-w-full mx-auto mt-3'}>
      <div className="mb-8">
        <Skeleton className="w-[600px] h-8 mb-3"/>
        <Skeleton className="w-[300px] h-6"/>
      </div>

      <div className={'space-y-5'}>
        <div className={'grid grid-cols-4 gap-4'}>
          <Skeleton className="w-full h-32"/>
          <Skeleton className="w-full h-32"/>
          <Skeleton className="w-full h-32"/>
          <Skeleton className="w-full h-32"/>
        </div>

        <div className={'grid grid-cols-3 gap-4'}>
          <Skeleton className="w-full h-[38rem] col-span-2"/>
          <Skeleton className="w-full h-[38rem]"/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLoading;
