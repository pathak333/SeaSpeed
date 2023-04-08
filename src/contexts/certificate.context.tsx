import { createContext } from "react";

export enum CertificateState {
    //Certificate of competency, Flag endorsement, Dangerous cargo endorsement
    competency = 0,
    flag = 1,
    dangerousCargo = 2,
}
export interface CertificateContextValue {
  state: CertificateState;
  setState: React.Dispatch<React.SetStateAction<CertificateState>>;
}

export const CertificateContext = createContext<
CertificateContextValue | undefined
>(undefined);
