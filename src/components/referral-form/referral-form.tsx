import { postReferralForm } from "@/components/submitHandler";
import { IReferralFormInput } from "@/types/formTypes";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Stepper, Button } from "@mui/material";

import Link from "next/link";
import YoungPersonSection from "./youngPersonSection";
import styles from "./referral-form.module.scss";
import { QueryClient } from "@tanstack/react-query";
import ReferrerSection from "./referrerSection";
import AgencySection from "./agencySection";
export default function ReferralForm() {
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { isSubmitSuccessful, isSubmitted, isSubmitting, isValid },
  } = useForm<IReferralFormInput>();
  const multiAgencySupportStatus = watch("multiAgencySupportStatus");
  const sendStatementStatus = watch("sendStatement");
  const neetStatus = watch("neetStatus");
  
  const formValues = getValues();
  const queryClient = new QueryClient();
  queryClient.setQueryData(["pizzaLord"], () => {
    return { ...formValues };
  });
  const data = queryClient.getQueryData(["pizzaLord"]);
  const [step, setStep] = useState(1);
  const onSubmit: SubmitHandler<IReferralFormInput> = (data) => {
   console.log(data);
  };
  return (
    <div className={styles.container}>
      {isSubmitSuccessful && (
        <>
          <h1>
            Your referral was successfully sent, we&apos;ll aim to be in touch
            within the next 48hours and look forward to supporting you.
          </h1>
          <Link href={"/"}>Back to the homepage</Link>
        </>
      )}
      {isSubmitting && <p>Sending...</p>}

      {!isSubmitted && (
        <>
          <Stepper />
          <h1>KEE Youth UK Referral Form</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form_container}
          >
            <YoungPersonSection
              step={step}
              control={control}
              sendStatementStatus={sendStatementStatus}
              neetStatus={neetStatus}
            />
            <ReferrerSection step={step} control={control} />
            <AgencySection
              step={step}
              control={control}
              multiAgencySupportStatus={multiAgencySupportStatus}
            />
            <input type="submit" value="submit"/>
          </form>
        </>
      )}
    </div>
  );
}
