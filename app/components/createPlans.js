'use client'
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const CreatePlans= () => {
    const [formData, setFormData] = useState ({
        planName: "",
        price: "",
        userID: "",
        imageURL: "",
    })






    
}