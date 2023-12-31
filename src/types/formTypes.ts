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
  sendStatementAlternative?: string;
  multiAgencySupportStatus: string;
};

export type IAddressForm = {
  houseNumber?: string;
  flatNumber?: string;
  street?: string;
  townOrCity?: string;
  county?: string;
  postCode?: string;
};

export type IActiveStep = {
  step: number;
  isValid: boolean;
};

export type DropDownProps = {
  name: string;
  defaultValue: string;
  displayName: string;
  dropdownDetails: DropDownLabel[];
};

export type DropDownLabel = {
  label: string;
  value: string;
};
