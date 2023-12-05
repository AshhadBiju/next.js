"use client";
import React from "react";
import axios from "axios";
import { baseURL } from "../../../../utils/constants";
//import { toast } from "react-toastify";
import UpdateAgent from "../../components/updateagentdetails";

export default async function EditAgents({ params }) {
  console.log(`idid=`);
  const { id } = params;
  console.log(`idid=${id}`);
  const agentData = await getAgentById(id);

  console.log(`agentData=${agentData}`);
  if (!agentData) {
    return null; // Render loading or error state while fetching data
  }

  return <UpdateAgent {...agentData} />;
}

const getAgentById = async (idn) => {
  try {
    console.log(`idid=${idn}`);
    const url = `${baseURL}users/getuser/${idn}`;
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

    const { id, name, password, username, email, phoneNumber } = agent; //
    console.log(`name=${id}`);

    return {
      id,
      name,
      password,
      username,
      email,
      phoneNumber,
    };
  } catch (error) {
    console.error("Error fetching agent data:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
