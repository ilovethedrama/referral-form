"use client";

import React from "react";
import { InputComponent, RadioInputComponent } from "../input";
import styles from "./referrerSection.module.scss";
import AddressFinder from "./addressFinder";

const ReferrerSection: React.FC = () => {
  const referrerContactInfo = [
    { key: "Referrer First Name", value: "referrerFirstName" },
    { key: "Referrer Last Name", value: "referrerLastName" },
    { key: "Referrer Email", value: "referrerEmail" },
    { key: "Referrer Contact Number", value: "referrerContactNumber" },
    { key: "Referrer Agency", value: "referrerAgency" },
  ];

  const referrerRelationshipType = {
    title: "Relationship to the young person:",
    displayName: "Referrer relationship type",
    options: [
      { name: "Parent/Care Giver", value: "legalGuardian" },
      { name: "Professional", value: "professional" },
    ],
  };

  return (
    <div className={styles.container}>
      <h2>Details of person/professional making the referral</h2>
      <AddressFinder />

      <div className={styles.contactInfo}>
        {referrerContactInfo.map((field) => (
          <InputComponent
            key={field.value}
            defaultValue=""
            name={field.value}
            helperText={`Please enter a ${field.key.toLocaleLowerCase()}`}
            rules={{ required: true }}
            displayName={field.key}
          />
        ))}
      </div>
      <RadioInputComponent
        name="referrerRelationshipType"
        radioDetails={referrerRelationshipType}
        key={"referrerRelationshipType"}
        defaultValue=""
        displayName={referrerRelationshipType.displayName}
      />
    </div>
  );
};
export default ReferrerSection;
