import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent, CardFooter,
} from "@/components/ui/card";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useLogin} from "@/utils/query.ts";
import {useNavigate} from "react-router";
import {toast} from "sonner"

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  const {mutateAsync: handleLogin, isPending} = useLogin();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await handleLogin(data);
      toast.success("Login successful! Redirecting to home page...", {
        position: 'top-center'
      });
      form.reset()
      navigate('/', {replace: true});
    } catch (e) {
      form.setError('root', {
        type: 'manual',
        message: e instanceof Error ? e.message : 'An unexpected error occurred'
      })
      form.reset({
        email: "",
        password: "",
      }, {keepErrors: true})
    }
  }

  return (
    <Card className="w-full max-w-md z-10 bg-gray-800 border-2 border-teal-400">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gray-100">Login</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Enter your username and password to access your account
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              <a href="/register" className="hover:underline">
                Don't have an account? Register now
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginPage;