"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReferralContext from "./ReferralFormContext";

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [activeStep, setActiveStep] = React.useState({
    step: 0,
    isValid: false,
  });

  const steps = [
    "Referrer Information",
    "Young Person Details",
    "Agency",
    "Summary",
  ];

  const referralProviderValue = React.useMemo(
    () => ({
      activeStep,
      setActiveStep,
      steps,
    }),
    [activeStep, setActiveStep]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReferralContext.Provider value={referralProviderValue}>
        {children}
      </ReferralContext.Provider>
    </QueryClientProvider>
  );
}
