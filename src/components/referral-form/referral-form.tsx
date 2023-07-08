
import { postReferralForm } from "@/components/submitHandler";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type IReferralFormInput = {
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  address: string;
  contactNumber: string;
  dateOfBirth: string;
  email: string;
  reasonForNEET: string;
  referrerFullName: string;
  referrerRelationshipType: string;
  reasonForReferral: string;
};

export default function ReferralForm() {

  const { register, handleSubmit } = useForm<IReferralFormInput>();

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
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
