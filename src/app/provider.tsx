"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReferralContext from "./ReferralFormContext";

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [nextClick, setNextClick] = React.useState(null);
  const [radioIsValid, setRadioIsValid] = React.useState(false);

  const referralProviderValue = React.useMemo(
    () => ({ nextClick, setNextClick, radioIsValid, setRadioIsValid }),
    [nextClick, setNextClick, radioIsValid, setRadioIsValid]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReferralContext.Provider value={referralProviderValue}>
        {children}
      </ReferralContext.Provider>
    </QueryClientProvider>
  );
}
