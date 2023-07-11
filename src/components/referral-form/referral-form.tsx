import { postReferralForm } from "@/components/submitHandler";
import { IReferralFormInput } from "@/types/formTypes";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddressForm from "../address-form/address-form";

export default function ReferralForm() {
  const { register, handleSubmit, watch } = useForm<IReferralFormInput>();
  const sendStatementStatus = watch('sendStatement');
  const neetStatus = watch('neetStatus');
  const onSubmit: SubmitHandler<IReferralFormInput> = (data) => {
    postReferralForm(data);
  };

  return (
    <div>
      <h1>KEE Youth UK Referral Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Details of young person</h2>
          <label>First Name</label>
          <input {...register("firstName")} />
          <label>Last Name</label>
          <input {...register("lastName")} />
          <label>Email</label>
          <input {...register("email")} />
          <label>Contact Number</label>
          <input {...register("contactNumber")} />
          <label>Does the person have a SEND statement:</label>
          <label htmlFor="send-statement-yes">
            <input
              {...register("sendStatement")}
              type="radio"
              value="yes"
              id="send-statement-yes"
            />
            Yes
          </label>
          <label htmlFor="send-statement-no">
            <input
              {...register("sendStatement")}
              type="radio"
              value="no"
              id="send-statement-no"
            />
            No
          </label>
          <label htmlFor="send-statement-other">
            <input
              {...register("sendStatement")}
              type="radio"
              value="other"
              id="send-statement-other"
            />
            Other
          </label>
          {sendStatementStatus === 'other' && (
            <>
              <label>Does the person have alternative assessments:</label>
              <input {...register("sendStatementOther")} />
            </>
          )}
          

          <label>Is the young person NEET (Not in Employment, Education or Training):</label>
          <label htmlFor="neet-status-no">
            <input
              {...register("neetStatus")}
              type="radio"
              value="no"
              id="neet-status-no"
            />
            No
          </label>
          <label htmlFor="neet-status-yes">
            <input
              {...register("neetStatus")}
              type="radio"
              value="yes"
              id="neet-status-yes"
            />
            Yes
          </label> 
          {
            neetStatus === "yes" && (
              <>
              <AddressForm />
              <label>Reason for NEET</label>
              <input {...register("referrerRelationshipType")} />
              </>
            )
          }

          <label>
            Gender:
            <select {...register("gender")}>
              <option value="">Select a gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="declineToState">Decline to state</option>
              <option value="other">Prefer to self describe</option>
            </select>
          </label>
        </div>
        <div>
          <h2>Details of person/professional making the referral</h2>
          <label>Referrer&apos;s Full Name</label>
          <input {...register("referrerFullName")} />
          <label>Relationship to youth</label>
          <input {...register("referrerRelationshipType")} />
        </div>
        <AddressForm />
        <div>
        <label htmlFor="referral-signature">
            <input
              {...register("referralSignature")}
              type="text"
              value="referralSignature"
              id="referralSignature"
            />
            No
          </label>
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
