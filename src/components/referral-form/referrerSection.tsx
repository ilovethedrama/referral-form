"use client";

import React from "react";
import { InputComponent, RadioInputComponent } from "../input";
import styles from "./referrerSection.module.scss";

const ReferrerSection: React.FC = () => {
  const referrerContactInfo = [
    "Referrer First Name",
    "Referrer Last Name",
    "Referrer Email",
    "Referrer Contact Number",
    "Referrer Agency",
  ];

  const referrerRelationshipType = {
    title: "Relationship to the young person:",
    options: [
      { name: "Parent/Care Giver", value: "legalGuardian" },
      { name: "Professional", value: "professional" },
    ],
  };

  return (
    <div className={styles.container}>
      <h2>Details of person/professional making the referral</h2>
      <div className={styles.contactInfo}>
        {referrerContactInfo.map((field) => (
          <InputComponent
            key={field}
            defaultValue=""
            name={field}
            helperText={`Please enter a ${field.toLocaleLowerCase()}`}
            rules={{ required: true }}
          />
        ))}
      </div>
      <RadioInputComponent
        name="referrerRelationshipType"
        radioDetails={referrerRelationshipType}
      />
    </div>
  );
};
export default ReferrerSection;
