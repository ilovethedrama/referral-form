import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Link from "next/link";
import styles from "./referral-form.module.scss";
import FormStepperIo from "./foes";
import ctx from "../../app/ReferralFormContext";

export default function ReferralForm() {
  const { activeStep, steps } = React.useContext(ctx);
  const dynamicFormObject = (stage: string) => {
    return yup.object().shape({
      stage: yup
        .string()
        .oneOf(["Referrer Information", "Young Person Details", "Agency"]),
      ...(stage === "Referrer Information" && {
        referrerFirstName: yup.string().required(),
        referrerLastName: yup.string().required(),
        referrerEmail: yup.string().required(),
        referrerContactNumber: yup.string().required(),
        referrerAgency: yup.string().required(),
        referrerRelationshipType: yup.string().required(),
      }),
      ...(stage === "Young Person Details" && {
        referralGender: yup.string().required(),
        referralFirstName: yup.string().required(),
        referralLastName: yup.string().required(),
        referralEmail: yup.string().required(),
        referralContactNumber: yup.string().required(),
        referralDateOfBirth: yup.string().required(),
        sendStatement: yup.string().required(),
        neetStatus: yup.string().required(),
      }),
      ...(stage === "Agency" && {
        multiAgencySupportStatus: yup.string().required(),
        agencyFirstName: yup.string(),
        agencyLastName: yup.string(),
        agencyRole: yup.string(),
        agencyNumber: yup.string(),
        agencyEmail: yup.string(),
      }),
    });
  };

  const formSchema = yup.lazy((value: { stage: string }) =>
    dynamicFormObject(value.stage || steps[activeStep.step])
  );

  const methods = useForm({ resolver: yupResolver(formSchema) });

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
