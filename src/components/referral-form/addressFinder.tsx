"use client";

import React, { useState } from "react";
import {
  AddressDropdownComponent,
  InputComponent,
} from "../input";
import styles from "./addressFinder.module.scss";
import { Button } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { addressList } from "@/app/mockData/addressData";

const AddressFinder: React.FC = () => {
  const { watch } = useFormContext();

  const searchContent = watch("searchPostcode");

  const [manualAddressSelected, setManualAddressSelected] = useState(false);
  const autoAddressFields = [
    { key: "Enter Postcode", value: "searchPostcode" },
  ];

  const addressFields = [
    { key: "House Number", value: "youngPersonHouseNumber" },
    { key: "Flat Number", value: "youngPersonFlatNumber" },
    { key: "Street", value: "youngPersonStreet" },
    { key: "Town or City", value: "youngPersonTownOrCity" },
    { key: "County", value: "youngPersonCounty" },
  ];

  return (
    <div className={styles.container}>
      {autoAddressFields.map((field) => (
        <InputComponent
          key={field.value}
          defaultValue=""
          name={field.value}
          rules={{ required: true }}
          helperText={`Please enter an address`}
          displayName={field.key}
        />
      ))}

      <Button
        sx={{ alignSelf: "flex-start" }}
        onClick={() => setManualAddressSelected(!manualAddressSelected)}
      >
        {!manualAddressSelected
          ? "Enter address manually"
          : "Hide manual address form"}
      </Button>
      {!manualAddressSelected &&
        searchContent !== "" &&
        searchContent !== undefined && (
          <AddressDropdownComponent
            name="referrerAddress"
            defaultValue=""
            displayName={addressList.displayName}
            dropdownDetails={addressList}
          />
        )}
      {manualAddressSelected && (
        <div className={styles.contactInfo}>
          {addressFields.map((field, index) => (
            <InputComponent
              key={field.value}
              defaultValue=""
              name={field.value}
              rules={{ required: true }}
              helperText={`Please enter an address`}
              displayName={field.key}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default AddressFinder;
