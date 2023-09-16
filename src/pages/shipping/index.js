import axios from "axios";
import React, { useEffect, useState } from "react";
import Shipping from "@/components/cart/shipping";
let user;

const ShippingPage = () => {
  const [data,setData] = useState(null)
  if (typeof window !== 'undefined') user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
      getAddress()
  }, [user?._id])
  
  
  const getAddress = async () => {
      const { data } = await axios.get(`${process.env.API_URL}/api/address/${user?._id}`)
      setData(data)
  }
  return <Shipping  addresses={data?.address} />;
};

export default ShippingPage;