import {useUserSessionContext} from "@/hooks/context.ts";
import {useGetUserDetailsAdmin, useSendSubmission} from "@/utils/query.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Calendar, Edit, File, Trophy} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {sendSubmissionSchema, type SendSubmissionSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {BiPlus} from "react-icons/bi";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {toast} from "sonner";
import {AxiosError} from "axios";

const Submissions = () => {
  const session = useUserSessionContext()
  const {data: user, isLoading, error} = useGetUserDetailsAdmin(session.payload.id)
  const {mutateAsync: handleSendSubmission, isPending} = useSendSubmission()
  const [competitionId, setCompetitionId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<SendSubmissionSchema>({
    defaultValues: {
      fileUrl: '',
    },
    resolver: zodResolver(sendSubmissionSchema)
  })

  const onSubmit: SubmitHandler<SendSubmissionSchema> = async (data) => {
    try {
      if (!competitionId) return (
        toast.error("Competition ID is missing")
      );
      const res = await handleSendSubmission({
        data,
        competitionId
      })
      if (res === 201) {
        toast.success("Submission sent successfully", {position: "top-center", richColors: true})
        setIsModalOpen(false)
        form.reset()
      } else {
        form.reset()
        setIsModalOpen(false)
        toast.error("Failed to send submission", {position: "top-center", richColors: true})
      }
    } catch (e) {
      form.reset()
      toast.error(e instanceof AxiosError ? e.response?.data.message : (e as Error).message, {
        position: "top-center",
        richColors: true
      })
      setIsModalOpen(false)
    }
  }

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
                <div className={'flex items-center justify-between'}>
                  <h3 className="text-xl font-semibold text-gray-100">Your Submissions</h3>
                  <Button
                    onClick={() => {
                      if (registration.competition.type === 'INDIVIDUAL') {
                        form.setValue('userId', session.payload.id)
                        form.setValue('teamId', undefined)
                      } else {
                        form.setValue('teamId', registration.teamId!)
                        form.setValue('userId', undefined)
                      }
                      setCompetitionId(registration.competitionId)
                      setIsModalOpen(true)
                    }}
                  >
                    <BiPlus/>
                    Add Submission
                  </Button>
                </div>
                <div className="w-full mt-3">
                  {registration.competition.Submission.length > 0 ? (
                    registration.competition.Submission.map((submission) => (
                      <div className={'flex items-start gap-4'}>
                        <Button
                          key={submission.id}
                          variant="outline"
                          className="w-48 h-48 bg-gray-700 hover:bg-gray-600"
                          onClick={() => window.open(submission.fileUrl, '_blank')}
                        >
                          <File className="text-gray-100 h-48 w-48"/>
                        </Button>
                        <Button
                          variant={'outline'}
                        >
                          <Edit/>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="text-gray-300">No submissions yet, please submit one by clicking the button on the
                        right side.</p>
                    </div>
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

      {/* dialog */}
      {isModalOpen && competitionId && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({field}) => (
                    <div className={'space-y-3'}>
                      <FormLabel>File URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your submission file URL" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </div>
                  )}
                />

                <Button
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Submissions;
