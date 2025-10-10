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
import {VITE_BASE_URL} from "@/env.ts";
import SEO from "@/hooks/SEO.tsx";

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
      navigate('/auth/login', {replace: true});
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
    <>
      <SEO
        title="Register | FOSTIFEST 2025 – FOSTI UMS"
        description="Create your account for FOSTIFEST 2025 by FOSTI UMS. Register now to join the festival, competitions, and workshops!"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Register - FOSTIFEST 2025",
          "url": `${VITE_BASE_URL}/register`,
          "description": "Registration page for FOSTIFEST 2025 by FOSTI UMS."
        }}
      />
      <div className="min-h-full flex items-center justify-center p-2 sm:p-6">
        <Card
          className="w-full overflow-auto max-h-[40rem] max-w-md sm:max-w-2xl z-10 bg-gray-800 border-2 border-teal-400">
          <CardHeader className="space-y-1">
            <Button className=" text-sm" onClick={() => navigate(-1)}>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 sm:space-y-4">
              <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 px-4 sm:px-8">
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Email</FormLabel>
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Fullname</FormLabel>
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Phone</FormLabel>
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Password</FormLabel>
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Confirm Password</FormLabel>
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
                      <FormLabel className="text-gray-100 text-sm sm:text-base">Institution</FormLabel>
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

              <CardFooter className="grid grid-cols-1 gap-3 px-3 sm:px-6">
                <Button type="submit" className="w-full h-11 sm:h-10 text-sm sm:text-base"
                        disabled={isPending}>
                  {isPending ? "Creating account..." : "Create Account"}
                </Button>
                <div className="text-xs sm:text-sm text-center text-muted-foreground">
                  <a href="/auth/login" className="hover:underline text-teal-400">
                    Already have an account? Sign In
                  </a>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
