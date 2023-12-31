import Link from "next/link";
import React, { useEffect } from "react";
import CustomPagination from "../layouts/pagination";
import { useOrderStateValue } from "@/context/orderContext";
import { toast } from "react-toastify";

const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useOrderStateValue();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);
  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} Orders
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order,key) => (
            <tr key={key} className="bg-white">
              <td className="px-6 py-2">{order?._id}</td>
              <td className="px-6 py-2">&#8377;{order?.paymentInfo?.amountPaid}</td>
              <td className="px-6 py-2">{order?.orderStatus}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a onClick={()=>deleteHandler(order?._id)} className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-6">
        <CustomPagination
          resPerPage={orders?.resPerPage}
          filteredProductsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;