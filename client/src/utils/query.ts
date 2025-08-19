import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import type {GetAllCompetitionsResponse} from "@/types/competitions.type.ts";

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