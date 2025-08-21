import {useParams, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Tag, Trash,
  Users,
} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {BiUser} from "react-icons/bi";
import {useGetCompeById} from "@/utils/query.ts";
import {BiCategory} from "react-icons/bi";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm, useFieldArray, type Control} from "react-hook-form";
import type {RegistrationIndividualSchema, RegistrationTeamSchema} from "@/zod/validation.schema.ts";
import {useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import {decodeJwt, type JwtHeader, type JwtPayload} from "@/utils/helper.ts";

type FormValues = RegistrationIndividualSchema | RegistrationTeamSchema;

const RegisterCompetition = () => {
  const navigate = useNavigate();
  const {competitionId} = useParams<{ competitionId: string }>();

  const [decodedToken, setDecodedToken] = useState<{
    header: JwtHeader;
    payload: JwtPayload;
  } | null>(null);

  useEffect(() => {
    const t = Cookies.get("accessToken");
    if (t) {
      const decoded = decodeJwt(t);
      setDecodedToken(decoded);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const {data: competition, isLoading, error} = useGetCompeById(competitionId as string);

  const initialDefaults = useMemo<FormValues>(() => {
    // Safe initial defaults before data arrives
    return {
      competitionId: competitionId ?? "",
      leaderId: decodedToken?.payload.id ?? "",
      teamName: "",
      memberNames: [""],
      memberEmails: [""],
      memberPhoneNumbers: [""],
    } as RegistrationTeamSchema;
  }, [competitionId, decodedToken?.payload.id]);

  const form = useForm<FormValues>({
    defaultValues: initialDefaults,
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
    watch,
    reset,
  } = form;

  // Reset defaults when competition/token loaded
  useEffect(() => {
    if (!competition || !decodedToken) return;
    if (competition.type === "INDIVIDUAL") {
      reset({
        competitionId: competitionId ?? "",
        userId: decodedToken.payload.id ?? "",
      } as RegistrationIndividualSchema);
    } else {
      reset({
        competitionId: competitionId ?? "",
        leaderId: decodedToken.payload.id ?? "",
        teamName: "",
        memberNames: [""],
        memberEmails: [""],
        memberPhoneNumbers: [""],
      } as RegistrationTeamSchema);
    }
  }, [competition, decodedToken, competitionId, reset]);

  const teamMode = competition?.type !== "INDIVIDUAL";

  // Field arrays only for team mode; types narrowed to team schema to avoid TS2344
  const teamControl = control as unknown as Control<RegistrationTeamSchema>;
  // @ts-expect-error
  const namesArray = useFieldArray<RegistrationTeamSchema, "memberNames">({
    control: teamControl,
    name: "memberNames",
  });
  // @ts-expect-error
  const emailsArray = useFieldArray<RegistrationTeamSchema, "memberEmails">({
    control: teamControl,
    name: "memberEmails",
  });
  // @ts-expect-error
  const phonesArray = useFieldArray<RegistrationTeamSchema, "memberPhoneNumbers">({
    control: teamControl,
    name: "memberPhoneNumbers",
  });

  const addMember = () => {
    namesArray.append("");
    emailsArray.append("");
    phonesArray.append("");
  };
  const removeMember = (index: number) => {
    namesArray.remove(index);
    emailsArray.remove(index);
    phonesArray.remove(index);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      // TODO: integrate real API
      await new Promise((r) => setTimeout(r, 600));
      console.log("Submitted registration:", values);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to submit registration. Please try again.";
      setSubmitError(message);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div
    className="flex items-center justify-center h-screen text-red-600">Error: {error.message}</div>;
  if (!competition)
    return <div className="flex items-center justify-center h-screen text-gray-600">Competition not found</div>;

  // Use watch() and cast safely to read team arrays
  const watchedValues = watch();
  const memberNames = teamMode ? (watchedValues as RegistrationTeamSchema).memberNames ?? [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-300 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate("/")}
                  className="mb-4 bg-teal-500 shadow-lg text-gray-100 border-none hover:bg-teal-700 hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2"/>
            Back to Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Register for Competition</h1>
          <p className="text-gray-600">Complete the form below to secure your spot</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Competition Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gray-900 border-none">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-100">{competition.name}</CardTitle>
                <CardDescription className="text-gray-300">{competition.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-teal-100 font-semibold text-teal-800 mb-4">
                  {competition.category}
                </Badge>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-teal-500"/>
                    <div>
                      <p className="text-sm text-gray-100">Date</p>
                      <p className="font-medium text-gray-300">
                        {new Date(competition.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(competition.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-teal-500"/>
                    <div>
                      <p className="text-sm text-gray-100">Registration Deadline</p>
                      <p className="font-medium text-gray-300">
                        {new Date(competition.deadline).toLocaleTimeString("en-US", {
                          year: 'numeric',
                          month: "numeric",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Tag className="w-5 h-5 mr-3 text-teal-500"/>
                    <div>
                      <p className="text-sm text-gray-100">Competition Type</p>
                      <Badge variant="secondary"
                             className="font-medium text-teal-100 bg-teal-600">{competition.type}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <BiCategory className="w-5 h-5 mr-3 text-teal-500"/>
                    <div>
                      <p className="text-sm text-gray-100">Category</p>
                      <Badge variant="secondary"
                             className="font-medium text-teal-100 bg-teal-600">{competition.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-teal-300">
                  <p className="text-sm text-gray-100 mb-2">Availability</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{competition.totalParticipants} participants.</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {competition.totalRegistrations} have registered
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className={'bg-gray-900 border-none'}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Registration Form</CardTitle>
                <CardDescription className={'text-gray-300'}>Please fill in all required information</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3"/>
                    <p className="text-red-700">{submitError}</p>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {teamMode ? (
                      <>
                        {/* Team Name */}
                        <FormField
                          control={control}
                          name="teamName"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-sm font-medium text-gray-100 mb-2">
                                <Users className="w-4 h-4 mr-2"/>
                                Team Name *
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your team name" {...field}
                                       className={'placeholder:text-gray-500 text-gray-300'}/>
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />

                        {/* Team Members */}
                        <div className="space-y-4">
                          {memberNames?.map((_, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                              <FormField
                                control={control}
                                name={`memberNames.${index}` as const}
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center text-sm font-medium text-gray-100 mb-2">
                                      <BiUser className="w-4 h-4 mr-2"/>
                                      Member Name *
                                    </FormLabel>
                                    <FormControl>
                                      <Input placeholder="Full name" {...field}
                                             className={'placeholder:text-gray-500 text-gray-300'}/>
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={control}
                                name={`memberEmails.${index}` as const}
                                render={({field}) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center text-sm font-medium text-gray-100 mb-2">
                                      <Mail className="w-4 h-4 mr-2"/>
                                      Email *
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="member@email.com" {...field}
                                             className={'placeholder:text-gray-500 text-gray-300'}/>
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                )}
                              />

                              <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                  <FormField
                                    control={control}
                                    name={`memberPhoneNumbers.${index}` as const}
                                    render={({field}) => (
                                      <FormItem>
                                        <FormLabel className="flex items-center text-sm font-medium text-gray-100 mb-2">
                                          <Phone className="w-4 h-4 mr-2"/>
                                          Phone *
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="tel" placeholder="+62 812-xxx-xxxx" {...field}
                                                 className={'placeholder:text-gray-500 text-gray-300'}/>
                                        </FormControl>
                                        <FormMessage/>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => removeMember(index)}
                                  disabled={memberNames.length <= 1}
                                  className="shrink-0"
                                >
                                  <Trash/>
                                </Button>
                              </div>
                            </div>
                          ))}

                          <Button type="button" variant="secondary" onClick={addMember}
                                  disabled={memberNames.length === 3}>
                            {memberNames.length < 3 ? "Add Member" : "Maximum Members Reached"}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 rounded-md bg-orange-50 border border-orange-200 text-sm text-orange-900">
                        You are registering as an individual. Click submit to proceed.
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-6 font-semibold text-base hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Processing Registration...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2"/>
                            Complete Registration
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompetition;