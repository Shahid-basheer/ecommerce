import axios from "axios";
import React from "react";
import queryString from "query-string";
import Orders from "@/components/admin/orders";
import AdminLayout from "../layout";

export const getServerSideProps = async ({query}) => {
  const urlParams = {
    page:query?.page || 1,
  };
  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders?${searchQuery}`
  );

  return {props:{data:data}};
};

const AdminOrdersPage = ({ data }) => {
  return <AdminLayout><Orders orders={data} /></AdminLayout>;
};

export default AdminOrdersPage;