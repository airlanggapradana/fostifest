import {useUserSessionContext} from "@/hooks/context.ts";
import {useGetUserDetailsAdmin} from "@/utils/query.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Calendar, File, Trophy} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const Submissions = () => {
  const session = useUserSessionContext()
  const {data: user, isLoading, error} = useGetUserDetailsAdmin(session.payload.id)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!user) return <div className="text-red-500">Error: User details not found</div>;

  const registrations = user.registrations;
  return (
    <div className="max-w-full mx-auto mt-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">Submissions</span>
        </h1>
        <p className="text-gray-300">Manage your submissions and review feedbacks in real-time.</p>
      </div>

      <div className="space-y-8">
        {registrations.length > 0 ? (
          registrations.map((registration) => (
            <div key={registration.id} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
              <div className={'space-y-2'}>
                <div>
                  <div className={'flex items-center gap-2'}>
                    <Trophy className={'text-gray-100'}/>
                    <h2 className="text-2xl font-semibold text-gray-100">{registration.competition.name}</h2>
                  </div>
                  <p className="text-gray-300">{registration.competition.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <Calendar className="w-4 h-4"/>
                  <span>
                    Joined At:{" "}
                    {new Date(registration.createdAt).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <Separator className="bg-gray-500"/>
              <div>
                <h3 className="text-xl font-semibold text-gray-100">Your Submissions</h3>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {registration.competition.Submission.length > 0 ? (
                    registration.competition.Submission.map((submission) => (
                      <Button
                        key={submission.id}
                        variant="outline"
                        className="w-48 h-48 bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        onClick={() => window.open(submission.fileUrl, '_blank')}
                      >
                        <File className="text-gray-100"/>
                      </Button>
                    ))
                  ) : (
                    <p className="text-gray-300">No submissions yet.</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-100">Feedbacks</h4>
                <div className="space-y-3 mt-3">
                  {registration.competition.Submission.length > 0 ? (
                    registration.competition.Submission.map((submission) => (
                      <div key={submission.id}>
                        {submission.feedbacks ? (
                          <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-300">{submission.feedbacks.message}</p>
                            <p className="text-sm text-gray-400 mt-2">
                              Given At: {new Date(submission.feedbacks.createdAt).toLocaleString("id-ID", {
                              day: '2-digit', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit', second: '2-digit'
                            })}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-300">No feedbacks yet for this submission.</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-300">No submissions, hence no feedbacks.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-300">You have no registrations yet.</div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
