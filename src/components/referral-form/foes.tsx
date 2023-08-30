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
    postReferralForm(data);
    const newActiveStep = 0;
    setActiveStep({ step: newActiveStep, isValid: true });
    const isStepLegit = await trigger();
    if (isStepLegit && isLastStep) {
      const newActiveStep = activeStep.step + 1;
      setActiveStep({ step: newActiveStep, isValid: true });
    }
  };

  const getStuff = () => {
    const foney = Object.entries(data);
    const outPut = foney.map((item) => {
      return `${item[0]}: ${item[1]}`;
    });
    return outPut;
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
        return <SummarySection />;
      default:
        return <SummarySection />;
    }
  };

  const handleNext = async () => {
    const isStepFilledWithLegitValues = await trigger();
    if (isObjectEmpty(errors) && isStepFilledWithLegitValues) {
      const newActiveStep =
        activeStep.step < 4 ? activeStep.step + 1 : activeStep.step;
      setActiveStep({ step: newActiveStep, isValid: true });
      return;
    }
  };

  const handleBack = async () => {
    const newActiveStep = activeStep.step - 1;
    setActiveStep({ step: newActiveStep, isValid: true });
    const isStepFilledWithLegitValues = await trigger();
    if (isObjectEmpty(errors) && isStepFilledWithLegitValues) {
      console.log("teeeeeee");
    }
  };

  const isLastStep = activeStep.step === 4;

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Stepper activeStep={activeStep.step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={styles.container}>
        <div>
          <div>{getStepContent(activeStep.step)}</div>
          <Button
            color="inherit"
            disabled={activeStep.step === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            sx={{ mr: 1 }}
            disabled={activeStep.step > 4}
          >
            Next
          </Button>
          <Button
            type="submit"
            sx={{ mr: 1 }}
            disabled={activeStep.step < 3}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormStepperIo;
