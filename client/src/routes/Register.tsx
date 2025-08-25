import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {registerSchema, type RegisterSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRegister} from "@/utils/query.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {ArrowLeft} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      phone: '',
      name: "",
      confirmPassword: "",
      institusi: ""
    },
    resolver: zodResolver(registerSchema)
  })

  const {mutateAsync: handleRegister, isPending} = useRegister();

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await handleRegister(data);
      toast.success("Register successful! Redirecting to login page...", {
        position: 'top-center'
      });
      form.reset();
      navigate('/login', {replace: true});
    } catch (e) {
      form.setError('root', {
        type: 'manual',
        message: e instanceof Error ? e.message : 'An unexpected error occurred'
      })
      form.reset({
        email: "",
        password: "",
        phone: '',
        name: "",
        confirmPassword: "",
        institusi: ""
      }, {keepErrors: true});
    }
  }
  return (
    <div className="min-h-svh flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-sm sm:max-w-md z-10 bg-gray-800 border-2 border-teal-400">
        <CardHeader className="space-y-1">
          <Button className="w-1/3 sm:w-1/4 text-sm" onClick={() => navigate(-1)}>
            <ArrowLeft/>
            Back
          </Button>
          <CardTitle className="text-lg sm:text-2xl text-start font-bold sm:text-center text-gray-100">
            Register
          </CardTitle>
          <CardDescription className="text-start sm:text-center text-sm sm:text-base text-gray-300">
            Fill in the form below to create a new account
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="grid grid-cols-2 gap-4">
              {form.formState.errors.root && (
                <div className="col-span-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <div className="space-y-2 col-span-2">
                    <FormLabel className="text-gray-100">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="Enter your email"
                        {...field}
                        className={
                          form.formState.errors.email
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <div className="space-y-2">
                    <FormLabel className="text-gray-100">Fullname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your fullname"
                        {...field}
                        className={
                          form.formState.errors.name
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <div className="space-y-2">
                    <FormLabel className="text-gray-100">Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+6281227163232"
                        {...field}
                        className={
                          form.formState.errors.phone
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <div className="space-y-2">
                    <FormLabel className="text-gray-100">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        {...field}
                        className={
                          form.formState.errors.password
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <div className="space-y-2">
                    <FormLabel className="text-gray-100">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        {...field}
                        className={
                          form.formState.errors.confirmPassword
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="institusi"
                render={({field}) => (
                  <div className="space-y-2 col-span-2">
                    <FormLabel className="text-gray-100">Institution</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="organization"
                        placeholder="Enter your institution"
                        {...field}
                        className={
                          form.formState.errors.institusi
                            ? "border-red-500 focus-visible:ring-red-500 h-11 sm:h-10 placeholder:text-gray-500 text-gray-100"
                            : "placeholder:text-gray-500 text-xs sm:text-sm placeholder:text-sm placeholder:sm:text-base text-gray-100 border-emerald-600 h-11 sm:h-10"
                        }
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                )}
              />
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-4">
              <Button type="submit" className="col-span-2 w-full h-11 sm:h-10 text-sm sm:text-base"
                      disabled={isPending}>
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
              <div className="col-span-2 text-sm text-center text-muted-foreground">
                <a href="/login" className="hover:underline">
                  Already have an account? Sign In
                </a>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
