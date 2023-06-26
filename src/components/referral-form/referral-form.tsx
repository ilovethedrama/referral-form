import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import Input from './input';
// import styles from './referral-form.module.scss';
// import Radio from './radio';
// import RadioSelection from './radio-selection';
// import { log } from 'console';
// import { format } from 'date-fns';
// import { Value } from 'react-calendar/dist/cjs/shared/types';

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

  const handleLeSubmit = async (data: IReferralFormInput) => {
    console.log(
      JSON.stringify({
        ...data,
      })
    );

    try {
      let response = await fetch("http://localhost:3000/api/postForm", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
    } catch (errorMessage: any) {
      console.log(errorMessage);
    }
  };

  const onSubmit: SubmitHandler<IReferralFormInput> = (data) => {
    handleLeSubmit(data);
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
