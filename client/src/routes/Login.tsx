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

const LoginPage: React.FC = () => {
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      if (data.email !== 'rangga@example.com') {
        throw new Error("Invalid email")
      }
      if (data.password !== 'password123') {
        throw new Error("Invalid password")
      }
      form.reset()
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
    <Card className="w-full max-w-md z-10 border-2 bg-gray-100 border-teal-500">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage/>
                </div>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              <a href="#" className="hover:underline">
                Forgot your password?
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginPage;