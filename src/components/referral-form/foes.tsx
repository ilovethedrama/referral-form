import React from "react";
import { useFormContext } from "react-hook-form";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { IReferralFormInput } from "@/types/formTypes";
import ReferrerSection from "./referrerSection";
import AgencySection from "./agencySection";
import YoungPersonSection from "./youngPersonSection";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./foes.module.scss";
import ctx from "../../app/ReferralFormContext";

const steps = ["Referrer Information", "Young Person Details", "Agency"]; // Replace these with your step labels

interface Props {
  handleSubmit: any;
}

const FormStepperIo = (props: Props) => {
  const {
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { radioIsValid, setRadioIsValid } = React.useContext(ctx);

  const multiAgencySupportStatus = watch("multiAgencySupportStatus");
  const sendStatementStatus = watch("sendStatement");
  const neetStatus = watch("neetStatus");

  const formValues = getValues();

  const queryClient = useQueryClient();

  queryClient.setQueryData(["pizzaLord"], () => {
    return { ...formValues };
  });

  const data: any = queryClient.getQueryData(["pizzaLord"]);
  const onSubmit = async (data: IReferralFormInput) => {
    // const onSubmit: SubmitHandler<IReferralFormInput> = async (data) => {
    // postReferralForm(data);
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
      default:
        return (
          <div>
            <p>Summary</p>
            {getStuff().map((item) => {
              return <p key={item}>{item}</p>;
            })}
          </div>
        );
    }
  };

  const [activeStep, setActiveStep] = React.useState({
    step: 0,
    isValid: false,
  });

  const isObjectEmpty = (objectName: any) => {
    return JSON.stringify(objectName) === "{}";
  };

  const handleNext = async () => {
    //pass in an array of keys for each section to run trigger fn. on
    const isStepFilledWithLegitValues = await trigger();
    setRadioIsValid(!radioIsValid);
    console.log(errors);
    if (isObjectEmpty(errors) && isStepFilledWithLegitValues) {
      const newActiveStep = activeStep.step + 1;
      setActiveStep({ step: newActiveStep, isValid: true });
      return;
    }
  };

  const handleBack = async () => {
    const newActiveStep = activeStep.step - 1;
    setActiveStep({ step: newActiveStep, isValid: true });
  };

  const isLastStep = activeStep.step === steps.length - 1;
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

          <Button onClick={handleNext} sx={{ mr: 1 }}>
            {isLastStep ? "Submit" : "Next"}{" "}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormStepperIo;
