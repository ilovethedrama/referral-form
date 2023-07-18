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
import styles from "./youngPersonSection.module.scss";

interface Props {
  step: number;
  control: Control<IReferralFormInput, any>;
  sendStatementStatus: string;
  neetStatus: string;
}
const YoungPersonSection: React.FC<Props> = ({
  step,
  control,
  sendStatementStatus,
  neetStatus,
}) => {
  const referralContactInfo = [
    "first Name",
    "lastName",
    "email",
    "contactNumber",
  ];
  const genderList = {
    options: [
      { value: "female" },
      { value: "male" },
      { value: "non-binary" },
      { value: "declineToState" },
      { value: "other" },
    ],
  };
  const addressFields = (type: string) => [
    `${type}_houseNumber`,
    `${type}_flatNumber`,
    `${type}_street`,
    `${type}_townOrCity`,
    `${type}_county`,
    `${type}_postCode`,
  ];
  const radioList = {
    title: "Does the person have a SEND statement:",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
      { name: "Other", value: "other" },
    ],
  };
  const isNeet = {
    title:
      "Is the young person NEET (Not in Employment, Education or Training):",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  if (step != 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Details of young person</h2>
      <div className={styles.contactInfo}>
        {referralContactInfo.map((field, index) => (
          <InputComponent
            key={field}
            defaultValue=""
            control={control}
            name={field}
            rules={{ required: true }}
          />
        ))}
        <DateInputComponent
          name="dateOfBirth"
          defaultValue=""
          control={control}
        />

        <DropdownComponent
          name="gender"
          defaultValue=""
          control={control}
          props={genderList}
        />
      </div>
      <p>Address:</p>
      <div className={styles.address}>
        {addressFields("referral").map((field: string, index: number) => (
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
        name="sendStatement"
        defaultValue=""
        control={control}
        props={radioList}
      />
      {sendStatementStatus === "Other" && (
        <>
          <p>If Other please explain:</p>
          <InputComponent
            defaultValue=""
            control={control}
            name="sendStatementAlternative"
            rules={{ required: true }}
          />
        </>
      )}
      <RadioInputComponent
        name="neetStatus"
        defaultValue=""
        control={control}
        props={isNeet}
      />

      <>
        <p>
          {neetStatus === "Yes" ? "Most recent" : "Current"} school/college
          attended:
        </p>
        <div className={styles.address}>
          {addressFields("neet").map((field, index) => (
            <InputComponent
              key={field}
              defaultValue=""
              control={control}
              name={field}
              rules={{ required: true }}
            />
          ))}
        </div>
        {neetStatus === "Yes" && (
          <InputComponent
            defaultValue=""
            control={control}
            name="Reason for neet"
            rules={{ required: true }}
          />
        )}
      </>
    </div>
  );
};
export default YoungPersonSection;
