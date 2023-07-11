import { postAddresssForm } from "@/components/submitHandler";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type IAddressForm = {
  houseNumber?: string;
  flatNumber?: string;
  street?: string;
  townOrCity?: string;
  county?: string;
  postCode?: string;
};

export default function AddressForm() {
  const { register, handleSubmit, watch } = useForm<IAddressForm>();
  const watchFlatNumber = watch("flatNumber");


  return (
    <div>
      <h1>Address</h1>
      <div>
        <div>
          <label>House Number</label>
          <input {...register("houseNumber")} />
          <label>Flat Number</label>
          <input {...register("flatNumber")} />
          {watchFlatNumber !== "" && (
            <div>
              <label>Building Number</label>
              <input {...register("flatNumber")} />
            </div>
          )}
          <label>Street</label>
          <input {...register("street")} />
          <label>Town/City</label>
          <input {...register("townOrCity")} />
          <label>County</label>
          <input {...register("county")} />
          <label>Postcode</label>
          <input {...register("postCode")} />
        </div>
      </div>
    </div>
  );
}
