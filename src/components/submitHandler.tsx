"use server";

import { IReferralFormInput } from "@/types/formTypes";

export async function postReferralForm(data: IReferralFormInput) {
  try {
    let response = await fetch(`${process.env.APP_HOST}/api/testing`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (errorMessage: any) {
    console.log(errorMessage);
  }
}

export async function fetchProfile() {
  try {
    let response = await fetch(`${process.env.APP_HOST}/api/testing`, {
      next: { revalidate: 0 },
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (errorMessage: any) {
    console.log(errorMessage);
  }
}
