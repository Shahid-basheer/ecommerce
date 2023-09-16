import axios from "axios";
import React from "react";
import UpdateOrder from "@/components/admin/updateOrder";
import AdminLayout from "../../layout";

export const getServerSideProps = async ({params}) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/${params?.id}`,
  );

  return {props:{data:data}};
};

const AdminOrderDetailsPage = ({ data }) => {
  return <AdminLayout><UpdateOrder order={data?.order} /></AdminLayout>;
};

export default AdminOrderDetailsPage;