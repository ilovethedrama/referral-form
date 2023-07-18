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
import styles from "./referrerSection.module.scss";

interface Props {
  step: number;
  control: Control<IReferralFormInput, any>;
}
const ReferrerSection: React.FC<Props> = ({ step, control }) => {
  const referrerContactInfo = [
    "referrerFirstName",
    "referrerLastName",
    "referrerEmail",
    "referrerContactNumber",
    "referrerAgency",
  ];

  const referrerRelationshipType = {
    title: "Relationship to the young person:",
    options: [
      { name: "Parent/Care Giver", value: "legalGuardian" },
      { name: "Professional", value: "professional" },
    ],
  };

  if (step != 2) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Details of person/professional making the referral</h2>
      <div className={styles.contactInfo}>
        {referrerContactInfo.map((field) => (
          <InputComponent
            key={field}
            defaultValue=""
            control={control}
            name={field}
            rules={{ required: true }}
          />
        ))}
      </div>
      <RadioInputComponent
        name="referrerRelationshipType"
        defaultValue=""
        control={control}
        props={referrerRelationshipType}
      />
    </div>
  );
};
export default ReferrerSection;
