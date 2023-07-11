export type IReferralFormInput = {
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  address: IAddressForm;
  contactNumber: string;
  dateOfBirth: string;
  email: string;
  neetStatus: string;
  reasonForNEET: string;
  referrerFullName: string;
  referrerRelationshipType: string;
  reasonForReferral: string;
  referralSignature: string;
  sendStatement: string;
  sendStatementOther?: string;
};

export type IAddressForm = {
  houseNumber?: string;
  flatNumber?: string;
  street?: string;
  townOrCity?: string;
  county?: string;
  postCode?: string;
};
