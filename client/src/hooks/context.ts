import {createContext, useContext} from "react";
import type {Data} from "@/types/competitions.type.ts";
import type {JwtHeader, JwtPayload} from "@/utils/helper.ts";

interface Session {
  header: JwtHeader;
  payload: JwtPayload;
}

export const CompetitionContext = createContext<Data[] | undefined>(undefined)
export const UserSessionContext = createContext<Session | undefined>(undefined)

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