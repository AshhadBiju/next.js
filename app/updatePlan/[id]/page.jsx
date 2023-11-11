import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdatePlan from "@/app/components/updateplan";

export default async function EditArea({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const planData = await getPlanbyID(id);
  console.log(`planData=${planData}`);
  if (!planData) {
    return null; // Render loading or error state while fetching data
  }

  return <UpdatePlan {...planData} />;
}
const getPlanbyID = async (idn) => {
  try {
    console.log(`idid=${idn}`);
    const url = `http://localhost:3001/api/plans/get/${idn}`;
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch plan");
    }

    const plan = res.data;

    if (!plan) {
      console.error("plan data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const {  id,
      planName,
      price,
      userID,
      imageURL, 
    } = plan;
    console.log(`name=${id}`);

    return {
      id,
      planName,
      price,
      userID,
      imageURL,
    };
  } catch (error) {
    console.error("Error fetching plan:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
