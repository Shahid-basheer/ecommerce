import React, {useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStateValue } from "@/context/cartContext";
import queryString from "query-string";
import axios from "axios";
import CustomPagination from "../layouts/pagination";
import OrderItem from "./orderItem";

const ListOrders = () => {
  const { clearCart } = useCartStateValue();
  const params = useSearchParams();
  const router = useRouter();
  const [orders,setOrders] = useState(null)
  const user = typeof window !=="undefined"? JSON.parse(localStorage.getItem("user")):null
  const orderSuccess = params.get("order_success");
  
  useEffect(() => {
    if (orderSuccess) {
      clearCart();
      router.replace("/me/orders");
    }
  }, [orderSuccess]);

  useEffect(()=>{
  getOrders()
  },[params.get("page"),user?._id])
  
  const getOrders = async ()=>{
    const urlParams = {
          page:params.get('page')??1,
        };
      
        const searchQuery = queryString.stringify(urlParams);
      
        const { data } = await axios.get(
          `${process.env.API_URL}/api/orders/me?${searchQuery}&userId=${user._id}`
        );
        setOrders(data)
  }
  return (
    <>
      {orders?.orders?.length === undefined? <h3>Loading...</h3>:orders?.orders?.length === 0?<h3>No orders</h3>:(<>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
        {orders?.orders?.map((order,key) => (
          <OrderItem key={key} order={order} />
        ))}
  
        <CustomPagination
          resPerPage={orders?.resPerPage}
          filteredProductsCount={orders?.ordersCount??0}
        />
      </>)
      }
    </>
  );
};

export default ListOrders;