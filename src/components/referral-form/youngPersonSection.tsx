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
    "First Name",
    "Last Name",
    "Email",
    "Contact Number",
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

  return (
    <div className={styles.container}>
      <h2>Details of young person</h2>
      <div className={styles.contactInfo}>
        {referralContactInfo.map((field, index) => (
          <InputComponent
            key={field}
            defaultValue=""
            name={field}
            rules={{ required: true }}
            helperText={`Please enter the young person's ${field.toLocaleLowerCase()}`}
          />
        ))}
        <DateInputComponent
          name="dateOfBirth"
          defaultValue=""
          helperText={`Please enter the young person's date of birth`}
        />

        <DropdownComponent name="gender" defaultValue="" props={genderList} />
      </div>

      <RadioInputComponent
        name="sendStatement"
        defaultValue=""
        radioDetails={radioList}
      />
      {sendStatementStatus === "Other" && (
        <>
          <p>If Other please explain:</p>
          <InputComponent
            defaultValue=""
            name="sendStatementAlternative"
            rules={{ required: true }}
          />
        </>
      )}
      <RadioInputComponent
        name="neetStatus"
        defaultValue=""
        radioDetails={isNeet}
      />

      <>
        {neetStatus === "Yes" && (
          <InputComponent
            defaultValue=""
            name="Reason for neet"
            rules={{ required: true }}
          />
        )}
      </>
    </div>
  );
};
export default YoungPersonSection;
