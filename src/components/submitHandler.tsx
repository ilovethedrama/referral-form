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
  
   export async function handleLeSubmit (data: IReferralFormInput) {
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
  };