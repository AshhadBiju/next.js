import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateAgent from "@/app/components/updateagentdetails";

export default async function EditAgents({ params }) {
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

    const { id, name, password, username, email, phonenumber } = agent;
    console.log(`name=${id}`);

    return {
      id,
      name,
      password,
      username,
      email,
      phonenumber,
    };
  } catch (error) {
    console.error("Error fetching agent data:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
