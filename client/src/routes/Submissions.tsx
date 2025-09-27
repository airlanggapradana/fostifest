import {useUserSessionContext} from "@/hooks/context.ts";
import {useDeleteSubmission, useGetUserDetailsAdmin, useSendSubmission} from "@/utils/query.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Calendar, Trash, Trophy} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useCallback, useState} from "react";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {sendSubmissionSchema, type SendSubmissionSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import {BiPlus} from "react-icons/bi";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import {useDropzone} from "react-dropzone";
import {FaFileArchive} from "react-icons/fa";

const Submissions = () => {
  const session = useUserSessionContext()
  const {data: user, isLoading, error} = useGetUserDetailsAdmin(session.payload.id)
  const {mutateAsync: handleDeleteSubmission, isPending: isPendingDelete} = useDeleteSubmission();
  const {mutateAsync: handleSendSubmission, isPending} = useSendSubmission()
  const [competitionId, setCompetitionId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileUrl, setFileUrl] = useState<string | null>(null);


  const form = useForm<SendSubmissionSchema>({
    defaultValues: {
      fileUrl: null,
    },
    resolver: zodResolver(sendSubmissionSchema)
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        form.setValue("fileUrl", acceptedFiles[0], {shouldValidate: true});
      }
    },
    [form]
  );

  const onSubmit: SubmitHandler<SendSubmissionSchema> = async (data) => {
    if (!data.fileUrl) {
      toast.error("File URL is required", {position: "top-center", richColors: true});
      return;
    }

    const formData = new FormData();
    formData.append("file", data.fileUrl as File);

    if (!competitionId) {
      toast.error("Competition ID is missing");
      return;
    }

    try {
      setUploading(true);

      // 1. Upload file
      const res = await fetch(`${VITE_BASE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await res.json() as { message: string; path: string; url: string };

      if (!res.ok) {
        toast.error("Upload failed. Please try again.", {position: "top-center", richColors: true});
        return;
      }

      // 👉 pakai uploadResult.url langsung untuk API berikutnya
      setFileUrl(uploadResult.url); // hanya untuk preview UI

      // 2. Send submission ke backend
      const submissionRes = await handleSendSubmission({
        data: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          fileUrl: uploadResult.url, // ✅ langsung pakai URL hasil upload
          filePath: uploadResult.path,
          userId: data.userId,
          teamId: data.teamId,
        },
        competitionId,
      });

      if (submissionRes === 201) {
        toast.success("Submission sent successfully", {position: "top-center", richColors: true});
        setIsModalOpen(false);
        form.reset();
      } else {
        toast.error("Failed to send submission", {position: "top-center", richColors: true});
        setIsModalOpen(false);
        form.reset();
      }
    } catch (e) {
      toast.error(
        e instanceof AxiosError ? e.response?.data.message : (e as Error).message,
        {position: "top-center", richColors: true}
      );
      setIsModalOpen(false);
      form.reset();
    } finally {
      setUploading(false);
    }
  };


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
                        form.setValue('userId', session.payload.id)
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
                      <div className={'flex items-center justify-between'} key={submission.id}>
                        <div className={'flex items-center gap-4'}>
                          <Button
                            variant="outline"
                            onClick={() => window.open(submission.fileUrl, '_blank')}
                            className={'h-12 w-12'}
                          >
                            <FaFileArchive className="text-gray-800"/>
                          </Button>
                          <a
                            href={submission.fileUrl}
                            target="_blank"
                            className="text-blue-400 hover:underline break-all max-w-xl"
                          >
                            {submission.fileUrl}
                          </a>
                        </div>

                        <Button
                          variant={'outline'}
                          disabled={isPendingDelete}
                          onClick={async () => {
                            const res = await handleDeleteSubmission(submission.id)
                            if (res === 200) {
                              toast.success("Submission deleted successfully", {
                                position: "top-center",
                                richColors: true
                              });
                            }
                          }}
                        >
                          <Trash/>
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
              <DialogTitle>Submit your works here!</DialogTitle>
              <DialogDescription>
                Please upload your submission file according to the competition requirements.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Dropzone controlled by RHF */}
                <Controller
                  control={form.control}
                  name="fileUrl"
                  render={({field}) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const {getRootProps, getInputProps, isDragActive} = useDropzone({
                      onDrop,
                      multiple: false,
                      accept: {"application/pdf": [".pdf"]}, // hanya PDF
                      maxSize: 10 * 1024 * 1024, // 10MB
                      onDropRejected: (fileRejections) => {
                        fileRejections.forEach((rej) => {
                          rej.errors.forEach((err) => {
                            if (err.code === "file-too-large") {
                              toast.error("File size must be less than 10MB", {
                                position: "top-center",
                                richColors: true,
                              });
                            }
                            if (err.code === "file-invalid-type") {
                              toast.error("Only PDF files are allowed", {
                                position: "top-center",
                                richColors: true,
                              });
                            }
                          });
                        });
                      },
                    });


                    const file = field.value as File | null; // 👈 kasih type hint

                    return (
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                          isDragActive ? "bg-blue-100 border-blue-400" : "border-gray-400"
                        }`}
                      >
                        <input {...getInputProps()} />
                        {file ? (
                          <p className="text-green-600">{file.name}</p>
                        ) : (
                          <p>Drag & drop a file here, or click to select</p>
                        )}
                      </div>
                    );
                  }}
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
