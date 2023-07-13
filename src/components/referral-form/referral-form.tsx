import { postReferralForm } from "@/components/submitHandler";
import { IReferralFormInput } from "@/types/formTypes";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  DateInputComponent,
  DropdownComponent,
  InputComponent,
  RadioInputComponent,
} from "../input";
import Link from "next/link";

export default function ReferralForm() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitted, isSubmitSuccessful },
  } = useForm<IReferralFormInput>();
  const multiAgencySupportStatus = watch("multiAgencySupportStatus");
  const onSubmit: SubmitHandler<IReferralFormInput> = (data) => {
    postReferralForm(data);
  };
  const formFields = [
    "first Name",
    "lastName",
    "email",
    "contactNumber",
    "referrerFirstName",
    "referrerLastName",
    "referrerRelationshipType",
  ];

  const agencyContactFields = [
    "agencyFirstName",
    "agencyLastName",
    "agencyRole",
    "agencyNumber",
    "agencyEmail",
  ];

  const addressFields = [
    "houseNumber",
    "flatNumber",
    "street",
    "townOrCity",
    "county",
    "postCode",
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

  const hasMultiAgencySupport = {
    title: `Does the young person has any involvement with professional agencies (e.g. mentors,
        educational psychologists, young offending worker):`,
    options: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  };

  const genderList = {
    options: [
      { value: "female" },
      { value: "male" },
      { value: "non-binary" },
      { value: "declineToState" },
      { value: "other" },
    ],
  };

  return (
    <div>
      {isSubmitSuccessful && (
        <>
          <h1>
            Your referral was successfully sent, we&apos;ll aim to be in touch
            within the next 48hours and look forward to supporting you.
          </h1>
          <Link href={"/"}>Back to the homepage</Link>
        </>
      )}
      {!isSubmitted && (
        <>
          <h1>KEE Youth UK Referral Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Details of young person</h2>
            {formFields.map((field, index) => (
              <InputComponent
                key={`${field}_${control}`}
                defaultValue=""
                control={control}
                name={field}
                rules={{ required: true }}
              />
            ))}

            <RadioInputComponent
              name="sendStatement"
              defaultValue=""
              control={control}
              props={radioList}
            />

            <RadioInputComponent
              name="neetStatus"
              defaultValue=""
              control={control}
              props={isNeet}
            />

            {addressFields.map((field, index) => (
              <InputComponent
                key={`${field}_${control}`}
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
            <div>
              <h2>Details of person/professional making the referral</h2>
            </div>
            <div>
              <h2>Multi-agency support</h2>

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
                      key={`${field}_${control}`}
                      defaultValue=""
                      control={control}
                      name={field}
                      rules={{ required: true }}
                    />
                  ))}
                </>
              )}
            </div>
            <input type="submit" value="submit" />
          </form>
        </>
      )}
    </div>
  );
}
