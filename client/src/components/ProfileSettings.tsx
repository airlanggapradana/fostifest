import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Camera, Save} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AiFillX} from "react-icons/ai";
import {useGetUserDetails, useUpdateProfile} from "@/utils/query.ts";
import {useUserSessionContext} from "@/hooks/context.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {updateProfileSchema, type UpdateProfileSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {toast} from "sonner"
import {Switch} from "@/components/ui/switch"

const ProfileSettings = () => {
  const session = useUserSessionContext()
  const {data: user, isLoading, error} = useGetUserDetails(session.payload.id);
  const [onEdit, setOnEdit] = useState(true);

  const form = useForm<UpdateProfileSchema>({
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      phone: user.phone,
      institusi: user.institusi,
    } : {
      name: '',
      email: '',
      phone: '',
      institusi: '',
    },
    resolver: zodResolver(updateProfileSchema)
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        institusi: user.institusi,
      });
    }
  }, [form, user]);

  const {mutateAsync: handleUpdateProfile, isPending} = useUpdateProfile();

  const onSubmit: SubmitHandler<UpdateProfileSchema> = async (data) => {
    try {
      const res = await handleUpdateProfile({
        data,
        userId: session.payload.id
      });
      if (res === 200) {
        toast.success("Profile updated successfully.", {position: "top-center", richColors: true});
        form.reset()
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong", {position: "top-center", richColors: true});
    }
  }
  return (
    <div className="min-h-screen py-6">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <AiFillX className="inline-block mr-2"/>
          {error.message}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-100">Edit Profile</h1>
              <p className="text-gray-300 mt-1">Update your personal information and preferences</p>
            </div>
            <Badge variant="default" className="text-sm text-gray-100">
              Profile Settings
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5"/>
                  Profile Picture
                </CardTitle>
                <CardDescription>
                  profile picture cannot be changed at the moment
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-48 w-48 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-2xl">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
            {/* Main Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader className={'flex items-center justify-between'}>
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your basic profile information
                    </CardDescription>
                  </div>
                  <Switch
                    checked={onEdit}
                    onCheckedChange={setOnEdit}
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
                      <FormField
                        control={form.control}
                        name={'name'}
                        render={({field}) => (
                          <div className="space-y-2">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                type={'text'}
                                {...field}
                                disabled={onEdit}
                                placeholder="Enter your name"
                              />
                            </FormControl>
                            <FormMessage/>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={'email'}
                        render={({field}) => (
                          <div className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type={'email'}
                                {...field}
                                disabled={onEdit}
                                placeholder="Enter your email"
                              />
                            </FormControl>
                            <FormMessage/>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={'phone'}
                        render={({field}) => (
                          <div className="space-y-2">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type={'tel'}
                                {...field}
                                disabled={onEdit}
                                placeholder="Enter your phone number"
                              />
                            </FormControl>
                            <FormMessage/>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={'institusi'}
                        render={({field}) => (
                          <div className="space-y-2">
                            <FormLabel>Institusi</FormLabel>
                            <FormControl>
                              <Input
                                type={'text'}
                                {...field}
                                disabled={onEdit}
                                placeholder="Enter your phone insititusi"
                              />
                            </FormControl>
                            <FormMessage/>
                          </div>
                        )}
                      />

                      <Button type="submit" disabled={isPending} className="w-full" variant="default">
                        <Save className="mr-2 h-4 w-4"/>
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
