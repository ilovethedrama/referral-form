import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Link from "next/link";
import styles from "./referral-form.module.scss";
import FormStepperIo from "./foes";
import ctx from "../../app/ReferralFormContext";
import { Button } from "@mui/material";

export default function ReferralForm() {
  const { activeStep, steps } = React.useContext(ctx);
  const dynamicFormObject = (
    stage: string,
    multiAgencySupportStatus: string,
  ) => {
    return yup.object().shape({
      stage: yup
        .string()
        .oneOf([
          "Referrer Information",
          "Young Person Details",
          "Agency",
          "Confirmation",
        ]),
      ...(stage === "Referrer Information" && {
        referrerFirstName: yup.string().required(),
        referrerLastName: yup.string().required(),
        referrerEmail: yup.string().required(),
        referrerContactNumber: yup.string().required(),
        referrerAgency: yup.string().required(),
        referrerRelationshipType: yup.string().required(),
        referrerAddress: yup.object({
          "House Number": yup.string(),
          "Flat Number": yup.string(),
          Street: yup.string(),
          "Town or City": yup.string().required(),
          County: yup.string(),
          Postcode: yup.string().required(),
        }),
      }),
      ...(stage === "Young Person Details" && {
        referralGender: yup.string().required(),
        referralFirstName: yup.string().required(),
        referralLastName: yup.string().required(),
        referralEmail: yup.string().required().email(),
        referralContactNumber: yup.string().required(),
        referralDateOfBirth: yup.string().required(),
        sendStatement: yup.string().required(),
        neetStatus: yup.string().required(),
      }),
      ...(stage === "Agency" && {
        multiAgencySupportStatus: yup.string().required(),
        ...(multiAgencySupportStatus === "Yes"
          ? {
              agencyFirstName: yup.string().required(),
              agencyLastName: yup.string().required(),
              agencyRole: yup.string().required(),
              agencyNumber: yup.string().required(),
              agencyEmail: yup.string().required(),
            }
          : {
              agencyFirstName: yup.string(),
              agencyLastName: yup.string(),
              agencyRole: yup.string(),
              agencyNumber: yup.string(),
              agencyEmail: yup.string(),
            }),
      }),
      ...(stage === "Confirmation" && {
        referralSignature: yup.string().required(),
        marketingConsentStatus: yup.array(yup.string()),
        dataStorageConsent: yup.string().required(),
      }),
    });
  };

  const formSchema = yup.lazy(() => {
    return dynamicFormObject(steps[activeStep.step], "No");
  });

  const methods = useForm({ resolver: yupResolver(formSchema) });

  return (
    <div className={styles.container}>
      {methods.formState.isSubmitSuccessful && (
        <div className={styles.confirmationText}>
          <h1>
            <strong>Your referral was successfully sent</strong>
          </h1>
          <h2>
            We&apos;ll aim to be in touch within the next 48hours and look
            forward to supporting you.
          </h2>
          <Button href="/" variant="contained">
            Back to the homepage
          </Button>
        </div>
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
