"use client";

import React from "react";
import {
  CheckboxComponent,
  FormSignaturePad,
  RadioInputComponent,
} from "../input";

import styles from "./ConfirmationSection.module.scss";

const ConfirmationSection: React.FC = () => {
  const hasAgreedToDataStorage = {
    title: `I agree for my data to be stored and passed on if deemed necessary.`,
    displayName: "Data storage confirmation",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  const marketingOptions = {
    title: `I agree to be contacted by:`,
    displayName: "Marketing preferences",
    options: [
      { name: "Email", value: "email" },
      { name: "SMS", value: "sms" },
      { name: "Phone", value: "phone" },
      { name: "Post", value: "post" },
    ],
  };

  const signatureConfig = {
    title: `Signature:`,
    displayName: "Referral Signature",
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Confirmation</h2>

        <CheckboxComponent
          name="marketingConsentStatus"
          key="marketingConsentStatus"
          checkboxDetails={marketingOptions}
          displayName={marketingOptions.displayName}
        />
        <FormSignaturePad
          name="referralSignature"
          key="referralSignature"
          displayName={signatureConfig.displayName}
          signatureConfig={signatureConfig}
        />
        <RadioInputComponent
          name="dataStorageConsent"
          key="dataStorageConsentStatus"
          radioDetails={hasAgreedToDataStorage}
          displayName={hasAgreedToDataStorage.displayName}
        />
      </div>
    </>
  );
};
export default ConfirmationSection;
