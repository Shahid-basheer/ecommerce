import axios from "axios";
import React from "react";
import UpdateUser from "@/components/admin/updateUsers";
import AdminLayout from "../../layout";

export const getServerSideProps = async ({params}) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users/${params.id}`
  );

  return {props:{data}};
};

const AdminUserDetailsPage = ({ data }) => {
  return <AdminLayout><UpdateUser user={data?.user} /></AdminLayout>;
};

export default AdminUserDetailsPage;