import React from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { toast } from "react-toastify";
import UpdateCollectionForm from '@/app/components/updateCollection'

export default async function EditCollection({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const collectionData = await getCollectionById(id);
  console.log(`collectionData=${collectionData}`);
  if (!collectionData) {
    return null; // Render loading or error state while fetching data
  }

  return <UpdateCollectionForm {...collectionData} />;
}
const getCollectionById = async (idn) => {
  try {
    console.log(`idid=${idn}`);
    const url = `${baseURL}collection/get/${idn}`;
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch Collection");
    }

    const collection = res.data;
   
    console.log(collection);
   

    if (!collection) {
      console.error("Collection data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const {id,amount,description,date,customerID,userID} = collection;
    console.log(`name=${id}`);

    return {
        id,
        amount,
        description,
        date,
        customerID,
        userID,  
    };
  } catch (error) {
    console.error("Error fetching Collection:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};
