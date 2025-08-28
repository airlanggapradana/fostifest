import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import type {GetAllCompetitionsResponse} from "@/types/competitions.type.ts";
import type {
  LoginSchema,
  PaymentSchema,
  RegisterSchema,
  RegistrationIndividualSchema,
  RegistrationTeamSchema
} from "@/zod/validation.schema.ts";
import type {RegisterResponse} from "@/types/register.type.ts";
import Cookies from "js-cookie";
import type {GetCompetitionByIdResponse} from "@/types/competitionById.type.ts";
import type {PaymentAPIResponse} from "@/types/payment.type.ts";
import type {RegistrationResponse} from "@/types/registration.type.ts";
import type {GetUserDetailsResponse} from "@/types/userDetails.type.ts";
import type {GetCompsStatsResponse} from "@/types/get-comps-stats.type.ts";

export const useGetAllComps = () => {
  return useQuery({
    queryKey: ['getAllComps'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${VITE_BASE_API_URL}/competition`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }).then(res => res.data as GetAllCompetitionsResponse)
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to fetch competitions');
        }
        throw new Error('An unexpected error occurred while fetching competitions');
      }
    }
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      try {
        const res = await axios.post(`${VITE_BASE_API_URL}/auth/login`, data, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then(res => res.data as { message: string, data: string });
        // Set the access token in cookies
        Cookies.set('accessToken', res.data)
        return res.data
      } catch (e) {
        // console.log(e)
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Login failed');
        }
        throw new Error('An unexpected error occurred during login');
      }
    }
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      try {
        const res = await axios.post(`${VITE_BASE_API_URL}/user`, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
          institusi: data.institusi,
          role: 'PARTICIPANT'
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then(res => res.data as RegisterResponse)
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Registration failed');
        }
        throw new Error('An unexpected error occurred during registration');
      }
    }
  })
}

export const useGetCompeById = (competitionId: string) => {
  return useQuery({
    queryKey: ['getCompetition', {competitionId}],
    queryFn: async () => {
      try {
        const res = await axios.get(`${VITE_BASE_API_URL}/competition/${competitionId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }).then(res => res.data as GetCompetitionByIdResponse)
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to fetch competition details');
        }
        throw new Error('An unexpected error occurred while fetching competition details');
      }
    }
  })
}

export const useRegisterIndividual = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegistrationIndividualSchema) => {
      try {
        const res = await axios.post(`${VITE_BASE_API_URL}/registration/individual`, {
          competitionId: data.competitionId,
          status: 'PENDING',
          userId: data.userId
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }).then(res => res.data as RegistrationResponse)
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to register for competition');
        }
        throw new Error('An unexpected error occurred while registering for competition');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['getAllComps']});
      await queryClient.invalidateQueries({queryKey: ['getUserDetails']});
    }
  })
}

export const useRegisterTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegistrationTeamSchema) => {
      try {
        const res = await axios.post(`${VITE_BASE_API_URL}/registration/team`, {
          competitionId: data.competitionId,
          status: "PENDING",
          leaderId: data.leaderId,
          teamName: data.teamName,
          memberNames: data.memberNames,
          memberEmails: data.memberEmails,
          memberPhoneNumbers: data.memberPhoneNumbers
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(res => res.data as RegistrationResponse)
        return res.data
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to register team for competition');
        }
        throw new Error('An unexpected error occurred while registering team for competition');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['getAllComps']});
      await queryClient.invalidateQueries({queryKey: ['getUserDetails']});
    }
  })
}

export const usePayment = () => {
  return useMutation({
    mutationFn: async (data: PaymentSchema) => {
      try {
        return await axios.post(`${VITE_BASE_API_URL}/payment`, {
          registrationId: data.registrationId,
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(res => res.data as PaymentAPIResponse);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Payment failed');
        }
        throw new Error('An unexpected error occurred during payment');
      }
    }
  })
}

export const useGetUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ['getUserDetails', {userId}],
    queryFn: async () => {
      try {
        const res = await axios.get(`${VITE_BASE_API_URL}/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }).then(res => res.data as GetUserDetailsResponse)
        return res.data
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to fetch user details');
        }
        throw new Error('An unexpected error occurred while fetching user details');
      }
    }
  })
}

export const useGetCompsStats = () => {
  return useQuery({
    queryKey: ['getCompsStats'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${VITE_BASE_API_URL}/admin/get-comps-stats`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }).then(res => res.data as GetCompsStatsResponse)
        return res.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message || 'Failed to fetch competitions statistics');
        }
        throw new Error('An unexpected error occurred while fetching competitions statistics');
      }
    }
  })
}