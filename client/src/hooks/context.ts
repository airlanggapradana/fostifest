import {createContext, useContext} from "react";
import type {Data} from "@/types/competitions.type.ts";

export const CompetitionContext = createContext<Data[] | undefined>(undefined)

export function useCompetitionContext() {
  const data = useContext(CompetitionContext);
  if (data === undefined) {
    throw new Error("useCompetitionContext must be used within a CompetitionProvider");
  }
  return data;
}