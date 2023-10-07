"use client";

import React from "react";
import { InputComponent, RadioInputComponent } from "../input";

import styles from "./agencySection.module.scss";

interface Props {
  multiAgencySupportStatus: string;
}
const AgencySection: React.FC<Props> = ({ multiAgencySupportStatus }) => {
  const hasMultiAgencySupport = {
    title: `Does the young person has any involvement with professional agencies (e.g. mentors,
        educational psychologists, young offending worker):`,
    displayName: "Agency support status",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  const agencyContactFields = [
    { key: "Agency First Name", value: "agencyFirstName" },
    { key: "Agency Last Name", value: "agencyLastName" },
    { key: "Agency Email", value: "agencyEmail" },
                         { key: "Agency Contact Number", value: "agencyNumber" },
    { key: "Agency Position", value: "agencyRole" },
  ];

  return (
    <div className={styles.container}>
      <h2>Multi-agency support</h2>

      <RadioInputComponent
        name="multiAgencySupportStatus"
        key="multiAgencySupportStatus"
        defaultValue=""
        radioDetails={hasMultiAgencySupport}
        displayName={hasMultiAgencySupport.displayName}
      />
      {multiAgencySupportStatus === "Yes" && (
          <div className={styles.contactInfo}>
            {agencyContactFields.map((field, index) => (
              <InputComponent
                key={field.value}
                defaultValue=""
                name={field.value}
                helperText={"dynamic helper text"}
                rules={{ required: true }}
                displayName={field.key}
              />
            ))}
          </div>
      )}
    </div>
  );
};
export default AgencySection;
