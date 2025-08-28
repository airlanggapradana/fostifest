import {createContext, useContext} from "react";
import type {Data} from "@/types/competitions.type.ts";
import type {JwtHeader, JwtPayload} from "@/utils/helper.ts";
import type {StatsData} from "@/types/get-comps-stats.type.ts";

interface Session {
  header: JwtHeader;
  payload: JwtPayload;
}

export const CompetitionContext = createContext<Data[] | undefined>(undefined)
export const UserSessionContext = createContext<Session | undefined>(undefined)
export const CompetitionsContext = createContext<StatsData[] | undefined>(undefined)

export function useUserSessionContext() {
  const data = useContext(UserSessionContext);
  if (data === undefined) {
    throw new Error("useUserSessionContext must be used within a UserSessionProvider");
  }
  return data;
}

export function useCompetitionContext() {
  const data = useContext(CompetitionContext);
  if (data === undefined) {
    throw new Error("useCompetitionContext must be used within a CompetitionProvider");
  }
  return data;
}

export function useCompetitionsContext() {
  const data = useContext(CompetitionsContext);
  if (data === undefined) {
    throw new Error("useCompetitionsContext must be used within a CompetitionsProvider");
  }
  return data;
}