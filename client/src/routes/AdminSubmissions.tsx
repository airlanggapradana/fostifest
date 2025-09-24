import {useUserSessionContext} from "@/hooks/context.ts";
import {useNavigate} from "react-router";
import {useGetSubmissions, useSendFeedback, useUpdateFeedback} from "@/utils/query.ts";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {FaRegFileAlt} from "react-icons/fa";
import {FaCommentMedical} from "react-icons/fa6";
import {Eye} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {sendFeedbackSchema, type SendFeedbackSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {toast} from "sonner";
import {BiCommentEdit} from "react-icons/bi";
import type {Feedbacks} from "@/types/get-submission-admin.type.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const AdminSubmissions = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isAddFeedbackOpen, setIsAddFeedbackOpen] = useState(false)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)
  const [isEditFeedbackOpen, setIsEditFeedbackOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedbacks | null>(null)

  const form = useForm<SendFeedbackSchema | Partial<SendFeedbackSchema>>({
    defaultValues: selectedFeedback ? {
      message: selectedFeedback.message
    } : {
      message: ''
    },
    resolver: zodResolver(selectedFeedback ? sendFeedbackSchema.partial() : sendFeedbackSchema),
  })


  const navigate = useNavigate()
  const session = useUserSessionContext()

  const {data: submissions, isLoading, error} = useGetSubmissions(page, limit)
  const {mutateAsync: handleAddFeedback, isPending} = useSendFeedback();
  const {mutateAsync: handleUpdateFeedback, isPending: isPendingUpdate} = useUpdateFeedback();


  const onsSubmit: SubmitHandler<SendFeedbackSchema | Partial<SendFeedbackSchema>> = async (data) => {
    if (!selectedFeedback) {
      if (!selectedSubmissionId) return (
        toast.error('No submission selected', {position: 'top-center', richColors: true})
      )
      try {
        const res = await handleAddFeedback({
          data: data as SendFeedbackSchema,
          submissionId: selectedSubmissionId,
          adminId: session.payload.id
        })
        if (res === 201) {
          toast.success('Feedback added successfully', {position: 'top-center', richColors: true})
          form.reset()
          setIsAddFeedbackOpen(false)
        }
      } catch (e) {
        toast.error(`Failed to add feedback`, {position: 'top-center', richColors: true})
      }
    } else {
      try {
        const res = await handleUpdateFeedback({
          data: data as Partial<SendFeedbackSchema>,
          feedbackId: selectedFeedback.id,
          adminId: session.payload.id
        })
        if (res === 200) {
          toast.success('Feedback updated successfully', {position: 'top-center', richColors: true})
          form.reset()
          setIsEditFeedbackOpen(false)
        }
      } catch (e) {
        toast.error(`Failed to update feedback`, {position: 'top-center', richColors: true})
      }
    }
  }

  if (!session || session.payload.role !== 'ADMIN') {
    navigate('/auth/login', {replace: true})
  }
  return (
    <div className=" py-8">
      <Card className="shadow-md bg-gray-800 text-gray-100 border-0">
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription className={'mt-3'}>
            <Select onValueChange={(value: string) => {
              setLimit(parseInt(value));
              setPage(1); // Reset to first page when limit changes
            }} defaultValue={limit.toString()}>
              <SelectTrigger className="w-[180px] border-teal-400 border-2 bg-gray-800 text-white">
                <SelectValue placeholder="Select items per page"/>
              </SelectTrigger>
              <SelectContent className={'bg-gray-800 border-gray-300 text-gray-100'}>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              {[...Array(limit)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full"/>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load submissions. Please try again.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && submissions && (
            <>
              <Table>
                <TableHeader>
                  <TableRow className={'hover:bg-gray-700'}>
                    <TableHead className={'text-gray-100'}>ID</TableHead>
                    <TableHead className={'text-gray-100'}>Competition Title</TableHead>
                    <TableHead className={'text-gray-100'}>User</TableHead>
                    <TableHead className={'text-gray-100'}>Submission</TableHead>
                    <TableHead className={'text-gray-100'}>Feedback</TableHead>
                    <TableHead className={'text-gray-100'}>Submitted At</TableHead>
                    <TableHead className={'text-gray-100'}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.data.length > 0 ? (
                    submissions.data.map((sub) => (
                      <TableRow key={sub.id} className={'hover:bg-gray-700'}>
                        <TableCell>{sub.id}</TableCell>
                        <TableCell>{sub.competition.name}</TableCell>
                        <TableCell>{sub.user?.name || "Unknown"}</TableCell>
                        <TableCell>
                          <Button
                            variant={'outline'}
                            onClick={() => window.open(sub.fileUrl, '_blank')}
                          >
                            <FaRegFileAlt className={'text-gray-700'}/>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <p className={'text-gray-300'}>
                            {sub.feedbacks ? `${sub.feedbacks.message.slice(0, 30)}...` : "No Feedback"}
                          </p>
                        </TableCell>
                        <TableCell>
                          {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className={'flex items-center gap-2'}>
                          <Button
                            variant={'outline'}
                            disabled={sub.feedbacks !== null}
                            onClick={() => {
                              setSelectedSubmissionId(sub.id)
                              setIsAddFeedbackOpen(true)
                            }}
                          >
                            <FaCommentMedical className={'text-gray-700'}/>
                          </Button>
                          <Button
                            variant={'outline'}
                            disabled={sub.feedbacks === null}
                            onClick={() => {
                              setSelectedFeedback(sub.feedbacks)
                              form.setValue('message', sub.feedbacks?.message)
                              setIsEditFeedbackOpen(true)
                            }}
                          >
                            <BiCommentEdit className={'text-gray-700'}/>
                          </Button>
                          <Button
                            variant={'outline'}
                          >
                            <Eye className={'text-gray-700'}/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No submissions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Button variant="secondary" onClick={() => setPage(page + 1)}
                        disabled={!submissions}>
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* AddFeedbackDialog */}
      <Dialog open={isAddFeedbackOpen} onOpenChange={setIsAddFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
            <DialogDescription>
              This action will add feedback to the submission.
            </DialogDescription>
          </DialogHeader>
          {/* Feedback Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsSubmit)} className={'space-y-3'}>
              <FormField
                control={form.control}
                name={'message'}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder={'Enter your feedback for this submission here...'} {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <Button
                type={'submit'}
                disabled={isPending}
              >
                {isPending ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* EditFeedbackDialog */}
      {selectedFeedback && (
        <Dialog open={isEditFeedbackOpen} onOpenChange={setIsEditFeedbackOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Feedback</DialogTitle>
              <DialogDescription>
                This action will edit feedback to the submission.
              </DialogDescription>
            </DialogHeader>
            {/* Feedback Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsSubmit)} className={'space-y-3'}>
                <FormField
                  control={form.control}
                  name={'message'}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder={'Enter your feedback for this submission here...'} {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <Button
                  type={'submit'}
                  disabled={isPendingUpdate}
                >
                  {isPendingUpdate ? 'Updating...' : 'Update Feedback'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminSubmissions;
