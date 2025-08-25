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

        <div className={'w-full relative overflow-hidden'}>
          <Skeleton className="w-full h-[25rem]"/>
          <div className={'space-y-3 absolute top-5 left-5 w-full'}>
            <Skeleton className="w-[200px] h-6"/>
            <Skeleton className="w-[400px] h-6"/>
          </div>
          <div className={'absolute top-5 right-5'}>
            <Skeleton className={'w-[200px] h-8'}/>
          </div>
          <div className={'space-y-9 mt-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
            <Skeleton className="w-[1570px] h-24"/>
            <Skeleton className="w-[1570px] h-24"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;