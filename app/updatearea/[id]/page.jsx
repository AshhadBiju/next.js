"use client";
import React from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { toast } from "react-toastify";
import UpdateArea from "../../components/updatearea";

export default async function EditArea({ params }) {
  const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    console.log(`idid=${idn}`);
    const url = `${baseURL}area/get/${idn}`;
    const res = await axios.get(url, {
      headers: {
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch area");
    }

    const area = res.data;

    if (!area) {
      console.error("area data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const { id, city, state, district, pincode, userID } = area;
    console.log(`name=${id}`);

    return {
      id,
      city,
      state,
      district,
      pincode,
      userID,
    };
  } catch (error) {
    console.error("Error fetching area:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
