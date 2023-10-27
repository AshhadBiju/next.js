import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateArea from "@/app/components/updatearea";

export default async function EditArea({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const areaData = await getAreaById(id);
  console.log(`areaData=${areaData}`);
  if (!areaData) {
    return null; // Render loading or error state while fetching data
  }

  return <UpdateArea {...areaData} />;
}
const getAreaById = async (idn) => {
  try {
    console.log(`idid=${idn}`);
    const url = `http://localhost:3001/api/users/getuser/${idn}`;
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch Agent");
    }

    const agent = res.data;

    if (!agent) {
      console.error("Agent data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const { id, city, state, district, pincode, } = agent;
    console.log(`name=${id}`);

    return {
        id,
        city,
        state,
        district,
        pincode,
    };
  } catch (error) {
    console.error("Error fetching area:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
