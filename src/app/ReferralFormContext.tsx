import { IActiveStep } from "@/types/formTypes";
import { createContext } from "react";

const ctx: CtxType = {
  activeStep: { step: 0, isValid: false },
  setActiveStep: () => {},
  steps: [],
};

export interface CtxType {
  activeStep: IActiveStep;
  setActiveStep: Function;
  steps: string[];
}

const ReferralContext = createContext(ctx);

export default ReferralContext;
