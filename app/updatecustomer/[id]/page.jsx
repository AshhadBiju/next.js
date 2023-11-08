import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateCustomerForm from "../../components/updateCustomer";

export default async function EditCustomer({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const customerData = await getCustomerById(id);
  console.log(`customerData=${customerData}`);
  if (!customerData) {
    return null; // Render loading or error state while fetching data
  }

  return <UpdateCustomerForm {...customerData} />;
}

const getCustomerById = async (idn) => {
  try {
    console.log(`idid=${idn}`);
    const res = await axios.get(`http://localhost:3001/api/customer/get/${idn}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch customer");
    }

    const customer = res.data;

    if (!customer) {
      console.error("customer data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
      return null; // Return null or an empty object when there's an error
    }

    const { id, name, mobileNumber, registerNumber, address, userID, areaID, planID } = customer;
    console.log(`name=${name}`);

    return {
      id,
      name,
      mobileNumber,
      registerNumber,
      address,
      userID,
      areaID,
      planID,
    };
  } catch (error) {
    console.error("Error fetching Customer:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null; // Return null or an empty object when there's an error
  }
};
