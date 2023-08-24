import { createContext } from "react";
// types

const ctx: CtxType = {
  setRadioIsValid: () => {},
  setNextClick: () => {},
  nextClick: null,
  radioIsValid: false, 
};

export interface CtxType {
  setNextClick: Function;
  nextClick: null | boolean;
  radioIsValid: boolean;
  setRadioIsValid: Function;
}

const ReferralContext = createContext(ctx);

export default ReferralContext;
