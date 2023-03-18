import { createContext } from "react";

export enum Personalstate {
  personalDetails = 0,
  contactDetails = 1,
  educationBackground = 2,
  bankDetails = 3,
  kinDetails = 4,
}

export interface PersonalDetailContextValue {
  state: Personalstate;
  setState: React.Dispatch<React.SetStateAction<Personalstate>>;
}
export const PersonalDetailContext = createContext<
  PersonalDetailContextValue | undefined
>(undefined);
