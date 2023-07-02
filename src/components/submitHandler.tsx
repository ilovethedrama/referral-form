'use server'

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
  
   export async function handleLeSubmit (formData: IReferralFormInput) {
    try {
      let response = await fetch("/api/testing", {
        method: "POST",
        body: JSON.stringify(formData),
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