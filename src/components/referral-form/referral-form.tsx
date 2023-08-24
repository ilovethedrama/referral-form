import { IReferralFormInput } from "@/types/formTypes";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import Link from "next/link";
import styles from "./referral-form.module.scss";
import FormStepperIo from "./foes";

export default function ReferralForm() {
  const methods = useForm<IReferralFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      gender: "",
      address: {
        houseNumber: "",
        flatNumber: "",
        street: "",
        townOrCity: "",
        county: "",
        postCode: "",
      },
      contactNumber: "",
      dateOfBirth: "",
      email: "",
      neetStatus: "",
      reasonForNEET: "",
      referrerFullName: "",
      referrerRelationshipType: "",
      reasonForReferral: "",
      referralSignature: "",
      sendStatement: "",
      sendStatementOther: "",
      sendStatementAlternative: "",
      multiAgencySupportStatus: "",
    },
  });

  return (
    <div className={styles.container}>
      {methods.formState.isSubmitSuccessful && (
        <>
          <h1>
            Your referral was successfully sent, we&apos;ll aim to be in touch
            within the next 48hours and look forward to supporting you.
          </h1>
          <Link href={"/"}>Back to the homepage</Link>
        </>
      )}
      {methods.formState.isSubmitting && <p>Sending...</p>}

      {!methods.formState.isSubmitted && (
        <>
          <h1>KEE Youth UK Referral Form</h1>
          <FormProvider {...methods}>
            <FormStepperIo handleSubmit={methods.handleSubmit} />
          </FormProvider>
        </>
      )}
    </div>
  );
}
