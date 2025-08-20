import {useMutation, useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import type {GetAllCompetitionsResponse} from "@/types/competitions.type.ts";
import type {LoginSchema, RegisterSchema} from "@/zod/validation.schema.ts";
import type {RegisterResponse} from "@/types/register.type.ts";

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
          withCredentials: true
        }).then(res => res.data as { message: string, data: string });
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