"use client";

import React from "react";
import {
  InputComponent,
  DateInputComponent,
  DropdownComponent,
  RadioInputComponent,
} from "../input";
import { IReferralFormInput } from "@/types/formTypes";
import { Control } from "react-hook-form/dist/types";
import styles from "./agencySection.module.scss";

interface Props {
  step: number;
  control: Control<IReferralFormInput, any>;
  multiAgencySupportStatus: string;
}
const AgencySection: React.FC<Props> = ({ step, control, multiAgencySupportStatus }) => {


  const hasMultiAgencySupport = {
    title: `Does the young person has any involvement with professional agencies (e.g. mentors,
        educational psychologists, young offending worker):`,
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  const agencyContactFields = [
    "agencyFirstName",
    "agencyLastName",
    "agencyRole",
    "agencyNumber",
    "agencyEmail",
  ];

  if (step != 3) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Multi-agency support</h2>

      <div className={styles.contactInfo}>
        <RadioInputComponent
          name="multiAgencySupportStatus"
          defaultValue=""
          control={control}
          props={hasMultiAgencySupport}
        />
        {multiAgencySupportStatus === "Yes" && (
          <>
            {agencyContactFields.map((field, index) => (
              <InputComponent
                key={field}
                defaultValue=""
                control={control}
                name={field}
                rules={{ required: true }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default AgencySection;
