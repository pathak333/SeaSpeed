import { createContext } from "react";

export enum TravelState {
  passport = 0,
  visa = 1,
  seamenBook = 2,
}
export interface TravelDetailContextValue {
  state: TravelState;
  setState: React.Dispatch<React.SetStateAction<TravelState>>;
}

export const TravelDetailContext = createContext<
  TravelDetailContextValue | undefined
>(undefined);
