"use client";

import React from "react";
import {
  InputComponent,
  DateInputComponent,
  DropdownComponent,
  RadioInputComponent,
} from "../input";
import styles from "./youngPersonSection.module.scss";

interface Props {
  sendStatementStatus: string;
  neetStatus: string;
}
const YoungPersonSection: React.FC<Props> = ({
  sendStatementStatus,
  neetStatus,
}) => {
  const referralContactInfo = [
    { key: "First Name", value: "referralFirstName" },
    { key: "Last Name", value: "referralLastName" },
    { key: "Email", value: "referralEmail" },
    { key: "Contact Number", value: "referralContactNumber" },
  ];
  const genderList = {
    displayName: "Gender",
    options: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
      { label: "Non-binary", value: "non-binary" },
      { label: "Decline to State", value: "declineToState" },
      { label: "Other", value: "other" },
    ],
  };
  const radioList = {
    title: "Does the person have a SEND statement:",
    displayName: "SEND statement status",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
      { name: "Other", value: "other" },
    ],
  };
  const isNeet = {
    title:
      "Is the young person NEET (Not in Employment, Education or Training):",
    displayName: "NEET status",
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  return (
    <div className={styles.container}>
      <h2>Details of young person</h2>
      <div className={styles.contactInfo}>
        {referralContactInfo.map((field, index) => (
          <InputComponent
            key={field.value}
            defaultValue=""
            name={field.value}
            rules={{ required: true }}
            helperText={`Please enter the young person's ${field.key.toLocaleLowerCase()}`}
            displayName={field.key}
          />
        ))}
        <DateInputComponent
          name="referralDateOfBirth"
          defaultValue=""
          key={"dateOfBirth"}
          helperText={`Please enter the young person's date of birth`}
          displayName={"Date of Birth"}
        />
        <DropdownComponent
          name="referralGender"
          defaultValue=""
          displayName={genderList.displayName}
          dropdownDetails={genderList}
        />
      </div>
      <RadioInputComponent
        name="sendStatement"
        defaultValue=""
        radioDetails={radioList}
        key={"sendStatement"}
        displayName={radioList.displayName}
      />
      {sendStatementStatus === "Other" && (
        <>
          <p>If Other please explain:</p>
          <InputComponent
            defaultValue=""
            name="sendStatementAlternative"
            rules={{ required: true }}
            helperText={`Please enter the young person's`}
            displayName={""}
          />
        </>
      )}
      <RadioInputComponent
        name="neetStatus"
        defaultValue=""
        radioDetails={isNeet}
        key={"neetStatus"}
        displayName={isNeet.displayName}
      />

      <>
        {neetStatus === "No" && (
          <>
            <p>Please add details of institution/training program:</p>
            <InputComponent
              defaultValue=""
              name="reasonForNEET"
              helperText={`Please enter the young person's `}
              displayName={"Reason for NEET"}
            />
          </>
        )}
      </>
    </div>
  );
};
export default YoungPersonSection;
