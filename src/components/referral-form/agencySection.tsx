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
    "agencyFirstName",
    "agencyLastName",
    "agencyRole",
    "agencyNumber",
    "agencyEmail",
  ];

  return (
    <div className={styles.container}>
      <h2>Multi-agency support</h2>

      <div className={styles.contactInfo}>
        <RadioInputComponent
          name="multiAgencySupportStatus"
          key="multiAgencySupportStatus"
          defaultValue=""
          radioDetails={hasMultiAgencySupport}
          displayName={hasMultiAgencySupport.displayName}
        />
        {multiAgencySupportStatus === "Yes" && (
          <>
            {agencyContactFields.map((field, index) => (
              <InputComponent
                key={field}
                defaultValue=""
                name={field}
                helperText={"dynamic helper text"}
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
