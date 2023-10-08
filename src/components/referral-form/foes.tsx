import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { IReferralFormInput } from "@/types/formTypes";
import ReferrerSection from "./referrerSection";
import AgencySection from "./agencySection";
import YoungPersonSection from "./youngPersonSection";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./foes.module.scss";
import ctx from "../../app/ReferralFormContext";
import { postReferralForm } from "../submitHandler";
import SummarySection from "./summarySection";
import { FormSignaturePad } from "../input";
import ConfirmationSection from "./confirmationSection";
import AddressFinder from "./addressFinder";

interface Props {
  handleSubmit: any;
}

const FormStepperIo = (props: Props) => {
  const {
    watch,
    getValues,
    trigger,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useFormContext();
  const { activeStep, setActiveStep, steps } = React.useContext(ctx);

  const multiAgencySupportStatus = watch("multiAgencySupportStatus");
  const sendStatementStatus = watch("sendStatement");
  const neetStatus = watch("neetStatus");

  const formValues = getValues();

  const queryClient = useQueryClient();
  const isLastStep = activeStep.step === 4;

  const isObjectEmpty = (objectName: any) => {
    return JSON.stringify(objectName) === "{}";
  };

  const filterEmptyValues = Object.keys(formValues)
    .filter((k) => formValues[k] != null || "")
    .reduce((a, k) => ({ ...a, [k]: formValues[k] }), {});
  queryClient.setQueryData(["pizzaLord"], () => {
    return { ...filterEmptyValues };
  });

  const data: any = queryClient.getQueryData(["pizzaLord"]);
  const onSubmit: SubmitHandler<IReferralFormInput> = async (data) => {
    if (isObjectEmpty(data)) {
      return;
    }
    // postReferralForm(data);
    const newActiveStep = 0;
    setActiveStep({ step: newActiveStep, isValid: true });
    const isStepLegit = await trigger();
    if (isStepLegit && isLastStep) {
      const newActiveStep = activeStep.step + 1;
      setActiveStep({ step: newActiveStep, isValid: true });
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ReferrerSection />;
      case 1:
        return (
          <YoungPersonSection
            neetStatus={neetStatus}
            sendStatementStatus={sendStatementStatus}
          />
        );
      case 2:
        return (
          <AgencySection multiAgencySupportStatus={multiAgencySupportStatus} />
        );
      case 3:
        return <ConfirmationSection />;
      default:
        return <SummarySection />;
    }
  };

  const Stage1 = [
    "referrerFirstName",
    "referrerLastName",
    "referrerEmail",
    "referrerContactNumber",
    "referrerAgency",
    "referrerRelationshipType",
    "referrerAddress",
    "searchPostcode",
  ];

  const Stage2 = [
    "referralGender",
    "referralFirstName",
    "referralLastName",
    "referralEmail",
    "referralContactNumber",
    "referralDateOfBirth",
    "sendStatement",
    "neetStatus",
  ];

  const Stage3 = [
    "multiAgencySupportStatus",
    "agencyFirstName",
    "agencyLastName",
    "agencyRole",
    "agencyNumber",
    "agencyEmail",
  ];

  const Stage4 = [
    "referralSignature",
    "marketingConsentStatus",
    "dataStorageConsent",
  ];

  const stagesAll = [Stage1, Stage2, Stage3, Stage4];

  const handleNext = async () => {
    const isStepFilledWithLegitValues = await trigger(
      stagesAll[activeStep.step],
    );
    if (isObjectEmpty(errors) && isStepFilledWithLegitValues) {
      const newActiveStep =
        activeStep.step < 4 ? activeStep.step + 1 : activeStep.step;
      setActiveStep({ step: newActiveStep, isValid: true });
    }
  };

  const handleBack = async () => {
    const newActiveStep = activeStep.step - 1;
    setActiveStep({ step: newActiveStep, isValid: true });

    const isStepFilledWithLegitValues = await trigger(
      stagesAll[activeStep.step - 1],
    );
  };

  return (
    <form
      onSubmit={props.handleSubmit(onSubmit)}
      className={styles.form_container}
    >
      <Stepper activeStep={activeStep.step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep.step)}
      <div className={styles.button_containerhoe}>
        <Button
          color="inherit"
          disabled={activeStep.step === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>

        {activeStep.step < 3 && (
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
        )}
        {activeStep.step === 3 && isObjectEmpty(errors) && (
          <Button type="submit" sx={{ mr: 1 }}>
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormStepperIo;
