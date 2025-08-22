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
    <Card className="w-full max-w-md z-10 bg-gray-800 border-2 border-teal-400">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gray-100">Register</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Fill in the form below to create a new account
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            {form.formState.errors.root && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <div className="space-y-2">
                  <FormLabel className={'text-gray-100'}>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
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
                  <FormLabel className={'text-gray-100'}>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+6281227163232"
                      {...field}
                      className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
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
                  <FormLabel className={'text-gray-100'}>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your fullname"
                      {...field}
                      className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
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
                  <FormLabel className={'text-gray-100'}>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
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
                  <FormLabel className={'text-gray-100'}>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={form.formState.errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
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
                <div className="space-y-2">
                  <FormLabel className={'text-gray-100'}>Institution</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your institution"
                      {...field}
                      className={form.formState.errors.institusi ? "border-red-500 focus-visible:ring-red-500" : "placeholder:text-gray-500 text-gray-100 border-emerald-600"}
                    />
                  </FormControl>
                  <FormMessage/>
                </div>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              <a href="/login" className="hover:underline">
                Already have an account? Sign In
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterPage;
