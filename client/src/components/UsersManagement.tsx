import {useGetUsersData} from "@/utils/query.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.tsx";
import {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {Button} from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Edit, Eye, Search, Trash} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import UserDetails from "@/components/UserDetails.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useDebounce} from 'use-debounce';

const UsersManagement = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(search, 1000);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const {data, isLoading, error} = useGetUsersData(page, limit, debouncedSearch);
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  return (
    <div className="max-w-full mx-auto mt-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Users <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">Management</span>
        </h1>
        <p className="text-gray-300">Manage all registered users here.</p>
      </div>
      <div>
        <Card className={'bg-teal-800 border-teal-300'}>
          <CardHeader>
            <p className={'text-sm text-gray-100 font-medium'}>Limit items per page</p>
            <Select onValueChange={(value: string) => {
              setLimit(parseInt(value));
              setPage(1); // Reset to first page when limit changes
            }} defaultValue={limit.toString()}>
              <SelectTrigger className="w-[180px] border-teal-400 border-2 bg-teal-700 text-white">
                <SelectValue placeholder="Select items per page"/>
              </SelectTrigger>
              <SelectContent className={'bg-teal-700 border-teal-300 text-gray-100'}>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300"/>
                <Input
                  placeholder="Search users..."
                  className="bg-teal-700 border-teal-400 text-white placeholder:text-gray-300 focus-visible:ring-teal-400 pl-8"
                  value={search || ''}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // Reset to first page when search changes
                  }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className={'text-gray-300'}>A list of registered users in the system.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Phone</TableHead>
                  <TableHead className="text-white">Institution</TableHead>
                  <TableHead className="text-white">Registered At</TableHead>
                  <TableHead className="text-white">Total Competitions</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.data && data.data.length > 0 ? (
                  data.data.map((user) => (
                    <TableRow key={user.id} className={'text-gray-200 hover:bg-teal-700'}>
                      <TableCell>{`${user.id}`}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.institution}</TableCell>
                      <TableCell>{new Date(user.joinedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</TableCell>
                      <TableCell>{user.totalCompetitions}</TableCell>
                      <TableCell className={'flex items-center gap-2'}>
                        <Button
                          variant="secondary" size="sm"
                          onClick={() => {
                            setUserId(user.id)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye/>
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Edit/>
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading.
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={8} className="text-center bg-teal-800">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                            Previous
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink className={'text-gray-100'}>{page}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <Button variant="secondary" onClick={() => setPage(page + 1)}
                                  disabled={!data || page >= data.totalPages}>
                            Next
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className={'sm:max-w-8xl max-h-[90vh] overflow-y-auto'}>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
            {userId && <UserDetails userId={userId}/>}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
